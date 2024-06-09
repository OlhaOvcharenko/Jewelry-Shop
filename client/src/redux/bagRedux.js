import initialState from "./initialState";
import axios from "axios";
import { API_URL } from "../config";



export const getAllBagProducts = (state) => state.bag.bagItems;
export const getRequest = (state) => state.bag.requests;

export const getItemById = (state, itemId) => { 
  return state.bag.bagItems.find((product) => product.id === itemId);
}

// action types

const reducerName = 'bag';
const createActionName = name => `app/${reducerName}/${name}`;

const LOAD_ALL_ITEMS = 'app/bag/LOAD_ALL_ITEMS';
const ADD_TO_BAG = 'app/bag/ADD_TO_BAG';
const UPDATE_BAG = 'app/bag/UPDATE_BAG';
const CLEAR_BAG = 'app/bag/CLEAR_BAG';
const REMOVE_FROM_BAG = 'app/bag/REMOVE_FROM_BAG';

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

// action creators
export const loadAllItems = (payload) =>  ({ type: LOAD_ALL_ITEMS, payload });
export const addToBag = (payload) => ({ type: ADD_TO_BAG, payload });
export const updateBag = (payload) => ({ type: UPDATE_BAG, payload });
export const removeFromBag = (payload) => ({ type: REMOVE_FROM_BAG, payload });
export const clearBag = () => ({ type: CLEAR_BAG });


export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadBagItemsRequest = () => {
  return async (dispatch) => {
    const requestName = LOAD_ALL_ITEMS;
    dispatch(startRequest({ name: requestName }));

    try {
      let res = await axios.get(`${API_URL}/bag`);
      dispatch(loadAllItems(res.data));
      dispatch(endRequest({ name: requestName }));
    } catch (e) {
      dispatch(errorRequest({ name: requestName, error: e.message }));
    }
  };
};

export const addToBagRequest = (item) => {
  return async (dispatch, getState) => {
    dispatch(startRequest({ name: ADD_TO_BAG }));
    console.log(item, 'item')
    try {
      await axios.post(`${API_URL}/products/${item.id}`, {
        productId: item.id,
        quantity: item.quantity,
        size: item.size,
      });

      const { bagItems } = getState().bag;
      const existingProductIndex = bagItems.findIndex(product => product.id === item.id && product.size === item.size);

      if (existingProductIndex !== -1) {
       
        const updatedBagItems = [...bagItems];
        updatedBagItems[existingProductIndex] = {
          ...updatedBagItems[existingProductIndex],
          quantity: updatedBagItems[existingProductIndex].quantity + item.quantity,
          subTotal: updatedBagItems[existingProductIndex].subTotal + item.subTotal,
        }
        dispatch(updateBag(updatedBagItems));
      } else {
      
        dispatch(addToBag(item));
      }

      dispatch(endRequest({ name: ADD_TO_BAG }));
    } catch (e) {
      dispatch(errorRequest({ name: ADD_TO_BAG, error: e.message }));
    }
  };
};




export const updateBagItemRequest = (existingItem) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: UPDATE_BAG }));
    console.log(existingItem, 'existing item');
    try {
      const res = await axios.put(`${API_URL}/bag`, {
        bagItemId: existingItem.id,
        productId: existingItem.productId,
        quantity: existingItem.quantity,
        size: existingItem.size,
        comment: existingItem.comment
      });
      dispatch(updateBag(res.data));
      console.log(res.data)
      dispatch(endRequest({ name: UPDATE_BAG }));
    } catch (e) {
      dispatch(errorRequest({ name: UPDATE_BAG, error: e.message }));
    }
  };
};

export const removeFromBagRequest = (id) => {
  return async (dispatch) => {
    const requestName = REMOVE_FROM_BAG;
    dispatch(startRequest({ name: requestName }));

    try {
      // Send the id in the request body
      let res = await axios.delete(`${API_URL}/bag`, { data: { id } });
      dispatch(removeFromBag(id));
      dispatch(endRequest({ name: requestName }));
    } catch (e) {
      dispatch(errorRequest({ name: requestName, error: e.message }));
    }
  };
};

// reducer
const bagReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ALL_ITEMS:
      return {
        bagItems: action.payload,
      };
    case ADD_TO_BAG:
      return {
        bagItems: [...state.bagItems, action.payload]
      };
    case UPDATE_BAG:
      return { bagItems: [...state.bagItems]};
    case REMOVE_FROM_BAG:
      return {
        bagItems: state.bagItems.filter(item => item.id !== action.payload),
      };

    case CLEAR_BAG:
      return{
        bagItems: []
      }
    case START_REQUEST:
      return { ...state, requests: {...state.requests, [action.payload.name]: { pending: true, error: null, success: false }} };
    case END_REQUEST:
      return { ...state, requests: { ...state.requests, [action.payload.name]: { pending: false, error: null, success: true }} };
    case ERROR_REQUEST:
      return { ...state, requests: { ...state.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };
    default:
      return state;
  }
};

export default bagReducer;