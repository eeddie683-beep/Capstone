# FitMap Spring Boot 인증 서버

Java 21과 Maven이 필요합니다. `mvn spring-boot:run`으로 실행하거나 프로젝트 루트에서 `docker compose up --build`를 사용하세요. 기본 포트는 8080입니다.

H2 데이터베이스는 기본적으로 `backend/data/fitmap.mv.db`에 저장됩니다. Docker Compose에서는 `auth-data` 볼륨에 유지됩니다. 기존 Node 서버의 `auth.json` 데이터는 자동 이전되지 않습니다.

| 메서드 | 경로 | 기능 |
| --- | --- | --- |
| GET | `/api/auth/email-available?email=...` | 이메일 사용 가능 여부 |
| POST | `/api/auth/signup` | 회원가입 |
| POST | `/api/auth/login` | 로그인 및 세션 쿠키 발급 |
| GET | `/api/auth/me` | 현재 사용자 조회 |
| POST | `/api/auth/logout` | 로그아웃 |

회원가입 JSON에는 `name`, `nickname`, `email`, `password`, `agreeTerms: true`, `agreePrivacy: true`가 필요합니다. 응답 형식은 기존 프런트엔드와 같습니다. 비밀번호는 BCrypt 해시로 저장하며, 로그인 세션은 30일 유효한 HttpOnly 쿠키입니다. 서버에는 세션 토큰의 SHA-256 해시만 저장합니다.

환경 변수: `PORT`, `JDBC_URL`, `DB_USER`, `DB_PASSWORD`, `COOKIE_SECURE`. HTTPS 운영 환경에서는 `COOKIE_SECURE=true`를 설정하세요. 테스트는 `mvn test`로 실행합니다.
