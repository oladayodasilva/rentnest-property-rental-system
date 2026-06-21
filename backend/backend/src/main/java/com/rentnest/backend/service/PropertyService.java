package com.rentnest.backend.service;

import com.rentnest.backend.dto.PropertyRequest;
import com.rentnest.backend.dto.PropertyResponse;
import com.rentnest.backend.entity.PropertyStatus;
import com.rentnest.backend.entity.PropertyType;

import java.math.BigDecimal;
import java.util.List;

public interface PropertyService {

    PropertyResponse createProperty(PropertyRequest request);

    List<PropertyResponse> getAllProperties(
            String location,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            PropertyType propertyType,
            Integer bedrooms,
            PropertyStatus status
    );

    PropertyResponse getPropertyById(Long id);

    PropertyResponse updateProperty(Long id, PropertyRequest request);

    PropertyResponse updatePropertyStatus(Long id, PropertyStatus status);

    void deleteProperty(Long id);
}