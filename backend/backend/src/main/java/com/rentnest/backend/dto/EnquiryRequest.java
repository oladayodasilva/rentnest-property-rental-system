package com.rentnest.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class EnquiryRequest {

    @NotNull(message = "Property ID is required")
    private Long propertyId;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @Email(message = "Enter a valid email address")
    @NotBlank(message = "Customer email is required")
    private String customerEmail;

    @NotBlank(message = "Customer phone number is required")
    private String customerPhone;

    @Size(max = 1500, message = "Message cannot exceed 1500 characters")
    private String message;

    @FutureOrPresent(message = "Inspection date cannot be in the past")
    private LocalDate inspectionDate;

    private LocalTime inspectionTime;

    @AssertTrue(message = "Inspection date is required when inspection time is provided")
    public boolean isInspectionDateValid() {
        return inspectionTime == null || inspectionDate != null;
    }
}