package com.rentnest.backend.controller;

import com.rentnest.backend.dto.PropertyRequest;
import com.rentnest.backend.dto.PropertyResponse;
import com.rentnest.backend.entity.PropertyStatus;
import com.rentnest.backend.entity.PropertyType;
import com.rentnest.backend.service.PropertyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PropertyResponse createProperty(@Valid @RequestBody PropertyRequest request) {
        return propertyService.createProperty(request);
    }

    @GetMapping
    public List<PropertyResponse> getAllProperties(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) PropertyType propertyType,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) PropertyStatus status
    ) {
        return propertyService.getAllProperties(
                location,
                minPrice,
                maxPrice,
                propertyType,
                bedrooms,
                status
        );
    }

    @GetMapping("/{id}")
    public PropertyResponse getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id);
    }

    @PutMapping("/{id}")
    public PropertyResponse updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody PropertyRequest request
    ) {
        return propertyService.updateProperty(id, request);
    }

    @PatchMapping("/{id}/status")
    public PropertyResponse updatePropertyStatus(
            @PathVariable Long id,
            @RequestParam PropertyStatus status
    ) {
        return propertyService.updatePropertyStatus(id, status);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
    }
}