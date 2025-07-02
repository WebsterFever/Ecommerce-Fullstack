import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/action';
import styles from '../styles/UserDropdown.module.css';

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')); // fallback

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={() => setOpen(!open)} className={styles.button}>
        🔔 {user?.name?.split(' ')[0] || 'User'} ▼
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.option}>My Orders</div>
          <div className={styles.option}>My Addresses</div>
          <div className={styles.option}>My Wallet</div>
          <div className={styles.option}>My Account</div>
          <hr />
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
