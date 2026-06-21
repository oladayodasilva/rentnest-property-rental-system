package com.rentnest.backend.service;

import com.rentnest.backend.dto.PropertyRequest;
import com.rentnest.backend.dto.PropertyResponse;
import com.rentnest.backend.entity.Property;
import com.rentnest.backend.entity.PropertyStatus;
import com.rentnest.backend.entity.PropertyType;
import com.rentnest.backend.exception.ResourceNotFoundException;
import com.rentnest.backend.repository.PropertyRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;

    @Override
    public PropertyResponse createProperty(PropertyRequest request) {
        Property property = Property.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .location(request.getLocation())
                .address(request.getAddress())
                .propertyType(request.getPropertyType())
                .bedrooms(request.getBedrooms())
                .bathrooms(request.getBathrooms())
                .price(request.getPrice())
                .status(request.getStatus() != null ? request.getStatus() : PropertyStatus.AVAILABLE)
                .imageUrl(request.getImageUrl())
                .build();

        Property savedProperty = propertyRepository.save(property);

        return mapToResponse(savedProperty);
    }

    @Override
    public List<PropertyResponse> getAllProperties(
            String location,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            PropertyType propertyType,
            Integer bedrooms,
            PropertyStatus status
    ) {
        Specification<Property> specification = buildPropertySpecification(
                location,
                minPrice,
                maxPrice,
                propertyType,
                bedrooms,
                status
        );

        return propertyRepository.findAll(specification)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public PropertyResponse getPropertyById(Long id) {
        Property property = findPropertyById(id);
        return mapToResponse(property);
    }

    @Override
    public PropertyResponse updateProperty(Long id, PropertyRequest request) {
        Property property = findPropertyById(id);

        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setLocation(request.getLocation());
        property.setAddress(request.getAddress());
        property.setPropertyType(request.getPropertyType());
        property.setBedrooms(request.getBedrooms());
        property.setBathrooms(request.getBathrooms());
        property.setPrice(request.getPrice());
        property.setStatus(request.getStatus() != null ? request.getStatus() : property.getStatus());
        property.setImageUrl(request.getImageUrl());

        Property updatedProperty = propertyRepository.save(property);

        return mapToResponse(updatedProperty);
    }

    @Override
    public PropertyResponse updatePropertyStatus(Long id, PropertyStatus status) {
        Property property = findPropertyById(id);

        property.setStatus(status);

        Property updatedProperty = propertyRepository.save(property);

        return mapToResponse(updatedProperty);
    }

    @Override
    public void deleteProperty(Long id) {
        Property property = findPropertyById(id);
        propertyRepository.delete(property);
    }

    private Property findPropertyById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with ID: " + id));
    }

    private PropertyResponse mapToResponse(Property property) {
        return PropertyResponse.builder()
                .id(property.getId())
                .title(property.getTitle())
                .description(property.getDescription())
                .location(property.getLocation())
                .address(property.getAddress())
                .propertyType(property.getPropertyType())
                .bedrooms(property.getBedrooms())
                .bathrooms(property.getBathrooms())
                .price(property.getPrice())
                .status(property.getStatus())
                .imageUrl(property.getImageUrl())
                .createdAt(property.getCreatedAt())
                .updatedAt(property.getUpdatedAt())
                .build();
    }

    private Specification<Property> buildPropertySpecification(
            String location,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            PropertyType propertyType,
            Integer bedrooms,
            PropertyStatus status
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (location != null && !location.isBlank()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("location")),
                        "%" + location.toLowerCase() + "%"
                ));
            }

            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            if (propertyType != null) {
                predicates.add(criteriaBuilder.equal(root.get("propertyType"), propertyType));
            }

            if (bedrooms != null) {
                predicates.add(criteriaBuilder.equal(root.get("bedrooms"), bedrooms));
            }

            if (status != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), status));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}