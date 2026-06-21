package com.rentnest.backend.repository;

import com.rentnest.backend.entity.Property;
import com.rentnest.backend.entity.PropertyStatus;
import com.rentnest.backend.entity.PropertyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {

    List<Property> findByStatus(PropertyStatus status);

    List<Property> findByPropertyType(PropertyType propertyType);

    List<Property> findByLocationContainingIgnoreCase(String location);
}