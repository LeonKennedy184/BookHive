import React, { useState } from 'react';
import { Button } from 'antd';

function AdminFilters({ onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    triggerFilter();
  };

  const handleSortChange = (type) => {
    setSortBy(type);
    triggerFilter();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    triggerFilter();
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
    triggerFilter();
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
    triggerFilter();
  };

  const triggerFilter = () => {
    onFilter({
      searchTerm,
      sortBy,
      selectedCategory,
      minPrice,
      maxPrice
    });
  };

  return (
    <div className="admin-filters">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <label htmlFor="categorySelect" className='category'>Seleccionar Categoría:</label>
      <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Todos</option>
        <option value="Suspenso">Suspenso</option>
        <option value="Terror">Terror</option>
        <option value="Psicológicos">Psicológicos</option>
        <option value="Fantasía">Fantasía</option>
        <option value="Alta Fantasía">Alta Fantasía</option>
        <option value="Auto Ayuda">Auto Ayuda</option>
        <option value="Ficción y Literatura">Ficción y Literatura</option>
        <option value="Romance">Romance</option>
        <option value="Juvenil">Juvenil</option>
        <option value="Comic">Cómic</option>
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
      </div>
    </div>
  );
}

export default AdminFilters;