import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/CreateProductForm.module.css';

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    brand: '',
    category: '',
    description: '',
    stock: '',
    mainImage: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return alert('Not authorized');

    try {
      const res = await axios.post('http://localhost:3001/api/products', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('✅ Product created successfully!');
      setFormData({
        name: '',
        sku: '',
        price: '',
        brand: '',
        category: '',
        description: '',
        stock: '',
        mainImage: '',
      });
    } catch (err) {
      console.error(err);
      setMessage('❌ Error creating product');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create New Product</h2>

      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" required />
      <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" />
      <input name="mainImage" value={formData.mainImage} onChange={handleChange} placeholder="Main Image URL" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />

      <button type="submit">Create Product</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CreateProductForm;
