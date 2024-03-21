
// selectors
export const getAllBagProducts = ({ bag }) => bag.bagItems; // Updated selector to access bagItems

// actions
const createActionName = (actionName) => `app/bag/${actionName}`;
const ADD_TO_BAG = createActionName('ADD_TO_BAG');
const UPDATE_IN_BAG = createActionName('UPDATE_IN_BAG');
const CLEAR_BAG = createActionName('CLEAR_BAG');

// action creators
export const addToBag = (payload) => {
  const subtotal = payload.price * payload.quantity; // Assuming price and quantity are properties of the payload
  return { payload: { ...payload, subtotal }, type: ADD_TO_BAG };
};
export const updateInBag = (payload) => ({ payload, type: UPDATE_IN_BAG });
export const clearBag = () => ({ type: CLEAR_BAG });

// Get local bag data
export const getLocalCartData = () => {
  let localCartData = localStorage.getItem('bagItems');
  if (localCartData) {
    return JSON.parse(localCartData);
  } else {
    return [];
  }
};

const bagReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_BAG: {
      const storedBagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
      const updatedBagItemsAfterAddition = [...storedBagItems, action.payload];
      localStorage.setItem('bagItems', JSON.stringify(updatedBagItemsAfterAddition));
      return { ...state, bagItems: updatedBagItemsAfterAddition }; // Updated to set bagItems
    }
    case UPDATE_IN_BAG: {
      const updatedProducts = state.bagItems.map(product => product.id === action.payload.id ? action.payload : product); // Updated to access bagItems
      localStorage.setItem('bagItems', JSON.stringify(updatedProducts));
      return { ...state, bagItems: updatedProducts }; // Updated to set bagItems
    }
    case CLEAR_BAG: {
      localStorage.removeItem('bagItems'); // Corrected localStorage key
      return { ...state, bagItems: [] }; // Updated to set bagItems to empty array
    }
    default:
      return state;
  }
};

export default bagReducer;
