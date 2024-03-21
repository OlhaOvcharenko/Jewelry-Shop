import axios from 'axios';
import initialState from './initialState';
/*SELECTORS*/
export const getAllBagProducts = (state) => state.bagItems;

/* ACTIONS*/
const ADD_PRODUCT_TO_BAG = 'ADD_PRODUCT_TO_BAG';
const REMOVE_PRODUCT_FROM_BAG = 'REMOVE_PRODUCT_FROM_BAG';
const LOAD_BAG_PRODUCTS =  'LOAD_BAG_ITEMS'
const SUBMIT_BAG = 'SUBMIT_BAG'

const START_REQUEST = 'START_REQUEST'; 
const END_REQUEST = 'END_REQUEST'; 
const ERROR_REQUEST = 'ERROR_REQUEST';

const UPDATE_BAG_PRODUCTS = 'UPDATE_BAG_ITEM'; 
const ADD_COMMENT = 'ADD_COMMENT';

/* ACTION CREATORS */

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadBagProducts = payload => ({ type: LOAD_BAG_PRODUCTS, payload });
export const addProductToBag = (product) => ({ type: ADD_PRODUCT_TO_BAG, payload: product });
export const removeProductFromBag = (product) => ({ type: REMOVE_PRODUCT_FROM_BAG, payload: product });
export const submitBag = (products) => ({ type: SUBMIT_BAG, payload: products });
export const updateBagItem = (bagItem) => ({ type: UPDATE_BAG_PRODUCTS, payload: bagItem });
export const addComment = (bagItemId, comment) => ({ type: ADD_COMMENT, payload: { bagItemId, comment } });



/* ASYNC ACTION CREATOR */
export const loadBagProductssRequest = () => {
  return async (dispatch) => {
    const requestName = LOAD_BAG_PRODUCTS;
    dispatch(startRequest({ name: requestName }));

    try {
      const options = {
        method: "GET",
        credentials: 'include'
      };

      const res = await fetch(`http://localhost:8000/api/bag`, options);
      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      dispatch(loadBagProducts(data));

      // Update bag items in local storage
      localStorage.setItem('bagItems', JSON.stringify(data));
      console.log(data, 'resdata');

      dispatch(endRequest({ name: requestName }));
    } catch (e) {
      dispatch(errorRequest({ name: requestName, error: e.message }));
    }
  };
};

export const addProductsRequest = (product) => {
  return async (dispatch) => {
    const requestName = 'ADD_PRODUCT_TO_BAG';
    dispatch(startRequest({ name: requestName }));
    console.log(product, 'product')
    try {
    
      if (!product.productId || !product.quantity || product.quantity < 1) {
        throw new Error('Invalid product data');
      }
      const res = await axios.post(`http://localhost:8000/api/products/${product.productId}`, {
        quantity: product.quantity,
        productId: product.productId
      });

      dispatch(addProductToBag(res.data));

      dispatch(endRequest(requestName));

    } catch (error) {
        dispatch(errorRequest(requestName, error.message));
    }
  };
};

export const removeProductFromBagRequest = (item) => {
  return async (dispatch) => {
    const requestName = 'REMOVE_PRODUCT_FROM_BAG';
    dispatch(startRequest({ name: requestName }));
    console.log(item, 'product');
    const productId = item.id.toString();
    console.log(productId, 'productId')
    try {
      await axios.delete(`http://localhost:8000/api/bag`, {
        data: { id: productId } 
      });

      dispatch(removeProductFromBag(item.id));
      dispatch(endRequest(requestName));
    } catch (error) {
      dispatch(errorRequest(requestName, error.message));
    }
  };
};

export const submitBagRequest = (bagItemsWithUpdates) => {
  return async (dispatch) => {
    const requestName = SUBMIT_BAG;
    dispatch(startRequest({ name: requestName }));

    try {
      const res = await axios.put(`http://localhost:8000/api/bag`, { bagItems: bagItemsWithUpdates });

      dispatch(submitBag(res.data));

      dispatch(endRequest(requestName));
    } catch (error) {
      dispatch(errorRequest(requestName, error.message));
    }
  };
};

/*LOCAL STORAGE*/
export const localStorageMiddleware = store => next => action => {
  const result = next(action);

  switch (action.type) {
    case UPDATE_BAG_PRODUCTS:
    case ADD_COMMENT: {
      const { bagItems } = store.getState();
      localStorage.setItem('bagItems', JSON.stringify(bagItems));
      break;
    }
    default:
      break;
  }

  return result;
};

const bagReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BAG_PRODUCTS:
      return action.payload;
    case ADD_PRODUCT_TO_BAG:
      // Add the new product to the existing bag items
      return { ...state, bagItems: [...state.bagItems, action.payload] };
    case UPDATE_BAG_PRODUCTS:
      // Update the bag item with the provided ID
      const updatedItems = state.bagItems.map(item =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
      return { ...state, bagItems: updatedItems };
    default:
      return state;
  }
};



export default bagReducer;