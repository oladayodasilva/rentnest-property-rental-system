package com.rentnest.backend.service;

import com.rentnest.backend.dto.EnquiryRequest;
import com.rentnest.backend.dto.EnquiryResponse;
import com.rentnest.backend.entity.EnquiryStatus;

import java.util.List;

public interface EnquiryService {

    EnquiryResponse createEnquiry(EnquiryRequest request);

    List<EnquiryResponse> getAllEnquiries(EnquiryStatus status, Long propertyId);

    EnquiryResponse getEnquiryById(Long id);

    EnquiryResponse updateEnquiryStatus(Long id, EnquiryStatus status);

    void deleteEnquiry(Long id);
}