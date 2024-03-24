import { API_URL } from "../config";
import { clearBag } from "./bagRedux";
import initialState from "./initialState";
import axios from "axios";

export const getRequest = (state) => state.orders.requests;

/* ACTIONS */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const CREATE_ORDER = createActionName('CREATE_ORDER');
export const LOAD_ORDERS_DATA = createActionName('LOAD_ORDERS_DATA');

/* ACTION CREATORS */
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const createOrder = payload => ({ payload, type: CREATE_ORDER });
export const loadOrders = payload => ({ payload, type: LOAD_ORDERS_DATA });

export const loadOrdersRequest = () => {
  return async (dispatch) => {
    const requestName = LOAD_ORDERS_DATA;
    dispatch(startRequest({ name: requestName }));

    try {
      let res = await axios.get(`${API_URL}/order`);
      dispatch(loadOrders(res.data));
      dispatch(endRequest({ name: requestName }));
    } catch (e) {
      dispatch(errorRequest({ name: requestName, error: e.message }));
    }
  };
};

export const createOrderRequest = (newOrder) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: CREATE_ORDER }));
    try {
      const res = await axios.post(
        `${API_URL}/order`,
        {
          clientName: newOrder.clientName,
          clientSurname: newOrder.clientSurname,
          email: newOrder.email,
          phone: newOrder.phone,
          address: newOrder.address,
          finalAmount: newOrder.finalAmount,
          productIds: newOrder.productIds
        }
      );

      dispatch(createOrder(res.data));
      
      dispatch(endRequest({ name: CREATE_ORDER }));
      dispatch(clearBag());
    } catch (e) {
      dispatch(errorRequest({ name: CREATE_ORDER, error: e.message }));
    }
  };
};


/* REDUCER */
export default function ordersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ORDERS_DATA:
      return { ...state, orders: action.payload };
    case CREATE_ORDER: {
      return { ...state, orders: [...state.orders, action.payload] }; 
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
}