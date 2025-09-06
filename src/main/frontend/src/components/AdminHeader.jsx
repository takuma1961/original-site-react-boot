import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Style.css'; // 必要に応じてスタイルを外部ファイルに分離

const Header = () => {
    const navigate = useNavigate(); // ✅ navigate 関数を取得
    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.clear();//セッションをすべて削除

        //ログインページへ遷移
        navigate('/');
    };
    return (
        <header className="site-header">
            <nav className="header-nav">
                <ul className="nav-list">
                    <li><button onClick={handleLogout} className="logout-button">🚪 ログアウト</button></li>
                    <li><Link to="/AdminLogin">🛍️ 管理者ログイン</Link></li>
                    <li><Link to="/AdminRegister">🛒 管理者登録</Link></li>
                    <li><Link to="/contact">✉️ お問い合わせ</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
