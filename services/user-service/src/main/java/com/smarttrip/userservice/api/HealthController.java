package com.smarttrip.userservice.api;

import com.smarttrip.contracts.HealthDto;
import java.time.Instant;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping("/api/health")
    public HealthDto health() {
        return new HealthDto("user-service", Instant.now(), "UP");
    }
}

