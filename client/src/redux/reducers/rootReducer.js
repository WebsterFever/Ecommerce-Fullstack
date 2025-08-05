// Import combineReducers to merge multiple reducers into one root reducer
import { combineReducers } from 'redux';

// Import the authentication reducer
import authReducer from './authReducer';

// Combine all reducers into a single root reducer object
// You can add more reducers here (e.g., products, cart, admin, etc.)
const rootReducer = combineReducers({
  auth: authReducer, // The auth state will be managed by authReducer and accessible as state.auth
});

// Export the root reducer to be used in the Redux store configuration
export default rootReducer;
