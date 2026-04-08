rootProject.name = "smart-trip-application"

pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
        maven { url = uri("https://repo.spring.io/milestone") } // Spring AI milestones (Boot 4 alignment)
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        mavenCentral()
        maven { url = uri("https://repo.spring.io/milestone") } // Spring AI milestones (Boot 4 alignment)
    }
}

include(
    "libs:contracts",
    "services:user-service",
    "services:trip-service",
    "services:ai-service",
    "services:recommendation-service",
)

