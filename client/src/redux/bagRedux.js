export const getAllBagProducts = (state) => state.bag.bagItems;

// action types
const ADD_TO_BAG = 'app/bag/ADD_TO_BAG';
const UPDATE_BAG = 'app/bag/UPDATE_BAG';
const CLEAR_BAG = 'app/bag/CLEAR_BAG';
const REMOVE_FROM_BAG = 'app/bag/REMOVE_FROM_BAG';

// action creators
export const addToBag = (payload) => ({ type: ADD_TO_BAG, payload });
export const updateBag = (payload) => ({ type: UPDATE_BAG, payload });
export const removeFromBag = (payload) => ({ type: REMOVE_FROM_BAG, payload });
export const clearBag = () => ({ type: CLEAR_BAG });

export const getLocalBagData = () => {
  let localBagData = localStorage.getItem('bagItems');
  return localBagData ? JSON.parse(localBagData) : [];
};

// helper function to update local storage with bag items
const updateLocalStorage = (bagItems) => {
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
};

// reducer
const bagReducer = (statePart = { bagItems: getLocalBagData() }, action) => {
  switch (action.type) {
    case ADD_TO_BAG:
      const updatedBagItemsAfterAddition = [...statePart.bagItems, action.payload];
      updateLocalStorage(updatedBagItemsAfterAddition);
      return { ...statePart, bagItems: updatedBagItemsAfterAddition };

    case REMOVE_FROM_BAG:
      const updatedBagItemsAfterRemoval = statePart.bagItems.filter(item => item.id !== action.payload.id);
      updateLocalStorage(updatedBagItemsAfterRemoval);
      return { ...statePart, bagItems: updatedBagItemsAfterRemoval };
    
    case UPDATE_BAG:
      const updatedBagItems = statePart.bagItems.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
      updateLocalStorage(updatedBagItems);
      return { ...statePart, bagItems: updatedBagItems };
      
    case CLEAR_BAG:
      localStorage.removeItem('bagItems');
      return { ...statePart, bagItems: [] };
      
    default:
      return statePart;
  }
};

export default bagReducer;