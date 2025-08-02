// src/pages/AdminRegister.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminRegister.module.css';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    secret: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:3001/api/admin/create-admin', formData);
      navigate('/admin/login');
    } catch (err) {
      console.error(err);
      setError('❌ Registration failed. Please check the form or secret.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Admin Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="secret"
          placeholder="Secret Token"
          value={formData.secret}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Register</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default AdminRegister;
