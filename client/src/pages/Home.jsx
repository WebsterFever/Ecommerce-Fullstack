import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />

      <div className={styles.heroSection}>
        <h1>Welcome to The Jean Maker</h1>
        <p>Your perfect pair of jeans is just a click away.</p>
      </div>

      <div className={styles.container}>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                {product.mainImage ? (
                  <img
                    src={`http://localhost:3001${product.mainImage}`}
                    alt={product.name}
                    className={styles.productImage}
                  />
                ) : (
                  <div className={styles.placeholder}>No Image</div>
                )}
                <h3>{product.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
