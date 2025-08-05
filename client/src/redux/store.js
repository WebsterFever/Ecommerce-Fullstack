// // Import necessary functions from Redux for creating the store, applying middleware, and composing enhancers
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';

// Import thunk middleware to handle asynchronous actions (like API calls) in Redux
import { thunk } from 'redux-thunk';

// Import the root reducer which combines all your app’s reducers into one
import rootReducer from './reducers/rootReducer'; // ✅ updated path

// Set up Redux DevTools extension if it's available in the browser; otherwise, fallback to default compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store by passing in the root reducer and applying middleware (thunk) with any enhancers
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// Export the store so it can be used by your React app (usually in <Provider> component)
export default store;
