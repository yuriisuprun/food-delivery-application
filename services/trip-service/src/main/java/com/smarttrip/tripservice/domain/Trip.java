package com.smarttrip.tripservice.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "trip", schema = "trips")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private int days;

    @Column(name = "budget_eur", nullable = false)
    private int budgetEur;

    @Column(name = "constraints_json", nullable = false, columnDefinition = "jsonb")
    private String constraintsJson = "[]";

    @Column(name = "itinerary_markdown")
    private String itineraryMarkdown;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    protected Trip() {}

    public Trip(String userEmail, String destination, int days, int budgetEur, String constraintsJson) {
        this.userEmail = userEmail;
        this.destination = destination;
        this.days = days;
        this.budgetEur = budgetEur;
        this.constraintsJson = constraintsJson == null ? "[]" : constraintsJson;
    }

    public UUID getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getDestination() {
        return destination;
    }

    public int getDays() {
        return days;
    }

    public int getBudgetEur() {
        return budgetEur;
    }

    public String getConstraintsJson() {
        return constraintsJson;
    }

    public String getItineraryMarkdown() {
        return itineraryMarkdown;
    }

    public void setItineraryMarkdown(String itineraryMarkdown) {
        this.itineraryMarkdown = itineraryMarkdown;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}

