import React from 'react';
import { Link } from 'react-router-dom';
import './css/Style.css'; // 必要に応じてスタイルを外部ファイルに分離

const Header = () => {
    return (
        <header className="site-header">
            <nav className="header-nav">
                <ul className="nav-list">
                    <li><Link to="/cart">🛒 カート</Link></li>
                    <li><Link to="/home">🏠 ホームへ戻る</Link></li>
                    <li><Link to="/contact">✉️ お問い合わせ</Link></li>
                    <li><Link to="/OrderHistory">📜 注文履歴</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
