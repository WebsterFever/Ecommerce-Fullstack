import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/CreateHomeProductForm.module.css';

const CreateHomeProductForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem('adminToken');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error loading products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) return setMessage('Please provide both product name and image.');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:3001/api/products/upload-home-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('✅ Product created successfully!');
      setName('');
      setImage(null);
      setPreview(null);
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || '❌ Error creating product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Home Page Product</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        {preview && <img src={preview} alt="Preview" className={styles.preview} />}
        <button type="submit">Create Product</button>
        {message && <p className={styles.message}>{message}</p>}
      </form>

      {/* Product list with delete buttons (only for admin) */}
      <div className={styles.adminProductGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={`http://localhost:3001${product.mainImage}`} alt={product.name} className={styles.productImage} />
            <h3>{product.name}</h3>
            <button onClick={() => handleDelete(product.id)} className={styles.deleteBtn}>🗑 Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateHomeProductForm;
