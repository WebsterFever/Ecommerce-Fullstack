import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import styles from '../styles/Header.module.css';
import foto from '../assets/foto.jpg';

const Header = () => {
  const reduxUser = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load user and admin from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedAdmin = localStorage.getItem('admin');

      if (reduxUser) {
        setUser(reduxUser);
      } else if (storedUser && storedUser !== 'undefined') {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }

      if (storedAdmin && storedAdmin !== 'undefined') {
        setAdmin(JSON.parse(storedAdmin));
      } else {
        setAdmin(null);
      }
    } catch (err) {
      console.error('Error parsing user/admin:', err);
      setUser(null);
      setAdmin(null);
    }
  }, [reduxUser]);

  const handleLogout = () => {
    if (user) {
      dispatch(logout());
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    }

    if (admin) {
      localStorage.removeItem('admin');
      localStorage.removeItem('adminToken');
      setAdmin(null);
    }

    setDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <img src={foto} alt="The Jean Maker Logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <div className={styles.div}>
          <Link to="/men">Men</Link>
          <Link to="/women">Women</Link>
          <Link to="/kids">Kids</Link>
          <Link to="/story">Story</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/policies">Store Policies</Link>
        </div>

        {/* Show user dropdown if logged in as user */}
        {user && (
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <button
              className={styles.dropdownToggle}
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {user?.name || 'User'} ▼
            </button>

            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link to="/me">Profile</Link>
                <Link to="/orders">My Orders</Link>
                <Link to="/addresses">My Addresses</Link>
                <Link to="/wallet">My Wallet</Link>
                <Link to="/account">My Account</Link>
                <hr />
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        )}

        {/* Show Login button only if no user is logged in (ignore admin presence) */}
        {!user && (
          <div className={styles.login}>
            <Link to="/login">Log In</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
