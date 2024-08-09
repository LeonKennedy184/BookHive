import React from 'react';
import Slider from 'react-slick';
import '../styles/Carousel.css';

import book1Image from '../assets/kvothe.png';
import book2Image from '../assets/camino-reyes.png';
import book3Image from '../assets/got.png';

const carouselItems = [
  {
    id: 1,
    image: book1Image,
    title: 'El Nombre del Viento',
    description: '"He robado princesas a reyes agónicos. Incendié la ciudad de Trebon. He pasado la noche con Felurian y he despertado vivo y cuerdo. Me expulsaron de la Universidad a una edad a la que a la mayoría todavía no los dejan entrar. He recorrido de noche caminos de los que otros no se atreven a hablar ni siquiera de día. He hablado con dioses, he amado a mujeres y he escrito canciones que hacen llorar a los bardos. Mi nombre es Kvothe. Quizá hayas oído hablar de mí."',
  },
  {
    id: 2,
    image: book2Image,
    title: 'El Camino de los Reyes',
    description: '"Era su lema. Parte de su lema, al menos. "Vida antes que muerte. Fuerza antes que debilidad. Viaje antes que destino".',
    description2: 'La primera novela de la gran decalogía de Brandon Sánderson: "El Archivo de las Tormentas".'
  },
  {
    id: 3,
    image: book3Image,
    title: 'Juego de Tronos',
    description: '"Si juegas al Juego de Tronos, ganas o mueres. No hay término medio." ',
    description2: 'Primera novela de la gran saga fantástica y política de George R.R. Martin: "Canción de Hielo y Fuego".',
  },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button className="slick-prev">←</button>,
    nextArrow: <button className="slick-next">→</button>,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {carouselItems.map(item => (
          <div key={item.id} className="carousel-item">
            <img src={item.image} alt={item.title} className="carousel-image" />
            <div className="carousel-caption">
              <h3 className="carousel-title">{item.title}</h3>
              <p className="carousel-description">{item.description}</p>
              <p className="carousel-description">{item.description2}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;