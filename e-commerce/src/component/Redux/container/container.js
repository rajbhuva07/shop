// store/store.js
import { createStore, combineReducers } from 'redux';
import cartReducer from '../reducer/Cartreducer';
// import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

console.log('Store:', store); // Ensure this prints a valid Redux store with getState function

export default store;
