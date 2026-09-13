# FitMap

> 사용자의 현재 위치와 기상·대기질 정보를 활용해 운동 환경을 안내하고, 주변 운동 장소를 확인할 수 있는 위치 기반 운동 웹 서비스입니다.

## 1. 프로젝트 개요

FitMap은 단순히 날씨를 조회하는 서비스가 아닙니다. 사용자의 현재 위치를 바탕으로 날씨와 대기질을 분석하고, 현재 환경에 적합한 실내·실외 운동 정보와 주변 운동 장소를 한곳에서 제공합니다.

```text
현재 위치
   ↓
날씨 + 대기질
   ↓
현재 운동 환경 분석
   ↓
실내 / 실외 운동 안내
   ↓
운동 정보 제공
   ↓
주변 운동 장소 확인
```

## 2. 문제 설정

운동 전 사용자는 날씨, 미세먼지, 주변 운동 장소 등을 각각 다른 서비스에서 확인해야 하는 불편함이 있습니다.

FitMap은 이 문제를 해결하기 위해 **현재 위치를 기준으로 날씨·대기질·운동 정보·주변 운동 장소를 하나의 웹사이트에서 제공합니다.**

## 3. 주요 기능

| 기능 | 내용 |
| --- | --- |
| 현재 위치 | Geolocation API로 위도와 경도 확인 |
| 현재 날씨 | 기온, 체감온도, 습도, 강수, 풍속 등 제공 |
| 대기질 | 미세먼지, 초미세먼지, 오존 정보 제공 |
| 운동 선택 | 러닝, 걷기, 자전거, 등산, 수영 지원 |
| 운동 정보 | 운동 강도, 시간, 거리, 예상 칼로리 제공 |
| 운동 환경 | 현재 날씨가 운동에 미치는 영향 안내 |
| 실내·실외 안내 | 날씨에 따라 실내 또는 실외 운동 안내 |
| 시간대별 정보 | 운동하기 좋은 시간대 확인 |
| 주변 장소 | 공원, 체육관, 운동장 등을 지도에 표시 |
| 즐겨찾기 | 자주 이용하는 운동 장소 저장 |
| 운동 기록 | 운동 종류, 시간, 거리 등 저장 |
| 로그인·회원가입 | 개인별 데이터 관리 |

## 4. 사용 API

FitMap은 다음 API를 활용합니다.

```text
Geolocation API
├─ 현재 위도
└─ 현재 경도

기상청 API
├─ 기온
├─ 습도
├─ 강수확률
├─ 강수 여부
└─ 풍속

AirKorea API
├─ PM10 미세먼지
├─ PM2.5 초미세먼지
└─ 오존

Kakao API
├─ 지도
├─ 현재 위치
├─ 주변 운동 장소
├─ 주소
└─ 거리
```

Kakao API 연동에는 **Kakao Map API**와 **Kakao Local API**를 함께 사용합니다.

## 5. 전체 시스템 구성도

```text
                    ┌───────────────┐
                    │     사용자     │
                    └───────┬───────┘
                            │
                            ▼
                  ┌─────────────────┐
                  │ React 웹사이트   │
                  │ TypeScript 기반 │
                  └────────┬────────┘
                           │
                    Geolocation API
                           │
                           ▼
                    위도 / 경도
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
     기상청 API       AirKorea API      Kakao API
          │                │                │
          ▼                ▼                ▼
       날씨 정보         대기질 정보       주변 장소
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                  ┌──────────────────┐
                  │ 운동 정보 처리    │
                  │                  │
                  │ 실내/실외 판단    │
                  │ 운동 강도         │
                  │ 시간/거리 정보    │
                  │ 주의사항          │
                  └────────┬─────────┘
                           ▼
                       Dashboard
```

## 6. 페이지 구성

```text
Landing
   ↓
Login / Signup
   ↓
Dashboard
   ├─ 운동 정보
   ├─ 주변 장소
   ├─ 즐겨찾기
   ├─ 운동 기록
   └─ 마이페이지
```

### Landing

서비스 소개 페이지입니다.

```text
FitMap 소개
주요 기능 소개
서비스 이용 방법
로그인
회원가입
```

### Login

```text
이메일
비밀번호
로그인
회원가입 이동
```

### Signup

```text
이름
이메일
비밀번호
비밀번호 확인
선호 운동 등
```

### Dashboard

서비스의 메인 화면입니다.

```text
현재 위치

현재 날씨
├─ 기온
├─ 체감온도
├─ 습도
├─ 강수확률
├─ 풍속
└─ 자외선

대기질
├─ 미세먼지
├─ 초미세먼지
└─ 오존

운동 종류 선택

오늘의 운동 정보
├─ 운동 강도
├─ 운동 시간
├─ 거리
└─ 칼로리

주변 운동 장소 일부
```

### ExerciseInfo

```text
운동 종류 선택

오늘의 운동 정보
├─ 운동 강도
├─ 권장 시간
├─ 권장 거리
└─ 예상 칼로리

현재 운동 환경
├─ 기온
├─ 습도
├─ 풍속
├─ 강수
├─ 미세먼지
└─ 자외선

시간대별 운동 환경

실내 / 실외 운동 안내

운동 주의사항
```

### NearbyPlaces

```text
카카오맵

현재 위치

주변 운동 장소
├─ 공원
├─ 체육관
├─ 체육센터
├─ 운동장
└─ 산책로

필터
├─ 전체
├─ 실내
└─ 실외

장소 정보
├─ 이름
├─ 거리
├─ 주소
└─ 즐겨찾기
```

