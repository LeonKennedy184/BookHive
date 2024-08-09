import React from 'react';
import Header from '../components/Header';
import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import Inicio from '../components/Inicio';

function HomePage() {
    return (
      <div className='all'>
        <Header />
        <Inicio />
        <Carousel />
        <FeaturedProducts />
        <Footer />
      </div>
    );
}

export default HomePage;