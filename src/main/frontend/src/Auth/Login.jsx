// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

//loginはreactの関数コンポーネント、ログイン画面の動作を担当
function Login() {
  //初期値は空としてメールアドレス、パスワード、エラーメッセージを保持
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${apiBaseUrl}/perform_login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // フォーム送信と同じくURLエンコード形式で送る場合
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
      credentials: "include", // Cookie認証など使う場合
    });

    if (response.ok) {
      // ログイン成功時の処理（画面遷移など）
      navigate("/products");
    } else {
      setErrorMsg("メールアドレスまたはパスワードが違います");
    }
  };

  return (
    <>
      <MainContainer>
        <CenterH1>ログイン</CenterH1>
        <ContentContainer>
          <LeftSection>
            <form onSubmit={handleSubmit}>
              <LoginContainer>
                <InputGroup>
                  <StyledInput
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>

                <InputGroup>
                  <StyledInput
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
                {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
                <StyledButton type="submit">ログイン</StyledButton>
                <ForgotPasswordLink to="/ForgotPassword">🔑 パスワードを忘れた場合はこちら</ForgotPasswordLink>
              </LoginContainer>
            </form>
          </LeftSection>

          <Divider />{/* 中央線 */}

          <RightSection>
            <LinkContainer>
              <StyledLink to="/Register">新規会員登録はこちら</StyledLink>
              <StyledLink to="/AdminLogin">管理者画面はこちら</StyledLink>
            </LinkContainer>
          </RightSection>
        </ContentContainer>
      </MainContainer>
    </>
  );
}

export default Login;

// スタイル定義
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 50px 20px;
  gap: 40px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const LeftSection = styled.div`
  flex: 1;
  max-width: 400px;
`;

const RightSection = styled.div`
  flex: 1;
  max-width: 400px;
`;

const Divider = styled.div`
  width: 2px;
  background-color: #007bff;
  min-height: 400px;
  margin: 20px 0;
`;

const LoginContainer = styled.div`
  display: flex;          
  flex-direction: column;
  align-items: center;     
  max-width: 400px;        
  margin: 0 auto;          
  padding: 20px;
  gap: 20px;     
`;

const CenterH1 = styled.h1`
  text-align: center;
  font-family: "メイリオ", Meiryo, sans-serif;
  margin: 0;
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-family: "メイリオ", Meiryo, sans-serif;
  transition: border-color 0.3s ease;
  width: 250px;
  
  &::placeholder {
    color: #bbb;
    font-family: "メイリオ", Meiryo, sans-serif;
  }
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  &:hover {
    border-color: #ccc;
  }
`;

const StyledButton = styled.button`
  padding: 15px 30px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-family: "メイリオ", Meiryo, sans-serif;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #007bff;
    background-color: #f8f9fa;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px; /* ログインタイトルと同じ高さに調整 */
`;

const StyledLink = styled(Link)`
  padding: 15px 30px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  font-family: "メイリオ", Meiryo, sans-serif;
  text-align: center;
  transition: all 0.3s ease;
  display: block;
  
  &:hover {
    border-color: #007bff;
    background-color: #f8f9fa;
  }
`;

const ForgotPasswordLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-family: "メイリオ", Meiryo, sans-serif;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-family: "メイリオ", Meiryo, sans-serif;
  text-align: center;
  margin: 0;
`;