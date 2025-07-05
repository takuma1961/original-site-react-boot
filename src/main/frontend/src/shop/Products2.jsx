// src/shop/Products.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../components/Header';


const Products = () => {
  const [products, setProducts] = useState([]);

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
        <h1>商品一覧</h1>
        <section>
          {products.map(product => (
            <div key={product.id} className="product-card">
              <h2><Link to={`/products/${product.id}`}>{product.name}</Link></h2>
              <Link to={`/products/${product.id}`}><img src={`http://localhost:8080/${product.imageUrl}`} alt={product.name} className="product-image" /></Link>
              <p>
                {product.onSale ? (
                  <>
                    <span className="old-price">¥{product.price}</span>
                    <span className="sale-price">¥{product.salePrice}</span>
                  </>
                ) : (
                  <span>¥{product.price}</span>
                )}
              </p>
              <p>在庫数: {product.stock}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default Products;
