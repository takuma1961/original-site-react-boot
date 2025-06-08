import React from 'react';
import AddToCart from './components/AddToCart';

function App() {
  // 仮のIDと初期値（のちにAPIやルーティングから取得）
  return (
    <div>
      <h1>商品詳細</h1>
      <AddToCart productId={3} stock={10} />
    </div>
  );
}

export default App;
