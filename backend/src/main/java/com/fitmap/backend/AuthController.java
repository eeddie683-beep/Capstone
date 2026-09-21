package com.fitmap.backend;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.HexFormat;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Pattern EMAIL = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    private static final Duration SESSION_AGE = Duration.ofDays(30);
    private static final SecureRandom RANDOM = new SecureRandom();
    private final JdbcTemplate jdbc;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final boolean cookieSecure;

    public AuthController(JdbcTemplate jdbc, @Value("${fitmap.cookie-secure}") boolean cookieSecure) {
        this.jdbc = jdbc;
        this.cookieSecure = cookieSecure;
    }

    public record SignupRequest(String name, String nickname, String email, String password,
                                Boolean agreeTerms, Boolean agreePrivacy) {}
    public record LoginRequest(String email, String password, Boolean keepLoggedIn) {}
    public record UserView(UUID id, String name, String nickname, String email) {}
    private record StoredUser(UserView view, String passwordHash) {}

    @GetMapping("/email-available")
    public Map<String, Boolean> emailAvailable(@RequestParam String email) {
        String normalized = normalizedEmail(email);
        return Map.of("available", jdbc.queryForObject(
            "SELECT COUNT(*) FROM users WHERE email = ?", Integer.class, normalized) == 0);
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, UserView>> signup(@RequestBody SignupRequest input) {
        String email = normalizedEmail(input.email());
        String name = input.name() == null ? "" : input.name().trim();
        String nickname = input.nickname() == null ? "" : input.nickname().trim();
        if (name.isEmpty() || name.length() > 50 || nickname.isEmpty() || nickname.length() > 50) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "이름과 닉네임을 1~50자로 입력하세요.");
        }
        if (input.password() == null || input.password().length() < 8 ||
            input.password().getBytes(StandardCharsets.UTF_8).length > 256) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "비밀번호를 8자 이상 입력하세요.");
        }
        if (!Boolean.TRUE.equals(input.agreeTerms()) || !Boolean.TRUE.equals(input.agreePrivacy())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "필수 약관에 동의해주세요.");
        }
        UserView user = new UserView(UUID.randomUUID(), name, nickname, email);
        try {
            jdbc.update("INSERT INTO users (id, name, nickname, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)",
                user.id(), name, nickname, email, encoder.encode(input.password()), Instant.now());
        } catch (DataIntegrityViolationException error) {
            throw new ApiException(HttpStatus.CONFLICT, "이미 가입된 이메일입니다.");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("user", user));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, UserView>> login(@RequestBody LoginRequest input) {
        String email = input.email() == null ? "" : input.email().trim().toLowerCase(Locale.ROOT);
        List<StoredUser> users = jdbc.query("SELECT id, name, nickname, email, password_hash FROM users WHERE email = ?",
            (rs, row) -> new StoredUser(new UserView(rs.getObject("id", UUID.class), rs.getString("name"),
                rs.getString("nickname"), rs.getString("email")), rs.getString("password_hash")), email);
        if (users.isEmpty() || input.password() == null || !encoder.matches(input.password(), users.getFirst().passwordHash())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "이메일 또는 비밀번호가 올바르지 않습니다.");
        }
        byte[] bytes = new byte[32];
        RANDOM.nextBytes(bytes);
        String token = HexFormat.of().formatHex(bytes);
        Duration age = Boolean.FALSE.equals(input.keepLoggedIn()) ? Duration.ofDays(1) : SESSION_AGE;
        jdbc.update("DELETE FROM sessions WHERE expires_at < ?", Instant.now());
        jdbc.update("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)",
            hash(token), users.getFirst().view().id(), Instant.now().plus(age));
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,
            cookie(token, Boolean.FALSE.equals(input.keepLoggedIn()) ? null : age).toString())
            .body(Map.of("user", users.getFirst().view()));
    }

    @GetMapping("/me")
    public Map<String, UserView> me(@CookieValue(name = "fitmap_session", required = false) String token) {
        if (token == null || token.isBlank()) throw new ApiException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        List<UserView> users = jdbc.query("""
            SELECT u.id, u.name, u.nickname, u.email FROM users u
            JOIN sessions s ON s.user_id = u.id
            WHERE s.token_hash = ? AND s.expires_at > ?
            """, (rs, row) -> new UserView(rs.getObject("id", UUID.class), rs.getString("name"),
                rs.getString("nickname"), rs.getString("email")), hash(token), Instant.now());
        if (users.isEmpty()) throw new ApiException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        return Map.of("user", users.getFirst());
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Boolean>> logout(@CookieValue(name = "fitmap_session", required = false) String token) {
        if (token != null && !token.isBlank()) jdbc.update("DELETE FROM sessions WHERE token_hash = ?", hash(token));
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie("", Duration.ZERO).toString())
            .body(Map.of("ok", true));
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Map<String, String>> handle(ApiException error) {
        return ResponseEntity.status(error.status).body(Map.of("error", error.getMessage()));
    }

    private String normalizedEmail(String value) {
        String email = value == null ? "" : value.trim().toLowerCase(Locale.ROOT);
        if (email.length() > 254 || !EMAIL.matcher(email).matches()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "올바른 이메일을 입력하세요.");
        }
        return email;
    }

    private ResponseCookie cookie(String token, Duration age) {
        ResponseCookie.ResponseCookieBuilder builder = ResponseCookie.from("fitmap_session", token)
            .httpOnly(true).secure(cookieSecure).sameSite("Lax").path("/api/auth");
        if (age != null) builder.maxAge(age);
        return builder.build();
    }

    private static String hash(String value) {
        try {
            return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256")
                .digest(value.getBytes(StandardCharsets.UTF_8)));
        } catch (java.security.NoSuchAlgorithmException error) {
            throw new IllegalStateException(error);
        }
    }

    private static final class ApiException extends RuntimeException {
        private final HttpStatus status;
        ApiException(HttpStatus status, String message) {
            super(message);
            this.status = status;
        }
    }
}