> 주변 운동 장소에는 추천 점수나 순위를 사용하지 않습니다.

### Favorites

```text
즐겨찾기한 운동 장소
├─ 장소명
├─ 시설 종류
├─ 거리
├─ 지도에서 보기
└─ 즐겨찾기 삭제
```

### ExerciseHistory

```text
날짜
운동 종류
운동 시간
거리
운동 강도
운동 당시 날씨
```

### MyPage

```text
이름
이메일
선호 운동
평균 운동시간
평균 운동거리

회원정보 수정
로그아웃
```

## 7. 프로젝트 파일 구조

```text
Capstone/
│
├─ public/
│
├─ src/
│  │
│  ├─ pages/
│  │  ├─ Landing.jsx
│  │  ├─ Login.jsx
│  │  ├─ Signup.jsx
│  │  ├─ Dashboard.tsx
│  │  ├─ ExerciseInfo.tsx
│  │  ├─ NearbyPlaces.tsx
│  │  ├─ Favorites.tsx
│  │  ├─ ExerciseHistory.tsx
│  │  └─ MyPage.tsx
│  │
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Sidebar.tsx
│  │  │  └─ Header.tsx
│  │  ├─ weather/
│  │  │  ├─ WeatherCard.tsx
│  │  │  └─ AirQualityCard.tsx
│  │  ├─ exercise/
│  │  │  └─ ExerciseCard.tsx
│  │  └─ map/
│  │     └─ NearbyPlacesCard.tsx
│  │
│  ├─ api/
│  │  ├─ weather.ts
│  │  ├─ airQuality.ts
│  │  └─ kakao.ts
│  │
│  ├─ hooks/
│  │  └─ useGeolocation.ts
│  │
│  ├─ types/
│  │  ├─ weather.ts
│  │  ├─ airQuality.ts
│  │  ├─ exercise.ts
│  │  ├─ location.ts
│  │  └─ place.ts
│  │
│  ├─ utils/
│  │  ├─ weatherUtils.ts
│  │  └─ exerciseUtils.ts
│  │
│  ├─ assets/
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
│
├─ .env
├─ .gitignore
├─ package.json
├─ tsconfig.json
├─ tsconfig.app.json
└─ vite.config.ts
```

## 8. 폴더별 역할

| 폴더 | 역할 |
| --- | --- |
| `pages/` | 실제 페이지 화면 |
| `components/` | 여러 화면에서 재사용하는 UI 컴포넌트 |
| `api/` | 외부 API 호출 코드 |
| `hooks/` | 현재 위치 조회 등 React 공통 기능 |
| `types/` | TypeScript 데이터 타입 |
| `utils/` | 데이터 계산 및 변환 로직 |
| `assets/` | 이미지, 로고, 아이콘 등 정적 파일 |

데이터는 다음과 같은 흐름으로 처리합니다.

```text
Dashboard.tsx
        ↓
useGeolocation.ts
        ↓
현재 위치
        ↓
┌──────────────┬────────────────┬──────────────┐
weather.ts   airQuality.ts     kakao.ts
    ↓             ↓                ↓
날씨 데이터    대기질 데이터     장소 데이터
```

## 9. TypeScript와 JavaScript 사용 기준

프로젝트는 **React + TypeScript**를 기본으로 하되, 팀원이 JavaScript로 작성한 파일도 함께 사용할 수 있도록 구성합니다.

```text
프로젝트 기본
└─ React + TypeScript

TypeScript 담당
├─ .ts
└─ .tsx

JavaScript 담당
├─ .js
└─ .jsx
```

예시 역할 분담은 다음과 같습니다.

```text
Landing.jsx       ← JavaScript 담당
Login.jsx         ← JavaScript 담당
Signup.jsx        ← JavaScript 담당

Dashboard.tsx     ← TypeScript 담당
ExerciseInfo.tsx  ← TypeScript 담당
weather.ts        ← TypeScript 담당
kakao.ts          ← TypeScript 담당
```

JavaScript 파일을 함께 사용하기 위해 `tsconfig.app.json`은 아래 설정을 유지합니다.

```json
{
  "allowJs": true,
  "checkJs": false
}
```

## 10. 개발 순서

외부 API를 한 번에 모두 연결하지 않고 다음 순서로 단계적으로 구현합니다.

```text
1단계: 페이지 / 라우팅 구성
   ↓
2단계: Dashboard UI 구현
   ↓
3단계: Geolocation API로 현재 위치 확보
   ↓
4단계: 기상청 API로 날씨 표시
   ↓
5단계: AirKorea API로 대기질 표시
   ↓
6단계: 운동 정보 로직 및 실내 / 실외 판단
   ↓
7단계: Kakao Map으로 주변 운동 장소 표시
   ↓
8단계: 로그인 / 회원가입 연결
   ↓
9단계: 즐겨찾기 / 운동 기록 구현
   ↓
10단계: 전체 UI 개선 및 오류 처리
```

우선 구현 범위는 **Dashboard → Geolocation → 기상청 → AirKorea → Kakao** 순서입니다.

## 최종 구조

> **Geolocation API로 사용자의 현재 위치를 확인하고, 기상청·AirKorea 데이터를 활용해 운동 환경을 제공하며, Kakao Map을 통해 주변 운동 장소를 확인할 수 있는 React 기반 위치 맞춤형 운동 웹 서비스입니다.**