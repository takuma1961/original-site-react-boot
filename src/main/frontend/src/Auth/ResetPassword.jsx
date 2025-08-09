import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('パスワードが一致しません');
            return;
        }

        try {
            const res = await fetch(`${apiBaseUrl}/api/users/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
            });

            if (res.ok) {
                setMessage('パスワードが再設定されました');
            } else {
                const data = await res.json();
                setMessage(data.message || 'エラーが発生しました');
            }
        } catch (err) {
            setMessage('通信エラーが発生しました');
        }
    };

    return (
        <div>
            <h2>パスワード再設定</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleReset}>
                <input
                    type="password"
                    placeholder="新しいパスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="確認用パスワード"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">再設定する</button>
            </form>
            <br />
            <Link to="/"> ログイン画面へ戻る</Link>
        </div>
    );
};
export default ResetPassword;