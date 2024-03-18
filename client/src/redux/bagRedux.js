import axios from 'axios';
import initialState from './initialState';
/*SELECTORS*/
export const getAllBagItems = (state) => state.bagItems;

/* ACTIONS*/
const ADD_PRODUCT_TO_BAG = 'ADD_PRODUCT_TO_BAG';
const START_REQUEST = 'START_REQUEST'; 
const END_REQUEST = 'END_REQUEST'; 
const ERROR_REQUEST = 'ERROR_REQUEST';
const LOAD_BAG_ITEMS =  'LOAD_BAG_ITEMS'

/* ACTION CREATORS */

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadBagItems = payload => ({type: LOAD_BAG_ITEMS, payload});

export const addProductToBag = (product) => ({
  type: ADD_PRODUCT_TO_BAG,
  payload: product,
});


/* ASYNC ACTION CREATOR */
export const loadBagItemsRequest = () => {
  return async (dispatch) => {
    const requestName = LOAD_BAG_ITEMS;
    dispatch(startRequest({ name: requestName }));

    try {
      let res = await axios.get(`http://localhost:8000/api/bag`);
      dispatch(loadBagItems(res.data));
      console.log(res.data, 'resdata');
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


const bagReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BAG_ITEMS:
      return action.payload;
    case ADD_PRODUCT_TO_BAG: 
      return [...state, action.payload];
    default:
      return state;
  }
};

export default bagReducer;