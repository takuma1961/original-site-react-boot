import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from '../components/Header';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/products/${id}`, {
      method: "GET",
      credentials: "include", // ← これが超重要（セッション/Cookieを送信）
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => console.error("商品詳細の取得に失敗しました", err));
  }, [id]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          productId: product.id,
          quantity: Number(quantity),
        }),
      });

      if (response.ok) {
        setMessage("カートに追加しました！");
      } else {
        setMessage("カートへの追加に失敗しました");
      }
    } catch (error) {
      console.error("エラー:", error);
      setMessage("通信エラーが発生しました");
    }
  };

  if (!product) return <p>読み込み中...</p>;

  return (
    <>
      {/**共通ヘッダー */}
      <Header />
      <div className="product-detail-container">
        <h1>{product.name}</h1>

        <img
          src={`http://localhost:8080/${product.imageUrl}`}
          alt="商品画像"
          className="product-image"
          style={{ maxWidth: "300px" }}
        />

        <p>
          {product.salePrice ? (
            <>
              <span className="old-price">¥{product.price}</span>{" "}
              <span className="sale-price">¥{product.salePrice}</span>
            </>
          ) : (
            <>¥{product.price}</>
          )}
        </p>

        <p>在庫数: {product.stock}</p>
        <p>閲覧数: {product.viewCount}</p>

        <form onSubmit={handleAddToCart}>
          <input type="hidden" name="productId" value={product.id} />
          <label>
            数量:
            <input
              type="number"
              name="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              required
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <button type="submit">カートに追加</button>
        </form>

        {message && <p id="add-to-cart-message" style={{ color: "green" }}>{message}</p>}

        <br />
        <Link to="/products">← 商品一覧へ戻る</Link>
      </div>
    </>
  );
};

export default ProductDetail;
