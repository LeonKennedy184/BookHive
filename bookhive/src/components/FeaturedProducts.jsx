import React from 'react';
import '../styles/FeaturedProducts.css';
import ProductCardHome from './ProductCardHome';


import producto1Image from '../assets/imperio-final.png'
import producto2Image from '../assets/pozo-ascencion.png';
import producto3Image from '../assets/heroe-de-las-eras.png'
import producto4Image from '../assets/aleación-de-ley.png'
import producto5Image from '../assets/name-wind.png'
import producto6Image from '../assets/temor.png'
import producto7Image from '../assets/juego-de-tronos.png'
import producto8Image from '../assets/ultimo-deseo.png'

const products = [
  { id: 1, name: 'Nacidos de la Bruma I - El Imperio Final', price: 41568, image: producto1Image, alt: 'ImperioFinal' },
  { id: 2, name: 'Nacidos de la Bruma II -El Pozo de la Ascención', price: 41599, image: producto2Image, alt: 'Pozo' },
  { id: 3, name: 'Nacidos de la Bruma III -El Héroe de las Eras', price: 41599, image: producto3Image, alt: 'Heroe' },
  { id: 4, name: 'Nacidos de la Bruma IV -Aleación de Ley', price: 23999, image: producto4Image, alt: 'Aleación'},
];

const products2 = [
    { id: 5, name: 'El Nombre del Viento', price: 49599, category: 'Alta Fantasía', image: producto5Image, alt: 'ImperioFinal' },
    { id: 6, name: 'El Temor de un Hombre Sabio', price: 49399, category: 'Alta Fantasía', image: producto6Image, alt: 'Pozo' },
    { id: 7, name: 'Canción de Hielo y Fuego I - Juego de Tronos', price: 34599, category: 'Acción', image: producto7Image, alt: 'Heroe' },
    { id: 8, name: 'La Saga de Geralt de Rivia I - El Último Deseo', price: 28600, category: 'Auto Ayuda', image: producto8Image, alt: 'Aleación'},
];


function FeaturedProducts() {
  
  
  return (
    <div className='fPDiv'>
      <h2 className='fPH2'>Productos Destacados:</h2>
      <h2 className='presentador'>Saga "Nacidos de la Bruma"</h2>
      <div className='productList'>
        {products.map(product => (
          <ProductCardHome key={product.id} product={product} />
        ))}
      </div>
      <h2 className='fPH2'>Más libros que leer:</h2>
      <div className='productList'>
      {products2.map(product => (
          <ProductCardHome key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;