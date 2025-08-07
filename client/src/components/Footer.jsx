import React from 'react';
import styles from '../styles/Footer.module.css';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.column}>
          <h4>c/o WSL Ecommerce</h4>
          <button className={styles.button}>ACCOUNT</button>
        </div>

        <div className={styles.column}>
          <h4>GET OUR NEWSLETTER</h4>
          <button className={styles.button}>SIGN UP</button>
        </div>

        <div className={styles.column}>
          <h4>COMPANY</h4>
          <ul>
            <li>Cookie Policy</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>HELP & INFORMATION</h4>
          <ul>
            <li>Help Center</li>
            <li>Ordering & Payment</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>WSL Ecommerce</h4>
          <ul>
            <li>About</li>
            <li>Journal</li>
            <li>Careers</li>
          </ul>
          <div className={styles.socialIcons}>
            <FaInstagram />
            <FaFacebookF />
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>©2025 by WSL Ecommerce<br />All Rights Reserved</p>
        <p className={styles.description}>
          Welcome to WSL Ecommerce – your destination for quality fashion and beyond. 
          We believe in a future where style meets sustainability, offering high-quality 
          clothing with transparency and integrity. Our platform connects customers with 
          curated collections built on ethical values, exceptional craftsmanship, and timeless design. <br />
          Founded with a vision to reshape online shopping, WSL Ecommerce proudly leads innovation, 
          accessibility, and purpose-driven retail for the modern world.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
