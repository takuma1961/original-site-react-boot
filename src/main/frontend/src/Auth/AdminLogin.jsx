import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiBaseUrl}/perform_login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ username: email, password: password, }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.role === "ADMIN") {
        navigate("/AdminHome"); // ← SPA内で遷移
      } else {
        navigate("/home");
      }
    } else {
      // エラーメッセージを受け取って表示
      const data = await response.json().catch(() => null);
      setErrorMsg(data?.error || "ログインに失敗しました。");
    }
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>管理者ログイン</h1>
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
      <Link to="/AdminRegister">新規管理者情報の登録画面はこちら</Link>
    </div>
  );
}

export default AdminLogin;
