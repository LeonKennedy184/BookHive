import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from 'antd';
import '../styles/Productos.css';
import { getProducts } from '../services/productService';
import Spinner from './Spinner';

function Productos() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = [
    "Suspenso",
    "Terror",
    "Psicológicos",
    "Fantasía",
    "Alta Fantasía",
    "Auto Ayuda",
    "Ficción y Literatura",
    "Romance",
    "Juvenil",
    "Comic"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (type) => {
    if (type === sortBy) {
      setProducts([...products].reverse());
    } else {
      const sortedProducts = [...products].sort((a, b) => {
        if (type === 'asc') {
          return a.price - b.price;
        } else if (type === 'desc') {
          return b.price - a.price;
        }
        return 0;
      });
      setProducts(sortedProducts);
    }
    setSortBy(type);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy(null);
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
  };

  let filteredProducts = products.filter(product =>
    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(product =>
      product.category === selectedCategory
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(product =>
      product.price >= parseFloat(minPrice)
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(product =>
      product.price <= parseFloat(maxPrice)
    );
  }

  if (!products.length) {
    return <Spinner />;
  }

  if (!products) {
    return <Spinner />;
  }

  return (
    <div className='product-div'>
      <h2>Nuestros Productos</h2>

      <div className='controls'>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <label htmlFor="categorySelect" className='category'>Seleccionar Categoría:</label>
        <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Todos</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />

        <Button onClick={() => handleSortChange('asc')}>Ordenar por Precio Ascendente</Button>
        <Button onClick={() => handleSortChange('desc')}>Ordenar por Precio Descendente</Button>
        <Button onClick={clearFilters}>Limpiar Filtros</Button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Productos;