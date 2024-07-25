import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import "../styles/AddProductForm.css"

function AddProductForm({ product, onSave }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setImage(product.image);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        const productRef = doc(db, 'products', product.id);
        await updateDoc(productRef, {
          name,
          price: parseFloat(price),
          category,
          image
        });
        console.log("Product updated with ID: ", product.id);
      } else {
        const docRef = await addDoc(collection(db, 'products'), {
          name,
          price: parseFloat(price),
          category,
          image
        });
        console.log("Product added with ID: ", docRef.id);
      }
      clearFields();
      if (onSave) onSave();
    } catch (e) {
      console.error("Error saving document: ", e);
    }
  };

  const clearFields = () => {
    setName('');
    setPrice('');
    setCategory('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del Producto:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Categoría:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Selecciona una categoría</option>
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
      </div>
      <div>
        <label>URL de la Imagen:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit">{product ? 'Actualizar Producto' : 'Agregar Producto'}</button>
        <button type="button" onClick={clearFields}>Limpiar Campos</button>
      </div>
    </form>
  );
}

export default AddProductForm;