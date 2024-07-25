import React from 'react';
import '../styles/Categories.css';

const categories = ['Suspenso', 'Terror', 'Psicológicos', 'Fantasía', 'Alta Fantasía', 'Auto Ayuda', 'Ficción y Literatura', 'Romance', 'Juvenil', 'Cómic'];

function Categories() {
  return (
    <div className='catDiv'>
      <h2 className='catH2'>Categorías:</h2>
      <ul className='catUl'>
        {categories.map(category => (
          <li className='catList' key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;