import React from "react";
import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../useCartStore";
import { Button } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';


const Header = () => {
    const { isAuthenticated, loading, userRole } = useAuth();
    const products = useCartStore(state => state.products);
    const totalProducts = products.reduce((total, product) => total + product.quantity, 0);
    const navigate = useNavigate();

const handleLogout = async () => {
    try {
        await signOut(auth);
        navigate('/login');
    } catch (error) {
        console.error("Error al cerrar sesión: ", error);
    }
};

    return (
        <header>
            <div className="logo">
                <img src="./src/assets/logosinfondo.png" alt="logo" />
            </div>
            <nav>
                <ul className="nav-list">
                    <li className="nav-item"><Link to="/home" className="nav-link-li">Inicio</Link></li>
                    <li className="nav-item"><Link to="/product" className="nav-link-li">Productos</Link></li>
                    <li className="nav-item"><Link to="/nosotros" className="nav-link-li">Sobre Nosotros</Link></li>

                    {isAuthenticated && userRole === 'admin' && (
                        <li className="nav-item"><Link to="/admin" className="nav-link-li">Página de Administrador</Link></li>
                    )}

                    {isAuthenticated && userRole === 'user' && (
                        <li className="nav-item"><Link to="/order-confirmation" className="nav-link-li">Pedido {totalProducts > 0 && `(${totalProducts})`}</Link></li>
                    )}
                    
                </ul>
                <div className="auth-buttons">
                    {isAuthenticated ? (
                        <>
                            <Button className="button-auth-logout" onClick={handleLogout}>Cerrar Sesión</Button>
                        </>
                    ) : (
                        <>
                            <Button className="button-auth"><Link to="/login" className="nav-link-bu">Iniciar Sesión</Link></Button>
                            <Button className="button-auth"><Link to="/register" className="nav-link-bu">Registrarse</Link></Button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;

