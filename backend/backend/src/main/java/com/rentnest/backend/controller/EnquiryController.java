package com.rentnest.backend.controller;

import com.rentnest.backend.dto.EnquiryRequest;
import com.rentnest.backend.dto.EnquiryResponse;
import com.rentnest.backend.entity.EnquiryStatus;
import com.rentnest.backend.service.EnquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
@RequiredArgsConstructor
public class EnquiryController {

    private final EnquiryService enquiryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EnquiryResponse createEnquiry(@Valid @RequestBody EnquiryRequest request) {
        return enquiryService.createEnquiry(request);
    }

    @GetMapping
    public List<EnquiryResponse> getAllEnquiries(
            @RequestParam(required = false) EnquiryStatus status,
            @RequestParam(required = false) Long propertyId
    ) {
        return enquiryService.getAllEnquiries(status, propertyId);
    }

    @GetMapping("/{id}")
    public EnquiryResponse getEnquiryById(@PathVariable Long id) {
        return enquiryService.getEnquiryById(id);
    }

    @PatchMapping("/{id}/status")
    public EnquiryResponse updateEnquiryStatus(
            @PathVariable Long id,
            @RequestParam EnquiryStatus status
    ) {
        return enquiryService.updateEnquiryStatus(id, status);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEnquiry(@PathVariable Long id) {
        enquiryService.deleteEnquiry(id);
    }
}