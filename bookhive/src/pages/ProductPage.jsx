import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import Productos from '../components/Productos';
import "../styles/ProductPage.css";


function ProductPage() {
    return (
      <div>
        <Header />
        <Categories />     
        <Productos />
        <Footer />
      </div>
    );
  }
  
  export default ProductPage;