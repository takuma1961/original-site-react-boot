import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/perform_login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
      credentials: "include", // Cookieを使う場合
    });

    if (response.ok) {
      // 管理者ユーザーがログイン成功したと仮定して管理者ホーム画面へ遷移
      navigate("/AdminHome");
    } else {
      const data = await response.json();
      setErrorMsg(data.error);//Spring側のJSONで定義したエラーメッセージを反映
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
