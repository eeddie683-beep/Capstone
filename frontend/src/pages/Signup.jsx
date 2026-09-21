import React, { useState } from "react";
import { signup, emailAvailable } from "../api/auth";
import "./Signup.css";

function Signup({ onNavigateLogin }) {
  const [allAgree, setAllAgree] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleAllAgree = (checked) => {
    setAllAgree(checked);
    setAgree1(checked);
    setAgree2(checked);
  };

  const handleIndividual = (type, checked) => {
    if (type === 1) {
      setAgree1(checked);
      setAllAgree(checked && agree2);
    } else {
      setAgree2(checked);
      setAllAgree(agree1 && checked);
    }
  };

  const handleEmailCheck = async () => {
    try {
      const checkedEmail = email.trim();
      const { available } = await emailAvailable(checkedEmail);
      if (!available) return alert("이미 가입된 이메일입니다.");
      if (email.trim() === checkedEmail) setEmailChecked(true);
    } catch (error) { alert(error.message); }
  };

  // 회원가입 완료
  const handleSignup = async () => {
    if (!agree1 || !agree2) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    if (!emailChecked) {
      alert("이메일 확인을 해주세요.");
      return;
    }

    if (!name.trim() || !nickname.trim()) {
      alert("이름과 닉네임을 입력해주세요.");
      return;
    }

    if (password.length < 8) {
      alert("비밀번호는 8자 이상 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    setSubmitting(true);
    try {
      await signup({ name, nickname, email, password, agreeTerms: agree1, agreePrivacy: agree2 });
      alert("회원가입이 완료되었습니다.");
      if (onNavigateLogin) onNavigateLogin();
      else window.location.href = "/login";
    } catch (error) { alert(error.message); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">

        {/* 왼쪽 영역 */}
        <div className="signup-left">
          <div className="left-content">

            <div className="logo">
              <div className="logo-icon">〽</div>
              <span>FitMap</span>
            </div>

            <h1>
              운동의 시작,
              <br />
              지금 여기서부터
            </h1>

            <p className="left-description">
              FitMap과 함께 건강한 운동을 시작하세요
              <br />
              회원가입 후 내 위치 기반
              <br />
              맞춤형 운동 정보를 바로 확인하세요.
            </p>

            <div className="feature-list">

              <div className="feature">
                <div className="feature-icon">⌖</div>
                <span>실시간 위치 기반 날씨 분석</span>
              </div>

              <div className="feature">
                <div className="feature-icon">♧</div>
                <span>맞춤형 운동 정보 제공</span>
              </div>

              <div className="feature">
                <div className="feature-icon">☆</div>
                <span>즐겨찾기 및 운동 기록 관리</span>
              </div>

            </div>
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="signup-right">
          <div className="signup-form">

            {/* 제목 */}
            <div className="form-title">
              <h2>회원가입</h2>
              <p>FitMap과 함께 건강한 운동을 시작하세요</p>
            </div>

            {/* 이름 / 닉네임 */}
            <div className="name-row">

              <div className="input-group">
                <label>이름</label>

                <div className="input-box">
                  <span className="input-icon">♙</span>

                  <input
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>닉네임</label>

                <div className="input-box">
                  <span className="input-icon">☺</span>

                  <input
                    type="text"
                    placeholder="닉네임 입력"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
              </div>

            </div>

            {/* 이메일 */}
            <div className="input-group email-group">
              <label>이메일</label>

              <div className="email-box">

                <span className="input-icon">✉</span>

                <input
                  type="email"
                  placeholder="fitmap@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailChecked(false);
                  }}
                />

                {!emailChecked ? (
                  <button
                    type="button"
                    className="email-check-button"
                    onClick={handleEmailCheck}
                  >
                    확인
                  </button>
                ) : (
                  <span className="email-check">
                    ✓ 확인됨
                  </span>
                )}

              </div>
            </div>

            {/* 비밀번호 */}
            <div className="input-group">
              <label>비밀번호</label>

              <div className="input-box">
                <span className="input-icon">▣</span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="8자 이상 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="eye"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="비밀번호 보기"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* 비밀번호 확인 */}
            <div className="input-group">
              <label>비밀번호 확인</label>

              <div className="input-box">
                <span className="input-icon">▣</span>

                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="비밀번호를 다시 입력하세요"
                  value={passwordConfirm}
                  onChange={(e) =>
                    setPasswordConfirm(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="eye"
                  onClick={() =>
                    setShowPasswordConfirm(!showPasswordConfirm)
                  }
                  aria-label="비밀번호 확인 보기"
                >
                  {showPasswordConfirm ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="agree-box">

              {/* 전체 동의 */}
              <label className="all-agree">

                <input
                  type="checkbox"
                  checked={allAgree}
                  onChange={(e) =>
                    handleAllAgree(e.target.checked)
                  }
                />

                <span className="custom-check"></span>

                <strong>전체 동의</strong>

              </label>

              {/* 이용약관 */}
              <div className="agree-line">

                <label>

                  <input
                    type="checkbox"
                    checked={agree1}
                    onChange={(e) =>
                      handleIndividual(1, e.target.checked)
                    }
                  />

                  <span className="small-check"></span>

                  이용약관 동의 (필수)

                </label>

                <button type="button">
                  보기
                </button>

              </div>

              {/* 개인정보 */}
              <div className="agree-line">

                <label>

                  <input
                    type="checkbox"
                    checked={agree2}
                    onChange={(e) =>
                      handleIndividual(2, e.target.checked)
                    }
                  />

                  <span className="small-check"></span>

                  개인정보 처리방침 동의 (필수)

                </label>

                <button type="button">
                  보기
                </button>

              </div>

              {/* 위치정보 */}
              <div className="agree-line optional">

                <label>

                  <input type="checkbox" />

                  <span className="small-check"></span>

                  위치정보 수집 동의 (선택)

                </label>

                <button type="button">
                  보기
                </button>

              </div>

            </div>

            {/* 회원가입 버튼 */}
            <button
              type="button"
              className="signup-button"
              onClick={handleSignup}
              disabled={submitting}
            >
              회원가입 완료
              <span>→</span>
            </button>

            {/* 로그인 */}
            <div className="login-link">

              이미 계정이 있으신가요?

              <button
                type="button"
                onClick={onNavigateLogin}
              >
                로그인하기 →
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
