import React from 'react';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div>
      <Header /> 

      <div className={styles.container}>
        <h1>Welcome to The Jean Maker</h1>
        <p>Your perfect pair of jeans is just a click away.</p>
      </div>
    </div>
  );
};

export default Home;
