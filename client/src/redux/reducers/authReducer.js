// Import action type constants for authentication-related actions
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from '../../redux/types/authTypes';


// Attempt to retrieve user data from localStorage when app starts
let userFromStorage = null;
try {
  const storedUser = localStorage.getItem('user'); // Get 'user' from localStorage
  if (storedUser && storedUser !== 'undefined') {
    userFromStorage = JSON.parse(storedUser); // Parse JSON string into an object
  }
} catch (e) {
  userFromStorage = null; // In case of error (e.g. invalid JSON), fallback to null
}


// Define the initial state of the authentication slice
const initialState = {
  user: userFromStorage,  // Set the user if found in storage, else null
  loading: false,         // Used to show loading spinner during async actions
  error: null,            // Used to store error messages from failed requests
};


// The actual reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {

    // When login or register request is sent, start loading and clear error
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };

    // If login is successful, store the user and stop loading
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    // If register is successful, stop loading (user stays null until login)
    case REGISTER_SUCCESS:
      return { ...state, loading: false, error: null };

    // If login or register failed, store the error message
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return { ...state, error: action.payload, loading: false };

    // On logout, clear the user and any error
    case LOGOUT:
      return { ...state, user: null, error: null };

    // Default: return unchanged state for any unknown action
    default:
      return state;
  }
};

// Export the reducer to be combined in the rootReducer
export default authReducer;
