// src/redux/reducers/authReducer.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from '../../redux/types/authTypes';

let userFromStorage = null;
try {
  const storedUser = localStorage.getItem('user');
  if (storedUser && storedUser !== 'undefined') {
    userFromStorage = JSON.parse(storedUser);
  }
} catch (e) {
  userFromStorage = null;
}

const initialState = {
  user: userFromStorage,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case REGISTER_SUCCESS:
      return { ...state, loading: false, error: null };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case LOGOUT:
      return { ...state, user: null, error: null };

    default:
      return state;
  }
};

export default authReducer;
