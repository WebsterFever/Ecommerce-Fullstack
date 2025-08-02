// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminLogin.module.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });

      if (!res.data.user.isAdmin) {
        return setError('Access denied. Not an admin account.');
      }

      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('admin', JSON.stringify(res.data.user));

      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Login failed. Check credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.heading}>Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Login</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default AdminLogin;
