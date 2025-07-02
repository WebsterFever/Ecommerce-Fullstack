import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import styles from '../styles/RegisterForm.module.css';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (submitted && !loading && !error) {
      navigate('/login');
    }
  }, [submitted, loading, error, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    setSubmitted(true);
  };

  return (
    <form className={styles.form} onSubmit={handleRegister}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.loginLink}>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </form>
  );
};

export default RegisterForm;
