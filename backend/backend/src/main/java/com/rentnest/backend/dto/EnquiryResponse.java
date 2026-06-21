package com.rentnest.backend.dto;

import com.rentnest.backend.entity.EnquiryStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
public class EnquiryResponse {

    private Long id;

    private Long propertyId;
    private String propertyTitle;
    private String propertyLocation;
    private String propertyImageUrl;

    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String message;

    private LocalDate inspectionDate;
    private LocalTime inspectionTime;

    private EnquiryStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}