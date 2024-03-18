import initialState from "./initialState";
import { API_URL }from "../config";
import axios from 'axios';

/*SELECTORS*/
export const getAllProducts = (state) => state.products.products;

export const getProductById = (state, productId) => { 
  return state.products.products.find((product) => product.id === productId);
}

export const getPromoProducts = (state) => {
  return state.products.products.filter(product => product.status === 'promo'); 
};

export const getTopProducts = (state) => {
  return state.products.products.filter(product => product.status === 'top-seller'); 
};



/* ACTIONS */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;


const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const DATA_PRODUCTS = createActionName('DATA_PRODUCTS');



/* ACTIONS CREATORS */
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });


export const fetchDataProducts = payload => ({type: DATA_PRODUCTS, payload});

export const loadProductsRequest = () => {
  return async (dispatch) => {
    const requestName = DATA_PRODUCTS;
    dispatch(startRequest({ name: requestName }));

    try {
      let res = await axios.get(`http://localhost:8000/api/products`);
      dispatch(fetchDataProducts(res.data));
      console.log(res.data, 'resdata');
      dispatch(endRequest({ name: requestName }));
    } catch (e) {
      dispatch(errorRequest({ name: requestName, error: e.message }));
    }
  };
};



/* REDUCER */
export default function productsReducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case DATA_PRODUCTS:
      return {
        ...statePart,
        products: action.payload,
      };
    default:
      return statePart;
  }
}