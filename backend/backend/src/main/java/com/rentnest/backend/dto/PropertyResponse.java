package com.rentnest.backend.dto;

import com.rentnest.backend.entity.PropertyStatus;
import com.rentnest.backend.entity.PropertyType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class PropertyResponse {

    private Long id;
    private String title;
    private String description;
    private String location;
    private String address;
    private PropertyType propertyType;
    private Integer bedrooms;
    private Integer bathrooms;
    private BigDecimal price;
    private PropertyStatus status;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}