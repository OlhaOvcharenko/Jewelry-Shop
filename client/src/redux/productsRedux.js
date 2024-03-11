import initialState from "./initialState";
import { API_URL }from "../config"


/*SELECTORS*/
export const getAllProducts = (state) => state.products;
export const getPromoProducts = (state) => {
  return state.products.filter(product => product.status === 'promo');
};

/* ACTIONS */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;
export const DATA_PRODUCTS = createActionName('DATA_PRODUCTS');
/* ACTIONS CREATORS */


export const fetchDataProducts = payload => ({type: DATA_PRODUCTS, payload});

export const fetchProducts = () => {
  return (dispatch) => {
    fetch(API_URL + '/products')
      .then((res) => res.json())
      .then((products) => dispatch(fetchDataProducts(products)))
      .catch((error) => {
        console.error('Error fetching products:', error);
       
      });
  };
};

/* REDUCER */
export default function productsReducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case DATA_PRODUCTS:
      return [...action.payload];
    default:
      return statePart;
  }
}