// Action type for when a login request is initiated (e.g. showing a loader)
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

// Action type for a successful login (e.g. save user in Redux state)
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

// Action type for a failed login attempt (e.g. invalid credentials)
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


// Action type for when a registration request is initiated
export const REGISTER_REQUEST = 'REGISTER_REQUEST';

// Action type for successful user registration
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

// Action type for failed registration (e.g. validation error)
export const REGISTER_FAILURE = 'REGISTER_FAILURE';


// Action type for logging out the user
export const LOGOUT = 'LOGOUT';

/*


 Understanding the file creation flow in Redux helps you grasp how everything 
 connects. Here's the ideal step-by-step order 
 to create the Redux authentication flow, from start to finish:

  1. authTypes.js
Why first?
It defines all action type constants you'll 
use throughout actions and reducers to avoid typos.

2. authReducer.js
Why second?
It handles how state updates based on those action types. 
Writing the reducer early defines what shape your 
Redux state will take (user, loading, error).

3. authActions.js
Why third?
Now that you have action types and the reducer is expecting those types, 
you can write action creators (e.g. login, register, logout) that dispatch them.

4. rootReducer.js
Why now?
You combine all reducers, including authReducer, s
o your Redux store knows how to manage the global state.

5. store.js
Why now?
Once your root reducer is ready, 
you can create the actual Redux store and apply middleware like redux-thunk.

6. Connect Redux to React
Wrap your app with <Provider store={store} /> in your index.js

*/