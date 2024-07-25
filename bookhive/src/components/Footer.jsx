import React from "react";
import "../styles/Footer.css";


function Footer() {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Información de Contacto</h3>
            <p>Dirección: Calle Zalain 685, Buenos Aires, Argentina</p>
            <p>Email: bookhive_contact@gmail.com</p>
            <p>Teléfono: +54 9 11 256 8597</p>
          </div>
          <div className="footer-section">
            <h3>Enlaces Útiles</h3>
            <ul>
              <li><a href="/home">Página Principal</a></li>
              <li><a href="/product">Productos</a></li>
              <li><a href="/nosotros">Sobre Nosotros</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Síguenos</h3>
            <p>Síguenos en nuestras redes sociales para estar al tanto de nuestras novedades:</p>
            <div className="social-icons">
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src="./src/assets/youtube_logo.png" alt="logopng" className="logoimpresionante" /></a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src="./src/assets/instagram-logo.png" alt="logopng" className="logoimpresionante" /></a>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src="./src/assets/x-logo.png" alt="logopng" className="logoimpresionante" /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 BookHive. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;