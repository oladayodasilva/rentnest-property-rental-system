package com.rentnest.backend.service;

import com.rentnest.backend.dto.EnquiryRequest;
import com.rentnest.backend.dto.EnquiryResponse;
import com.rentnest.backend.entity.Enquiry;
import com.rentnest.backend.entity.EnquiryStatus;
import com.rentnest.backend.entity.Property;
import com.rentnest.backend.exception.ResourceNotFoundException;
import com.rentnest.backend.repository.EnquiryRepository;
import com.rentnest.backend.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnquiryServiceImpl implements EnquiryService {

    private final EnquiryRepository enquiryRepository;
    private final PropertyRepository propertyRepository;

    @Override
    public EnquiryResponse createEnquiry(EnquiryRequest request) {
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Property not found with ID: " + request.getPropertyId()
                ));

        Enquiry enquiry = Enquiry.builder()
                .property(property)
                .customerName(request.getCustomerName())
                .customerEmail(request.getCustomerEmail())
                .customerPhone(request.getCustomerPhone())
                .message(request.getMessage())
                .inspectionDate(request.getInspectionDate())
                .inspectionTime(request.getInspectionTime())
                .status(EnquiryStatus.NEW)
                .build();

        Enquiry savedEnquiry = enquiryRepository.save(enquiry);

        return mapToResponse(savedEnquiry);
    }

    @Override
    public List<EnquiryResponse> getAllEnquiries(EnquiryStatus status, Long propertyId) {
        List<Enquiry> enquiries;

        if (status != null) {
            enquiries = enquiryRepository.findByStatusOrderByCreatedAtDesc(status);
        } else if (propertyId != null) {
            enquiries = enquiryRepository.findByPropertyIdOrderByCreatedAtDesc(propertyId);
        } else {
            enquiries = enquiryRepository.findAllByOrderByCreatedAtDesc();
        }

        return enquiries.stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public EnquiryResponse getEnquiryById(Long id) {
        Enquiry enquiry = findEnquiryById(id);
        return mapToResponse(enquiry);
    }

    @Override
    public EnquiryResponse updateEnquiryStatus(Long id, EnquiryStatus status) {
        Enquiry enquiry = findEnquiryById(id);

        enquiry.setStatus(status);

        if (status == EnquiryStatus.INSPECTION_SCHEDULED) {
            Property property = enquiry.getProperty();
            property.setStatus(com.rentnest.backend.entity.PropertyStatus.UNDER_INSPECTION);
            propertyRepository.save(property);
        }

        Enquiry updatedEnquiry = enquiryRepository.save(enquiry);

        return mapToResponse(updatedEnquiry);
    }

    @Override
    public void deleteEnquiry(Long id) {
        Enquiry enquiry = findEnquiryById(id);
        enquiryRepository.delete(enquiry);
    }

    private Enquiry findEnquiryById(Long id) {
        return enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with ID: " + id));
    }

    private EnquiryResponse mapToResponse(Enquiry enquiry) {
        Property property = enquiry.getProperty();

        return EnquiryResponse.builder()
                .id(enquiry.getId())
                .propertyId(property.getId())
                .propertyTitle(property.getTitle())
                .propertyLocation(property.getLocation())
                .propertyImageUrl(property.getImageUrl())
                .customerName(enquiry.getCustomerName())
                .customerEmail(enquiry.getCustomerEmail())
                .customerPhone(enquiry.getCustomerPhone())
                .message(enquiry.getMessage())
                .inspectionDate(enquiry.getInspectionDate())
                .inspectionTime(enquiry.getInspectionTime())
                .status(enquiry.getStatus())
                .createdAt(enquiry.getCreatedAt())
                .updatedAt(enquiry.getUpdatedAt())
                .build();
    }
}