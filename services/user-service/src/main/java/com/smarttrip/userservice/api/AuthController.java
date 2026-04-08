package com.smarttrip.userservice.api;

import com.smarttrip.userservice.domain.UserAccount;
import com.smarttrip.userservice.domain.UserAccountRepository;
import com.smarttrip.userservice.security.SecurityConfig;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
public class AuthController {

    private final JwtEncoder jwtEncoder;
    private final PasswordEncoder passwordEncoder;
    private final String issuer;
    private final UserAccountRepository users;

    public AuthController(JwtEncoder jwtEncoder, PasswordEncoder passwordEncoder, UserAccountRepository users,
                          @Value("${security.jwt.issuer}") String issuer) {
        this.jwtEncoder = jwtEncoder;
        this.passwordEncoder = passwordEncoder;
        this.users = users;
        this.issuer = issuer;
    }

    public record RegisterRequest(@Email @NotBlank String email, @NotBlank @Size(min = 8, max = 128) String password) {}
    public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}
    public record TokenResponse(String accessToken, String tokenType, long expiresInSeconds) {}

    @PostMapping("/api/auth/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@jakarta.validation.Valid @RequestBody RegisterRequest req) {
        if (users.existsByEmailIgnoreCase(req.email())) {
            throw new IllegalArgumentException("Email already registered");
        }
        users.save(new UserAccount(req.email().toLowerCase(), passwordEncoder.encode(req.password())));
    }

    @PostMapping("/api/auth/login")
    public TokenResponse login(@jakarta.validation.Valid @RequestBody LoginRequest req) {
        var user = users.findByEmailIgnoreCase(req.email())
            .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        long ttl = 3600;
        var jwt = SecurityConfig.buildJwt(jwtEncoder, user.getEmail(), issuer, ttl);
        return new TokenResponse(jwt, "Bearer", ttl);
    }
}
