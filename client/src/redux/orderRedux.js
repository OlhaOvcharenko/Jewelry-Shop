import initialState from "./initialState";
import axios from "axios";

/* ACTIONS */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const CREATE_ORDER = createActionName('CREATE_ORDER');

/* ACTION CREATORS */
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });
export const createOrder = payload => ({ payload, type: CREATE_ORDER });

export const createOrderRequest = (newOrder) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: CREATE_ORDER }));
    try {
      const res = await axios.post(
        `http://localhost:8000/api/order`,
        {clientName: newOrder.clientName,
         clientSurname: newOrder.clientSurname,
         email: newOrder.email,
         phone: newOrder.phone,
         address:newOrder.address,
         finalAmount: newOrder.finalAmount,
         productIds: newOrder.productIds }
      );

      dispatch(createOrder(res.data));
      dispatch(endRequest({ name: CREATE_ORDER }));
    } catch (e) {
      dispatch(errorRequest({ name: CREATE_ORDER, error: e.message }));
    }
  };
};

/* REDUCER */
export default function ordersReducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case CREATE_ORDER: {
      return { ...statePart, data: [...statePart.data, action.payload] };
    }
    default:
      return statePart;
  }
}