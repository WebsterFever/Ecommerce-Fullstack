// Import axios for making HTTP requests to the backend API
import axios from 'axios';

// Import action types for login, register, and logout processes
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from '../types/authTypes';

// Set the base URL of your API
const API_URL = 'http://localhost:3001/api';


// ✅ Login Action Creator (Thunk)
export const login = (email, password) => async (dispatch) => {
  // Dispatch a LOGIN_REQUEST action to indicate login is starting
  dispatch({ type: LOGIN_REQUEST });

  try {
    // Send login credentials to the API
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    const user = res.data.user;

    // ❌ If the user is an admin, prevent login through the regular user interface
    if (user.isAdmin) {
      return dispatch({
        type: LOGIN_FAILURE,
        payload: 'Admins cannot log in here. Use the admin portal.',
      });
    }

    // ✅ Save user info and token to localStorage if login is successful
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', res.data.token);

    // Dispatch LOGIN_SUCCESS and pass user data as payload
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (err) {
    // If there's an error, dispatch LOGIN_FAILURE with the error message
    dispatch({
      type: LOGIN_FAILURE,
      payload: err.response?.data?.error || 'Login failed',
    });
  }
};


// ✅ Register Action Creator (Thunk)
export const register = (userData) => async (dispatch) => {
  // Dispatch a REGISTER_REQUEST to indicate registration is in progress
  dispatch({ type: REGISTER_REQUEST });

  try {
    // Send user data to backend to create a new user
    await axios.post(`${API_URL}/auth/register`, userData);

    // ✅ Dispatch REGISTER_SUCCESS if registration is successful
    // ❌ Don’t auto-login the user here — let them log in manually
    dispatch({ type: REGISTER_SUCCESS });
  } catch (err) {
    // If registration fails, dispatch REGISTER_FAILURE with the error
    dispatch({
      type: REGISTER_FAILURE,
      payload: err.response?.data?.error || 'Register failed',
    });
  }
};


// ✅ Logout Action Creator (Simple Action)
export const logout = () => {
  // Remove user and token from localStorage
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  // Dispatch the LOGOUT action
  return { type: LOGOUT };
};
