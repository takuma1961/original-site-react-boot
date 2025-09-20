import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Style.css'; // 必要に応じてスタイルを外部ファイルに分離

const Header = () => {
    const navigate = useNavigate(); // ✅ navigate 関数を取得
    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.clear();//セッションをすべて削除

        //ログインページへ遷移
        navigate('/Login');
    };
    return (
        <header className="site-header">
            <nav className="header-nav">
                <ul className="nav-list">
                    <li><Link to="/home">🏠 ホームへ戻る</Link></li>
                    <li><Link to="/products">🛍️ ショップ</Link></li>
                    <li><Link to="/cart">🛒 カート</Link></li>
                    <li><Link to="/contact">✉️ お問い合わせ</Link></li>
                    <li><Link to="/OrderHistory">📜 注文履歴</Link></li>
                    <li><button onClick={handleLogout} className="logout-button">🚪 ログアウト</button></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
