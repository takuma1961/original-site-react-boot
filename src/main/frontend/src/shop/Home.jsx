import react from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';

const Home = () => {
    return (
        <>
            {/**共通ヘッダー */}
            <Header />

            <main className="container">
                {/* サイト紹介セクション */}
                <section>
                    <h2>サイト紹介</h2>
                    <p>
                        こちらは独自ブランド商品の販売を行うサイトです。おしゃれで高品質な商品をぜひお楽しみください。
                    </p>
                </section>
                {/* ショッピングリンクセクション */}
                <section><h2>ショッピングを始める</h2>
                    <Link to="/products" className="btn">
                        商品一覧を見る
                    </Link>
                </section>
            </main>
            <footer>
                <p>&copy; 2025 オリジナルブランドECサイト</p>
            </footer>
        </>
    );
};

export default Home;