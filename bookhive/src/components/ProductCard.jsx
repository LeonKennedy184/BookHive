import React from 'react';
import '../styles/ProductCard.css'
import { Button } from 'antd';
import { useCartStore } from '../useCartStore';

function ProductCard({ product }) {

  const actions = useCartStore(state => state.actions)

  return (
    
    <div className='card'>

        <div className='card-content'>
            <h3 className='card-title'>{product.name}</h3>
        </div>
        <div className='card-image-container'>
            <img src={product.image} alt={product.name} className='card-image' />
        </div>
        <div>
            <p className='card-price'>${product.price}</p>
        </div>

        <Button onClick={() => actions.addProduct(product)}>Agregar</Button>

    </div>
  );
}

export default ProductCard;