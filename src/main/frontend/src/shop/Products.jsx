// src/shop/Products.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("http://localhost:8080/products", {
      credentials: "include", // 認証Cookieが必要な場合
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("商品取得失敗", err);
        setLoading(false);
      });

  }, []);

  return (
    <>
      {/**共通ヘッダー */}
      <Header />
      <main>
        {loading ? (
          <p>読み込み中...</p>
        ) : products.length === 0 ? (
          <p>現在、商品がありません。</p>
        ) : (
          <section className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/products/${product.id}`}>
                  <img src={`http://localhost:8080/${product.imageUrl}`} alt={product.name} className="product-image-home" />
                  <h2 className="product-name">{product.name}</h2>
                </Link>
                <p className="product-price">
                  {product.onSale ? (
                    <>
                      <span className="old-price">¥{product.price}</span>{" "}
                      <span className="sale-price">¥{product.salePrice}</span>
                    </>
                  ) : (
                    <span>¥{product.price}</span>
                  )}
                </p>
                <p className={`stock ${product.stock === 0 ? "out-of-stock" : ""}`}>
                  {product.stock > 0 ? `在庫数: ${product.stock}` : "在庫なし"}
                </p>
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  );
};

export default Products;
