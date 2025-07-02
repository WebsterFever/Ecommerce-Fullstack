
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import styles from '../styles/Header.module.css';
import foto from '../assets/foto.jpg';

const Header = () => {
  const reduxUser = useSelector((state) => state.auth?.user);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (reduxUser) {
        setUser(reduxUser);
      } else {
        const stored = localStorage.getItem('user');
        if (stored && stored !== 'undefined') {
          setUser(JSON.parse(stored));
        }
      }
    } catch (err) {
      console.error('Failed to parse user from localStorage:', err);
      setUser(null); // fallback
    }
  }, [reduxUser]);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    setUser(null); // clear local state too
  };

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <img src={foto} alt="The Jean Maker Logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <div className={styles.div}>
          <Link to="/men">Men</Link>
          <Link to="/story">Story</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/policies">Store Policies</Link>
        </div>

        {user ? (
          <div className={styles.dropdownWrapper}>
            <div
              className={styles.dropdownToggle}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {user?.name || 'User'} ▼
            </div>

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
        ) : (
          <div className={styles.login}>
            <Link to="/login">Log In</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
