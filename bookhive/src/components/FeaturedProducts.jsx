import React, { useEffect, useState } from 'react';
import '../styles/FeaturedProducts.css';
import ProductCardHome from './ProductCardHome';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useCartStore } from '../useCartStore';
import Spinner from './Spinner';

const FEATURED_PRODUCT_IDS = ['PrimerDocumento', 'YGFKvqu0VbYql9xJdJOu', 'iJMa9aNUjYb1pQgfr1RO'];
const ADDITIONAL_PRODUCT_IDS = ['f72ga5Z0ytHEv9Cl2IWV', 'KtpxvMWmCK5itoPb0Pfu', 'G7eN6UTfIVbHY4SHxDn0', 'yRSAO7R05CwHBaCPFV72'];
const THIRD_PRODUCT_IDS = ['39', '40'];
const FOURTH_PRODUCT_IDS = ['33', '34', '35', '36'];

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [additionalProducts, setAdditionalProducts] = useState([]);
  const [thirdProducts, setThirdProducts] = useState([]);
  const [fourthProducts, setFourthProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addProduct } = useCartStore(state => state.actions);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsData = [];
      for (const id of FEATURED_PRODUCT_IDS) {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          productsData.push({ id: docSnap.id, ...docSnap.data() });
        }
      }
      setProducts(productsData);
      setLoading(false);
    };

    const fetchAdditionalProducts = async () => {
      const additionalProductsData = [];
      for (const id of ADDITIONAL_PRODUCT_IDS) {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          additionalProductsData.push({ id: docSnap.id, ...docSnap.data() });
        }
      }
      setAdditionalProducts(additionalProductsData);
    };

    const fetchThirdProducts = async () => {
      const thirdProductsData = [];
      for (const id of THIRD_PRODUCT_IDS) {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          thirdProductsData.push({ id: docSnap.id, ...docSnap.data() });
        }
      }
      setThirdProducts(thirdProductsData);
    };

    const fetchFourthProducts = async () => {
      const fourthProductsData = [];
      for (const id of FOURTH_PRODUCT_IDS) {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          fourthProductsData.push({ id: docSnap.id, ...docSnap.data() });
        }
      }
      setFourthProducts(fourthProductsData);
    };


    fetchProducts();
    fetchAdditionalProducts();
    fetchThirdProducts();
    fetchFourthProducts();
  }, []);

  const handleAddToCart = (product) => {
    addProduct(product);
  };

  return (
    <div className='fPDiv'>
      {loading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <>
      <h2 className='fPH2'>Productos Destacados:</h2>
      <h2 className='fPH2Mid'>Trilogía de Nacidos de la Bruma:</h2>
      <div className='productList'>
        {products.map(product => (
          <div key={product.id} className="product-card-wrapper">
            <ProductCardHome product={product} />
          </div>
        ))}
      </div>
      <h2 className='fPH2Mid'>Segunda Era de Nacidos de la Bruma:</h2>
      <div className='productList'>
        {additionalProducts.map(product => (
          <div key={product.id} className="product-card-wrapper">
            <ProductCardHome product={product} />
          </div>
        ))}
      </div>
      <h2 className='fPH2Mid'>Crónicas del Asesino de Reyes:</h2>
      <div className='productList'>
        {thirdProducts.map(product => (
          <div key={product.id} className="product-card-wrapper">
            <ProductCardHome product={product} />
          </div>
        ))}
      </div>
      <h2 className='fPH2Mid'>El Archivo de las Tormentas:</h2>
      <div className='productList'>
        {fourthProducts.map(product => (
          <div key={product.id} className="product-card-wrapper">
            <ProductCardHome product={product} />
            </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default FeaturedProducts;