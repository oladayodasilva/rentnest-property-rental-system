package com.rentnest.backend.repository;

import com.rentnest.backend.entity.Enquiry;
import com.rentnest.backend.entity.EnquiryStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

    List<Enquiry> findByStatusOrderByCreatedAtDesc(EnquiryStatus status);

    List<Enquiry> findByPropertyIdOrderByCreatedAtDesc(Long propertyId);

    List<Enquiry> findAllByOrderByCreatedAtDesc();
}