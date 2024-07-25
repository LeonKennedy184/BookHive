import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [role] = useState('user');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !phone || !address || !name || !city || !zipCode) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (!email.includes('@')) {
      setError('El correo electrónico debe contener un "@".');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role,
        phone: phone,
        address: address,
        name: name,
        city: city,
        zipCode: zipCode,
      });

      await signOut(auth);

      alert('Usuario registrado exitosamente. Por favor, inicie sesión.');
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro: ', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('El correo electrónico ya está en uso. Intente con otro.');
      } else {
        setError('Error en el registro. Verifica tus datos.');
      }
    }
  };

  return (
    <div className="container">
      <div className="auth-form">
        <h2>Regístrese</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            required
          />
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
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Número de teléfono"
            required
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="País, provincia (prefectura, estado, etc.) y ciudad"
            required
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Domicilio (Calle, altura, departamento)"
            required
          />
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Código postal"
            required
          />
          <button type="submit">Regístrate</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          ¿Ya tienes una cuenta? <a href="/login">Loguéate aquí.</a>
        </p>
      </div>
    </div>
  );
};

export default Register;