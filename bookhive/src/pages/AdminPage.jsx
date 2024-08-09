import React, { useState, useEffect } from 'react';
import AddProductForm from '../components/AddProductForm';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../styles/AdminPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminFilters from '../components/AdminFilters';
import "../styles/AdminFilters.css";
import { Button } from 'antd';

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
      setFilteredProducts(productsData);
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = async () => {
    setEditingProduct(null);
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsData);
    setFilteredProducts(productsData);
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        alert('Producto eliminado con éxito');
      } catch (error) {
        console.error('Error eliminando producto: ', error);
      }
    }
  };

  const handleFilter = ({ searchTerm, sortBy, selectedCategory, minPrice, maxPrice }) => {
    let filtered = products.filter(product =>
      product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (minPrice) {
      filtered = filtered.filter(product => product.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(product => product.price <= parseFloat(maxPrice));
    }

    if (sortBy) {
      filtered.sort((a, b) => sortBy === 'asc' ? a.price - b.price : b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy(null);
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    handleFilter({ searchTerm: '', sortBy: null, selectedCategory: '', minPrice: '', maxPrice: '' });
  };

  return (
    <div className="admin-page">
      <Header />
      <h1>Administración de Productos</h1>
      <ul>
        <li><h3>Para poder agregar un producto, rellene los campos inferiores con los datos requeridos y apriete el botón "Agregar Producto".</h3></li>
        <li><h3>Para poder editar un producto, búsquelo mediante los filtros o manualmente y apriete el botón editar. Los campos se rellenarán automáticamente con la información
        habida, y alterando los campos cambiará la información en la base de datos una vez se apriete el botón "Actualizar Producto".
      </h3></li>
      </ul>
      
      <AddProductForm product={editingProduct} onSave={handleSave} />
      
      <AdminFilters
        onFilter={(filters) => {
          handleFilter(filters);
          setSearchTerm(filters.searchTerm);
          setSortBy(filters.sortBy);
          setSelectedCategory(filters.selectedCategory);
          setMinPrice(filters.minPrice);
          setMaxPrice(filters.maxPrice);
        }}
      />
      

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>Precio: ${product.price}</p>
            <p>Categoría: {product.category}</p>
            <img src={product.image} alt={product.name} />
            <button onClick={() => handleEdit(product)}>Editar</button>
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;