import react from "react";
import { Link } from "react-router-dom";
import '../components/styles/Style.css';

const FirstHome = () => {
    return (
    <div>
        <main className="container">
            {/* サイト紹介セクション */}
            <section>
                <h2>サイト紹介</h2>
                <p>
                    こちらは私の紹介とショッピングサイトの紹介です。
                </p>
            </section>
            {/* ショッピングリンクセクション */}
            {/* ショッピングサイト */}
            <section className="link-card">
                <Link to="/products" className="link-card-content">
                    <h2>🛍️ ショッピングサイトのポートフォリオを参照する</h2>
                    <p>React + Spring Boot を使ったECサイトです</p>
                </Link>
            </section>

            <section className="link-card">
                <Link to="/Career" className="link-card-content">
                    <h2>💼 経歴紹介</h2>
                    <p>これまでのキャリアをタイムライン形式で紹介します</p>
                </Link>
            </section>


        </main>
        <footer>
            <p>&copy; 2025 オリジナルブランドECサイト</p>
        </footer>
    </div>
    );
};

export default FirstHome;