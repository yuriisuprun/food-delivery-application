package com.smarttrip.tripservice.api;

import com.smarttrip.tripservice.domain.Trip;
import com.smarttrip.tripservice.domain.TripRepository;

import jakarta.validation.constraints.*;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

@RestController
public class TripController {

    private final TripRepository trips;
    private final RestClient aiServiceClient;

    public TripController(TripRepository trips, RestClient.Builder builder) {
        this.trips = trips;

        String baseUrl = System.getenv().getOrDefault(
                "AI_SERVICE_URL",
                "http://ai-service:8083"
        );

        this.aiServiceClient = builder.baseUrl(baseUrl).build();
    }

    public record PlanTripRequest(
            @NotBlank String destination,
            @NotNull @Positive Integer days,
            @NotNull @PositiveOrZero Integer budgetEur,
            List<String> constraints
    ) {}

    public record TripSummary(
            UUID id,
            String destination,
            int days,
            int budgetEur,
            String itineraryMarkdown
    ) {}

    public record AiItineraryResponse(String markdown) {}

    @PostMapping(value = "/api/trips/plan", consumes = MediaType.APPLICATION_JSON_VALUE)
    public TripSummary plan(
            @AuthenticationPrincipal Jwt jwt,
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader,
            @RequestBody PlanTripRequest req
    ) {
        var userEmail = jwt.getSubject();

        var trip = new Trip(
                userEmail,
                req.destination(),
                req.days(),
                req.budgetEur(),
                toJsonArray(req.constraints())
        );

        var requestSpec = aiServiceClient.post()
                .uri("/api/ai/itinerary")
                .contentType(MediaType.APPLICATION_JSON)
                .body(req);

        if (authHeader != null && !authHeader.isBlank()) {
            requestSpec = requestSpec.header(HttpHeaders.AUTHORIZATION, authHeader);
        }

        AiItineraryResponse ai = requestSpec.retrieve()
                .body(AiItineraryResponse.class);

        if (ai != null) {
            trip.setItineraryMarkdown(ai.markdown());
        }

        var saved = trips.save(trip);

        return new TripSummary(
                saved.getId(),
                saved.getDestination(),
                saved.getDays(),
                saved.getBudgetEur(),
                saved.getItineraryMarkdown()
        );
    }

    @GetMapping("/api/trips")
    public List<TripSummary> list(@AuthenticationPrincipal Jwt jwt) {
        var userEmail = jwt.getSubject();

        return trips.findByUserEmailIgnoreCaseOrderByCreatedAtDesc(userEmail)
                .stream()
                .map(t -> new TripSummary(
                        t.getId(),
                        t.getDestination(),
                        t.getDays(),
                        t.getBudgetEur(),
                        t.getItineraryMarkdown()
                ))
                .toList();
    }

    private static String toJsonArray(List<String> items) {
        if (items == null || items.isEmpty()) return "[]";

        var escaped = items.stream()
                .map(s -> s == null ? "" : s.replace("\\", "\\\\").replace("\"", "\\\""))
                .map(s -> "\"" + s + "\"")
                .toList();

        return "[" + String.join(",", escaped) + "]";
    }
}