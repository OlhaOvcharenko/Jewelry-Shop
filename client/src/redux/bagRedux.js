import initialState from "./initialState";
import axios from "axios";
import { API_URL } from "../config";



export const getAllBagProducts = (state) => state.bag;


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
  return async (dispatch) => {
    dispatch(startRequest({ name: ADD_TO_BAG }));
    try {
      const res = await axios.post(
        `${API_URL}/products/${item.id}`,
        {
          productId: item.id,
          quantity: item.quantity
        }
      );

      dispatch(addToBag(res.data));
      
      dispatch(endRequest({ name: ADD_TO_BAG }));
      dispatch(clearBag());
    } catch (e) {
      dispatch(errorRequest({ name: ADD_TO_BAG, error: e.message }));
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
const bagReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ALL_ITEMS:
      return action.payload;

    case ADD_TO_BAG:
      return [
        ...statePart,
        action.payload
      ];
    case REMOVE_FROM_BAG:
      const updatedBagItemsAfterRemoval = statePart.filter(item => item.id !== action.payload);
      return updatedBagItemsAfterRemoval;
    default:
      return statePart;
  }
};

export default bagReducer;