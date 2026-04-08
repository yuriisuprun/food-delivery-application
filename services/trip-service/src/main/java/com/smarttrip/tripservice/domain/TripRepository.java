package com.smarttrip.tripservice.domain;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip, UUID> {
    List<Trip> findByUserEmailIgnoreCaseOrderByCreatedAtDesc(String userEmail);
}

