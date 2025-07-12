import react, { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/users/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            setMessage("パスワード再設定用のリンクをメールで送信しました。");
        } else {
            setMessage("メールアドレスが見つかりませんでした。");
        }
    };

    return (
        <div>
            <h2>パスワード再設定</h2>
            <form onSubmit={handleSubmit}>
                <label>メールアドレス:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <button type="submit">再設定リンクを送信</button>
            </form>
            {message && <p>{message}</p>}
            <br />
            <Link to="/"> ログイン画面へ戻る</Link>
        </div>
    );
}
export default ForgotPassword;