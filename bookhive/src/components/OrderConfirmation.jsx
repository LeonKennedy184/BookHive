import React, { useEffect, useState } from 'react';
import { useCartStore } from '../useCartStore';
import { useNavigate } from 'react-router-dom';
import { List, Button, Checkbox, Avatar } from 'antd';
import '../styles/OrderConfirmation.css';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const OrderConfirmation = () => {
  const products = useCartStore(state => state.products);
  const [includeShipping, setIncludeShipping] = React.useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data: ', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const shippingCost = 6599;
  const totalPrice = products.reduce((total, product) => total + (product.price * product.quantity), 0);
  const finalPrice = includeShipping ? totalPrice + shippingCost : totalPrice;

  const handlePlaceOrder = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('No hay usuario autenticado.');
      return;
    }

    const order = {
      userId: user.uid,
      userMail: user.email,
      products: products.map(product => ({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      })),
      totalPrice,
      includeShipping,
      shippingCost: includeShipping ? shippingCost : 0,
      finalPrice,
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'orders'), order);
      alert('¡Pedido realizado con éxito!');
      navigate('/home');
    } catch (error) {
      console.error('Error al guardar la orden: ', error);
      alert('Hubo un problema al realizar el pedido. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="order-confirmation-container">
      <h2>Confirmación de Orden</h2>
      <List
        itemLayout="horizontal"
        dataSource={products}
        renderItem={product => (
          <List.Item className="order-item">
            <List.Item.Meta
              avatar={<Avatar src={product.image} />}
              title={product.name}
              description={`$${product.price} x ${product.quantity}`}
            />
            <div className="order-item-total">${(product.price * product.quantity).toFixed(2)}</div>
          </List.Item>
        )}
      />
      <div className="order-summary">
        <Checkbox
          checked={includeShipping}
          onChange={() => setIncludeShipping(!includeShipping)}
          className="include-shipping"
        >
          Incluir envío (${shippingCost})
        </Checkbox>
        {user && (
          <div className="user-details">
            <div className="contact-info">
              <h3>Datos de Contacto</h3>
              <p>Nombre: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Teléfono: {user.phone}</p>
            </div>
            <div className="address-info">
              <h3>Datos de Domicilio</h3>
              <p>Dirección: {user.address}</p>
              <p>Ciudad: {user.city}</p>
              <p>Código Postal: {user.zipCode}</p>
            </div>
            <div className="address-info">
              <h3>Nuestros Datos</h3>
              <p>Dirección: Calle Zalain 685</p>
              <p>Ciudad: Buenos Aires, Argentina</p>
              <p>Código Postal: B1900</p>
            </div>
          </div>
        )}
        <h3 className="order-total">Total: ${finalPrice.toFixed(2)}</h3>
        <Button type="primary" onClick={handlePlaceOrder}>Realizar Pedido</Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;