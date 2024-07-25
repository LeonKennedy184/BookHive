import React from 'react';
import '../styles/Nosotros.css'

function Nosotros() {
  return (
    <div className='usDiv'>
      <h2>Estos somos nosotros.</h2>
      <p>Somos un grupo de personas aficionados a la lectura y a la escritura de historias que difícilmente ocurrirían en la vida real.</p>
      <p>Al principio probamos publicitando los libros, intentando convencer a las personas de comprarlos. No funcionó. Así que decidimos hacer una página web para que la gente directamente vengan aquí a comprarlos luego de interesarse por ellos en algún otro lado.</p>
      <p>Llevamos poco menos de un año trabajando en esto, así que no tenemos demasiada experiencia tampoco. Esta página no es la más atractiva, pero consideramos que sin duda podría verse peor.</p>
      <p>Somos un grupo pequeño, pero abierto a nuevos aficionados. Y... ¡Hey!, también somos de mente abierta. Aceptamos cualquier tipo de libro que quieras publicitar.</p>
      <h3>Si quieres contactarnos...</h3>
      <ul>
        <li><p>Estamos ubicados (temporalmente) en la calle Zalain al 685, en la provincia de Buenos Aires, Argentina. Temporalmente porque la renta es costosa. Y los libros no "rentan" tanto.</p></li>
        <li><p>Puedes enviarnos cualquier correo a la siguiente dirección: <a className='mail' href="https://www.google.com/intl/es-419/gmail/about/">bookhive_contact@gmail.com</a>. Es probable que lo leamos. Es probable que no. Somos pobres, pero no por ello vagos, y nos consideramos gente muy ocupada.</p></li>
        <li><p>También puedes enviarnos un mensaje al +54 9 11 256 8597. No te atenderemos si nos llamas; tenemos pánico social y miedo a la interacción (no te atenderemos porque no atendemos a números no agendados, lo siento).</p></li>
      </ul>
      <p>En resumen, puedes intentar sumarte a nosotros si gustas. Si tienes más de cinco libros en tu casa, y más de seis en tu cabeza, entonces vamos por un buen camino.</p>
      <p>Besos y abrazos.</p>
    </div>
  );
}

export default Nosotros;