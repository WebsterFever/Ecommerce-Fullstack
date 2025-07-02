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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // ✅ Used to detect outside clicks

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync user from Redux or localStorage
  useEffect(() => {
    if (reduxUser) {
      setUser(reduxUser);
    } else {
      try {
        const stored = localStorage.getItem('user');
        if (stored && stored !== 'undefined') {
          setUser(JSON.parse(stored));
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error parsing user:', err);
        setUser(null);
      }
    }
  }, [reduxUser]);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    setUser(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <img src={foto} alt="The Jean Maker Logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <div className={styles.div}>
          <Link to="/men">Men</Link>
          <Link to="/careers">Women</Link>
          <Link to="/policies">Kids</Link>
          <Link to="/story">Story</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/policies">Store Policies</Link>
          
        </div>

        {user ? (
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
