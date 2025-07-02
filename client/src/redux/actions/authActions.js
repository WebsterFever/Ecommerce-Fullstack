
import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from '../types/authTypes';

const API_URL = 'http://localhost:3001/api';

// Login Action
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });

    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });
  } catch (err) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: err.response?.data?.error || 'Login failed',
    });
  }
};

// Register Action
export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    await axios.post(`${API_URL}/auth/register`, userData);

    // ✅ Don’t save user/token here — let login handle it
    dispatch({ type: REGISTER_SUCCESS });
  } catch (err) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: err.response?.data?.error || 'Register failed',
    });
  }
};

// Logout Action
export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return { type: LOGOUT };
};
