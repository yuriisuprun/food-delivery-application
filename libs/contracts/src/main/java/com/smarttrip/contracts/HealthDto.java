package com.smarttrip.contracts;

import java.time.Instant;

public record HealthDto(String service, Instant time, String status) {}

