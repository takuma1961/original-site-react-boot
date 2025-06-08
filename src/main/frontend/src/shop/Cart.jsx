import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/cart", {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setCartItems(data.cartItems);
                setTotalPrice(data.totalPrice);
                setLoading(false);
            })
            .catch(err => {
                console.error("カート情報の取得に失敗しました", err);
                setLoading(false);
            });
    }, []);

    // カート情報を再取得する関数
    const fetchCart = () => {
        fetch("http://localhost:8080/cart", {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setCartItems(data.cartItems);
                setTotalPrice(data.totalPrice);
            })
            .catch(err => {
                console.error("カート情報の取得に失敗しました", err);
            });
    };

    //数量変更
    const handleQuantityChange = (id, newQuantity) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };


    //数量をバックエンドに送信して更新
    const handleUpdate = async () => {
        const params = new URLSearchParams();
        cartItems.forEach(item => {
            params.append("cartItemIds", item.id);
            params.append("quantities", item.quantity);
        });
        try {
            const response = await fetch("http://localhost:8080/cart/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                credentials: "include",
                body: params,
            });

            if (response.ok) {
                alert("数量を更新しました");
                fetchCart(); // 再取得してリフレッシュ
            } else {
                alert("数量の更新に失敗しました");
            }
        } catch (err) {
            console.error("通信エラー:", err);
        }
    }

    //カートの商品を削除
    const handleDelete = async (cartItemId) => {
        const confirmDelete = window.confirm("この商品をカートから削除しますか？");
        if (!confirmDelete) return;

        try {
            const response = await fetch("http://localhost:8080/cart/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                credentials: "include",
                body: new URLSearchParams({
                    cartItemId: cartItemId,
                }),
            });

            if (response.ok) {
                setCartItems(prev => prev.filter(item => item.id !== cartItemId));
                fetchCart(); // 再取得してリフレッシュ
            } else {
                alert("削除に失敗しました");
            }
        } catch (err) {
            console.error("通信エラー:", err);
        }
    }

    //商品の購入
    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert("商品をカートに追加してください");
            return;
        }

        const confirmCheckout = window.confirm("購入を確定しますか？");
        if (!confirmCheckout) return;

        try {
            const response = await fetch("http://localhost:8080/order/checkout", {
                method: "POST",
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // 成功メッセージを表示
                // 注文完了ページへ遷移（React Router使用時）
                window.location.href = "/OrderComplete";
            } else {
                alert(data.error || "購入処理に失敗しました。");
            }
        } catch (error) {
            console.error("購入処理中にエラー:", error);
            alert("通信エラーが発生しました。");
        }
    };


    if (loading) return <p>読み込み中...</p>;

    return (
        <>            {/**共通ヘッダー */}
            <Header />
            <div>
                <h1>カート内容</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <th>商品名</th>
                            <th>価格</th>
                            <th>数量</th>
                            <th>小計</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => {
                            const price = item.product.salePrice || item.product.price;
                            const subtotal = price * item.quantity;
                            return (
                                <tr key={item.id}>
                                    <td>{item.product.name}</td>
                                    <td>¥{price}</td>
                                    <td><input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            handleQuantityChange(item.id, parseInt(e.target.value, 10))
                                        }
                                    />
                                    </td>
                                    <td>¥{subtotal}</td>
                                    <td><button onClick={() => handleDelete(item.id)}>削除</button></td>
                                    <td><button onClick={handleUpdate} style={{ padding: '10px 20px' }}>数量を更新する</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <p><strong>合計金額:</strong> ¥{totalPrice}</p>
                <button onClick={handleCheckout} style={{ padding: '10px 20px', marginTop: '20px' }}>
                    購入する
                </button>
            </div>
        </>
    );
};

export default Cart;