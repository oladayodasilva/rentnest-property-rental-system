package com.rentnest.backend.service;

import com.rentnest.backend.dto.PropertyRequest;
import com.rentnest.backend.dto.PropertyResponse;
import com.rentnest.backend.entity.Property;
import com.rentnest.backend.entity.PropertyStatus;
import com.rentnest.backend.entity.PropertyType;
import com.rentnest.backend.repository.PropertyRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

class PropertyServiceTest {

    @Test
    void shouldCreatePropertySuccessfully() {
        PropertyRepository propertyRepository = Mockito.mock(PropertyRepository.class);

        PropertyServiceImpl propertyService = new PropertyServiceImpl(propertyRepository);

        Property savedProperty = Property.builder()
                .id(1L)
                .title("Modern Apartment")
                .location("Ikeja, Lagos")
                .propertyType(PropertyType.APARTMENT)
                .bedrooms(2)
                .bathrooms(2)
                .price(BigDecimal.valueOf(2500000))
                .status(PropertyStatus.AVAILABLE)
                .build();

        Mockito.when(propertyRepository.save(any(Property.class))).thenReturn(savedProperty);

        PropertyRequest request = new PropertyRequest();
        request.setTitle("Modern Apartment");
        request.setLocation("Ikeja, Lagos");
        request.setPropertyType(PropertyType.APARTMENT);
        request.setBedrooms(2);
        request.setBathrooms(2);
        request.setPrice(BigDecimal.valueOf(2500000));
        request.setStatus(PropertyStatus.AVAILABLE);

        PropertyResponse response = propertyService.createProperty(request);

        assertNotNull(response);
        assertEquals("Modern Apartment", response.getTitle());
        assertEquals("Ikeja, Lagos", response.getLocation());
        assertEquals(PropertyStatus.AVAILABLE, response.getStatus());
    }
}