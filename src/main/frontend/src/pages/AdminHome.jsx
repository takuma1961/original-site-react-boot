
import React, { useEffect, useState } from "react";
import Header from '../components/AdminHeader';

function AdminHome() {
    const [products, setProducts] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        stock: "",
        description: "",
        imagePath: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    // //初回ロード時に商品一覧取得
    useEffect(() => {
        fetch(`${apiBaseUrl}/admin/products`, {
            method: "GET",
            credentials: "include", // 認証Cookieが必要な場合
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
                console.log(data);
            })
            .catch(err => {
                console.error("商品取得失敗", err);
                setLoading(false);
            });

    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/admin/products`, {
                method: "GET",
                credentials: "include", // ← ここに追加
            });
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("商品一覧の取得に失敗しました", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${apiBaseUrl}/admin/products/delete/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                });
            setMessage("削除しました");
            fetchProducts();
        } catch (err) {
            console.error("削除失敗", err);
        }
    };


    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${apiBaseUrl}/admin/products/add`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...newProduct,//Productの要素をすべて展開
                        price: Number(newProduct.price),
                        stock: Number(newProduct.stock),
                    }),

                });
            setMessage("商品を追加しました");
            setNewProduct({ name: "", price: "", stock: "", description: "", imagePath: "" });
            fetchProducts();
        } catch (err) {
            console.error("追加失敗", err);
        }
    };

    const handleUpdate = async (product) => {
        try {
            await fetch(`${apiBaseUrl}/admin/products/update`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...product,
                        price: Number(product.price),
                        stock: Number(product.stock),
                    }),
                });
            setMessage("更新しました");
            fetchProducts();
        } catch (err) {
            console.error("更新失敗", err);
        }
    };


    return (
        <div className="p-6">
            <>            {/**共通ヘッダー */}
                <Header />

                <h2 className="text-xl font-bold mb-4">管理者ダッシュボード</h2>
                {message && <p className="text-green-600">{message}</p>}

                <form onSubmit={handleAdd} className="mb-6 space-y-2">
                    <h3 className="text-lg font-semibold">商品追加</h3>
                    <input
                        type="text"
                        placeholder="商品名"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="価格"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="在庫数"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="説明"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="画像URL"
                        value={newProduct.imagePath}
                        onChange={(e) => setNewProduct({ ...newProduct, imagePath: e.target.value })}
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">追加</button>
                </form>

                <h3 className="text-lg font-semibold mb-2">商品一覧</h3>
                <table className="w-full table-auto border border-collapse border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>商品名</th>
                            <th>価格</th>
                            <th>在庫</th>
                            <th>画像パス</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod) => (
                            <tr key={prod.id} className="border-b">
                                <td>
                                    <input
                                        type="text"
                                        value={prod.name}
                                        onChange={(e) =>
                                            setProducts(products.map((p) =>
                                                p.id === prod.id ? { ...p, name: e.target.value } : p
                                            ))
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={prod.price}
                                        onChange={(e) =>
                                            setProducts(products.map((p) =>
                                                p.id === prod.id ? { ...p, price: e.target.value } : p
                                            ))
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={prod.stock}
                                        onChange={(e) =>
                                            setProducts(products.map((p) =>
                                                p.id === prod.id ? { ...p, stock: e.target.value } : p
                                            ))
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={prod.imageUrl}
                                        onChange={(e) =>
                                            setProducts(products.map((p) =>
                                                p.id === prod.id ? { ...p, imageUrl: e.target.value } : p
                                            ))
                                        }
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleUpdate(prod)} className="text-blue-600 mr-2">
                                        更新
                                    </button>
                                    <button onClick={() => handleDelete(prod.id)} className="text-red-600">
                                        削除
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        </div>

    );
}


export default AdminHome;
