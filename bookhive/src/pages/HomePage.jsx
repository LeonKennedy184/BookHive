import React from 'react';
import Header from '../components/Header';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import Inicio from '../components/Inicio';
import '../styles/HomePage.css'

function HomePage() {
    return (
      <div className='all'>
        <Header />
        <Inicio />
        <Banner />
        <Categories />
        <FeaturedProducts />
        <Footer />
      </div>
    );
  }
  
  export default HomePage;