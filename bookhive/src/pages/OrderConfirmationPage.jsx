import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OrderConfirmation from '../components/OrderConfirmation';

function OrderConfirmationPage() {
    return (
      <div className='all'>
        <Header />
        <OrderConfirmation />
        <Footer />
      </div>
    );
  }
  
  export default OrderConfirmationPage;