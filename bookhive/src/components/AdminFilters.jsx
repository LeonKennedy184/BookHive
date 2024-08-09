import React, { useState } from 'react';
import { Button } from 'antd';

function AdminFilters({ onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = [
    'Todos',
    'Suspenso',
    'Terror',
    'Psicológicos',
    'Fantasía',
    'Alta Fantasía',
    'Auto Ayuda',
    'Ficción y Literatura',
    'Romance',
    'Juvenil',
    'Comic'
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    triggerFilter(event.target.value, sortBy, selectedCategory, minPrice, maxPrice);
  };

  const handleSortChange = (type) => {
    const newSortBy = type === sortBy ? null : type;
    setSortBy(newSortBy);
    triggerFilter(searchTerm, newSortBy, selectedCategory, minPrice, maxPrice);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    triggerFilter(searchTerm, sortBy, event.target.value, minPrice, maxPrice);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
    triggerFilter(searchTerm, sortBy, selectedCategory, event.target.value, maxPrice);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
    triggerFilter(searchTerm, sortBy, selectedCategory, minPrice, event.target.value);
  };

  const triggerFilter = (searchTerm, sortBy, selectedCategory, minPrice, maxPrice) => {
    onFilter({ searchTerm, sortBy, selectedCategory, minPrice, maxPrice });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSortBy(null);
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    triggerFilter('', null, '', '', '');
  };

  return (
    <div className="admin-filters">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <label htmlFor="categorySelect" className="category">Seleccionar Categoría:</label>
      <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map(category => (
          <option key={category} value={category === 'Todos' ? '' : category}>
            {category}
          </option>
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
      <div className="button-group">
        <Button onClick={() => handleSortChange('asc')}>Ordenar por Precio Ascendente</Button>
        <Button onClick={() => handleSortChange('desc')}>Ordenar por Precio Descendente</Button>
        <Button onClick={handleClearFilters}>Limpiar Filtros</Button>
      </div>
    </div>
  );
}

export default AdminFilters;