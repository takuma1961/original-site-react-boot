import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        fetch(`${apiBaseUrl}/order/history`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setOrderHistory(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("注文履歴の取得に失敗しました", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>読み込み中...</p>;

    return (
        <>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1>注文履歴</h1>

                {orderHistory.length === 0 ? (
                    <p>注文履歴がありません。</p>
                ) : (
                    <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                        <thead>
                            <tr>
                                <th>注文日</th>
                                <th>合計金額</th>
                                <th>ステータス</th>
                                <th>商品詳細</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderHistory.map((order) => (
                                <tr key={order.id}>
                                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                                    <td>¥{order.totalPrice}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <ul>
                                            {order.orderItems.map((item, index) => (
                                                <li key={index}>
                                                    {item.product.name} × {item.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <a href="/products" style={{ display: 'inline-block', marginTop: '20px' }}>
                    ← 商品一覧に戻る
                </a>
            </div>
        </>
    );
};

export default OrderHistory;
