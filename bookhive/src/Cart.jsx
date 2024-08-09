import React from 'react';
import { useCartStore } from './useCartStore';
import { Avatar, Drawer, List, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

export const Cart = () => {
  const isOpen = useCartStore(state => state.isOpen);
  const products = useCartStore(state => state.products);
  const { closeCart, removeProduct } = useCartStore(state => state.actions);
  const navigate = useNavigate();

  const totalPrice = products.reduce((total, product) => total + (product.price * product.quantity), 0);

  const handleCheckout = () => {
    if (products.length === 0) {
      alert('No puedes realizar un pedido con el carrito vacío. Asegúrate de tener al menos un producto en tu carrito de compras.');
    } else {
      closeCart();
      navigate('/order-confirmation');
    }
  };

  return (
    <Drawer
      title="Carrito de Compras"
      placement="right"
      onClose={closeCart}
      open={isOpen}
    >
      <List
        itemLayout="horizontal"
        dataSource={products}
        renderItem={product => (
          <List.Item
            actions={[
              <Button onClick={() => removeProduct(product.id)}>Eliminar</Button>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={product.image} />}
              title={product.name}
              description={`$${product.price} x ${product.quantity}`}
            />
          </List.Item>
        )}
      />
      <div style={{ marginTop: 16 }}>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <Button type="primary" onClick={handleCheckout}>Realizar Pedido</Button>
      </div>
    </Drawer>
  );
};