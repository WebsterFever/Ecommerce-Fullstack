import { Navigate } from 'react-router-dom';

const AdminOnly = ({ children }) => {
  let admin = null;

  try {
    const stored = localStorage.getItem('admin');
    if (stored && stored !== 'undefined') {
      admin = JSON.parse(stored);
    }
  } catch (err) {
    console.error('Error parsing admin from localStorage:', err);
  }

  if (!admin || !admin.isAdmin) {
    return <h2>⛔ Unauthorized: Admins only</h2>;
  }

  return children;
};

export default AdminOnly;
