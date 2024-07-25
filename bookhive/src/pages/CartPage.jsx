import React from 'react';
import { useCartStore } from '../store/useCartStore';
import '../styles/CartPage.css';

const CartPage = () => {
  const { products, actions } = useCartStore();
  const { removeProduct } = actions;

  const getTotalItems = () => products.reduce((total, product) => total + product.quantity, 0);
  const getTotalPrice = () => products.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Carrito de Compras</h2>
      <p>Total de productos: {getTotalItems()}</p>
      <p>Precio total: ${getTotalPrice().toFixed(2)}</p>
      <ul>
        {products.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => removeProduct(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button className="checkout-button">Concretar Pedido</button>
    </div>
  );
};

export default CartPage;