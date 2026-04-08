plugins {
    alias(libs.plugins.spring.boot) apply false
    alias(libs.plugins.spring.dependency.management) apply false
    alias(libs.plugins.spotless) apply false
}

allprojects {
    group = "com.smarttrip"
    version = "0.1.0-SNAPSHOT"
}

subprojects {
    // Keep subprojects lean; each module opts into Spring Boot + dependencies explicitly.
}

