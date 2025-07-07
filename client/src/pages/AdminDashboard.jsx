// src/pages/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/admin/create-product" style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '6px' }}>
          ➕ Create Full Product
        </Link>
        <Link to="/admin/create-home-product" style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '6px' }}>
          🖼️ Create Home Product
        </Link>
        <Link to="/" style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '6px' }}>
          🏠 Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
