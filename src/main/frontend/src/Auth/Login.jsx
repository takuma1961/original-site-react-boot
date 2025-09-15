// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      navigate("/home");
    } else {
      setErrorMsg("メールアドレスまたはパスワードが違います");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>ログイン</h1>
          <div>
            <label>メールアドレス:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>パスワード:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          <button type="submit">ログイン</button>
        </form>
        <br />
        <Link to="/Register">新規管理者情報の登録画面はこちら</Link>
        <br />
        <Link to="/AdminLogin">📜 管理者の方はこちら</Link>
        <br />
        <Link to="/ForgotPassword">🔑 パスワードを忘れた場合はこちら</Link>
      </div>
    </>
  );
}

export default Login;
