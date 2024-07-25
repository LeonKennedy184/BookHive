import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Por favor, rellene todos los campos.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
      alert ("Usuario iniciado con Éxito.")
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('El correo electrónico no es válido.');
          break;
        case 'auth/user-not-found':
          setError('No hay ningún usuario registrado con este correo electrónico.');
          break;
        case 'auth/wrong-password':
          setError('La contraseña es incorrecta.');
          break;
        default:
          setError('Error en el inicio de sesión. Verifica tus credenciales.');
          break;
      }
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <h2>Inicie Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          <button type="submit">Iniciar Sesión</button>
          {error && <p className="error">{error}</p>}
          <p>
            ¿No tienes una cuenta? <a href="/register">Regístrate aquí.</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;