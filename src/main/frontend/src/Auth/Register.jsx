import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    //メールアドレス、パスワード、エラーメッセージの初期値はNull
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiBaseUrl}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.status === 409) {
                setErrorMsg(data.error || "既に登録済みのメールアドレスです");
            } else if (response.ok) {
                navigate("/");
            } else {
                setErrorMsg("登録に失敗しました");
            }
        } catch (error) {
            console.error("エラー:", error);
            setErrorMsg("サーバーエラーが発生しました");
        }
    };


    return (
        <div>
            <h2>利用者登録</h2>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">登録</button>
            </form>
            <p>
                <Link to="/">ログインページへ</Link>
            </p>
        </div>
    );
};
export default Register;