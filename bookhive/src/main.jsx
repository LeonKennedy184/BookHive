import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/Header';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Categories from './components/Categories';
import Inicio from './components/Inicio';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

function Main() {
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
  
  export default Main;