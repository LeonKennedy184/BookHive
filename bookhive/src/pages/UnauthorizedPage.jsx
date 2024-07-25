import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import "../styles/UnauthorizedPage.css"

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-page">
      <h1>Acceso Denegado</h1>
      <p>Lo siento, no tienes permisos para acceder a esta página.</p>
      <Button className='unauthorized-Button'><Link to="/home" className="nav-link-li">Inicio</Link></Button>
    </div>
  );
};

export default UnauthorizedPage;