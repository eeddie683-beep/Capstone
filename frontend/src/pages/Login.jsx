import { useState } from 'react'
import './Login.scss'

/**
 * 로그인 페이지
 *
 * - 디자인은 첨부 시안과 동일한 레이아웃/구성을 따르되, 색상은 전부 무채색(흑백/회색)으로 처리했습니다.
 * - 카카오 로그인은 "기능"은 넣지 않았습니다. 다만 시안과 레이아웃을 맞추기 위해
 *   버튼 자리는 disabled 상태의 자리표시자(placeholder)로 남겨뒀습니다.
 *   실제 카카오 로그인을 붙일 때는 이 버튼의 disabled/onClick만 채우고
 *   src/api/kakao.ts 쪽 로직을 연결하면 됩니다.
 *
 * Signup.jsx와의 연동 포인트
 * - 아직 프로젝트에 라우팅 라이브러리가 없어서(App.tsx가 <Landing />만 렌더링 중),
 *   화면 전환은 아래 두 개의 선택적(optional) prop으로 위임했습니다.
 *     - onLoginSuccess(userData): 로그인 성공 시 호출 (예: 대시보드로 이동)
 *     - onNavigateSignup(): "회원가입" 링크 클릭 시 호출 (예: 회원가입 페이지로 이동)
 *   두 prop을 넘기지 않아도 <a href="/signup">이 기본 동작하므로 라우팅이
 *   아직 없어도 컴포넌트 단독 렌더링/테스트가 가능합니다.
 * - 회원가입 페이지에서도 동일한 패턴(onSignupSuccess, onNavigateLogin)을 쓰면
 *   나중에 App.tsx(또는 라우터 설정)에서 두 페이지를 같은 방식으로 연결할 수 있습니다.
 * - 실제 로그인 API가 정해지면 mockLoginRequest 함수만 교체하면 됩니다.
 */

const initialForm = {
  email: '',
  password: '',
  keepLoggedIn: true,
}

const initialErrors = {
  email: '',
  password: '',
}

/**
 * @param {{ onLoginSuccess?: (user: { email: string }) => void, onNavigateSignup?: () => void }} [props]
 */
export default function Login({ onLoginSuccess, onNavigateSignup } = {}) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleKeepLoggedInChange = (event) => {
    const { checked } = event.target
    setForm((prev) => ({ ...prev, keepLoggedIn: checked }))
  }

  const validate = () => {
    const nextErrors = { email: '', password: '' }
    let isValid = true

    if (!form.email.trim()) {
      nextErrors.email = '이메일을 입력해주세요.'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = '이메일 형식이 올바르지 않습니다.'
      isValid = false
    }

    if (!form.password) {
      nextErrors.password = '비밀번호를 입력해주세요.'
      isValid = false
    }

    setErrors(nextErrors)
    return isValid
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    if (!validate()) return

    setIsSubmitting(true)
    try {
      const user = await mockLoginRequest(form)
      onLoginSuccess?.(user)
    } catch (error) {
      setSubmitError(error.message || '로그인에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignupClick = (event) => {
    if (onNavigateSignup) {
      event.preventDefault()
      onNavigateSignup()
    }
    // onNavigateSignup이 없으면 <a href="/signup">의 기본 동작을 그대로 사용합니다.
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* 좌측: 서비스 소개 영역 */}
        <section className="login-visual" aria-label="서비스 소개">
          <a className="login-logo" href="/">
            <span className="login-logo-mark" aria-hidden="true">
              <PulseIcon />
            </span>
            FitMap
          </a>

          <h1>
            위치 기반
            <br />
            스마트 운동 가이드
          </h1>
          <p className="placeholder-copy">
            현재 위치의 날씨와 주변 운동 장소를
            <br />한 번에 확인하세요.
          </p>

          <div className="login-stats" aria-label="서비스 통계">
            <div>
              <strong>12,000+</strong>
              <span>활성 사용자</span>
            </div>
            <div>
              <strong>5,400+</strong>
              <span>등록 장소</span>
            </div>
            <div>
              <strong>98%</strong>
              <span>만족도</span>
            </div>
          </div>

          <span className="login-badge">
            <PinIcon />
            Geolocation API 기반 서비스
          </span>
        </section>

        {/* 우측: 로그인 폼 영역 */}
        <section className="login-form-area" aria-label="로그인 폼">
          <h2>다시 만나서 반가워요 👋</h2>
          <p className="login-subtitle">계정에 로그인하세요</p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="email">이메일</label>
              <div className="input-wrap">
                <MailIcon />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="이메일을 입력하세요"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="field-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-field">
              <div className="form-field-label-row">
                <label htmlFor="password">비밀번호</label>
                {/* 비밀번호 찾기 페이지/기능은 이번 작업 범위 밖 — 추후 연결 */}
                <a href="#find-password" className="link-muted">비밀번호 찾기</a>
              </div>
              <div className="input-wrap">
                <LockIcon />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="비밀번호를 입력하세요"
                  value={form.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="field-error" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="login-form-row">
              <label className="checkbox-field">
                <input
                  type="checkbox"
                  name="keepLoggedIn"
                  checked={form.keepLoggedIn}
                  onChange={handleKeepLoggedInChange}
                />
                로그인 상태 유지
              </label>
            </div>

            {submitError && (
              <p className="form-error" role="alert">
                {submitError}
              </p>
            )}

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? '로그인 중...' : '로그인 →'}
            </button>
          </form>

          <div className="divider">또는</div>

          {/*
            카카오 로그인: 기능은 이번 작업 범위에서 제외 (disabled 처리).
            실제로 붙일 때는 disabled 제거 + onClick에 카카오 SDK 연동 로직만 넣으면 됩니다.
          */}
          <button type="button" className="kakao-button" disabled>
            <span className="kakao-icon-circle" aria-hidden="true">K</span>
            카카오로 계속하기
          </button>

          <p className="signup-prompt">
            아직 계정이 없으신가요?{' '}
            <a href="/signup" onClick={handleSignupClick}>
              무료 회원가입 →
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}

async function mockLoginRequest(credentials) {
  // TODO: 백엔드 로그인 API 확정 후 아래 fetch 형태로 교체
  //
  // const response = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email: credentials.email, password: credentials.password }),
  // })
  // if (!response.ok) {
  //   throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.')
  // }
  // return response.json()

  return new Promise((resolve) => {
    setTimeout(() => resolve({ email: credentials.email }), 400)
  })
}

/* 아이콘: 외부 라이브러리 없이 인라인 SVG로 처리 (프로젝트에 아이콘 패키지 미설치) */

function PulseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12h4l2-7 4 14 2-7h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="11" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a13.5 13.5 0 0 1-3.2 4.1M6.6 6.6C3.9 8.3 2 12 2 12s3.5 7 10 7a9.8 9.8 0 0 0 3.4-.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
