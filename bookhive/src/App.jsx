import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { getProducts } from './services/productService';
import { FloatButton } from 'antd'
import { useCartStore } from './useCartStore'
import { Cart } from './Cart'
import { ShoppingCartOutlined } from '@ant-design/icons'

import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import SobreNosotrosPage from './pages/SobreNosotrosPage'
import AdminPage from './pages/AdminPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute';
import UnauthorizedPage from './pages/UnauthorizedPage';


function App() {
  const [products, setProducts] = useState(null)
  const actions = useCartStore(state => state.actions)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        actions.setUser(user);
        actions.loadCart();
      } else {
        actions.setUser(null);
        actions.clearCart();
      }
    });

    return () => unsubscribe();
  }, [actions]);

  if (!products) {
    return <p className='app-loading'>Cargando...</p>
  }

  return (
    <AuthProvider>
      <FloatButton 
        type='primary' 
        icon={<ShoppingCartOutlined />}
        onClick={() => actions.openCart()}
      >
        Carrito
      </FloatButton>

      <Router>
        <Cart />
        <Routes>
          <Route path='/home' element={<HomePage />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/nosotros' element={<SobreNosotrosPage />} />
          <Route path='/order-confirmation' element={<ProtectedRoute element={<OrderConfirmationPage />} requiredRoles={['user']} />} />
          <Route path='/admin' element={<ProtectedRoute element={<AdminPage />} requiredRoles={['admin']} />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/unauthorized' element={<UnauthorizedPage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

function Main() {
  const navigate = useNavigate();
  const actions = useCartStore(state => state.actions);

  const handleCheckout = () => {
    actions.closeCart();
    navigate('/confirm-order');
  };

  return (
    <>
      <Cart onCheckout={handleCheckout} />
    </>
  );
}

export default App
