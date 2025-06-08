import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // 共通ヘッダーがある場合

const OrderComplete = () => {
    return (
        <>
            <Header />
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1>ご注文ありがとうございます！</h1>
                <p style={{ fontSize: '18px', marginTop: '20px' }}>
                    ご注文が正常に完了しました。<br />
                    ご登録のメールアドレス宛に注文確認メールを送信しています。
                </p>
                <Link to="/home" style={{ marginTop: '30px', display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>
                    ホームへ戻る
                </Link>
            </div>
        </>
    );
};

export default OrderComplete;
