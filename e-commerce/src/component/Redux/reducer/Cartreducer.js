// store/reducers/cartReducer.js
import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART } from '../action/Cartaction';

// import { ADD_TO_CART } from "../action/Cartaction";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if item is already in cart
      const existingItemIndex = state?.items?.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          items: updatedItems,
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
};

export default cartReducer;
