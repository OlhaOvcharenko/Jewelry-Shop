import initialState from "./initialState";
import axios from 'axios';
import { API_URL } from "../config";

/*SELECTORS*/
export const getAllProducts = (state) => state.products;

export const getProductById = (state, productId) => { 
  return state.products.find((product) => product.id === productId);
}

export const getPromoProducts = (state) => {
  return state.products.filter(product => product.status === 'promo'); 
};

export const getTopProducts = (state) => {
  return state.products.filter(product => product.status === 'top-seller'); 
};

export const getSpringCollectionProducts = (state) => {
  return state.products.filter(product => product.status === 'new-added'); 
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
      let res = await axios.get(`${API_URL}/products`);
      dispatch(fetchDataProducts(res.data));
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
      return action.payload;
    default:
      return statePart;
  }
}