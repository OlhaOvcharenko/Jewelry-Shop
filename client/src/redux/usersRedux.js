import { API_URL } from "../config";
import axios from "axios";
import initialState from "./initialState";

// SELECTORS
export const getUser = () => {
  let loggedUser = localStorage.getItem('user');
  return loggedUser ? JSON.parse(loggedUser) : null;
};

export const getRequests = ({users}) => users.requests;

const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const LOGIN_REQUEST = createActionName('LOGIN_REQUEST');
export const LOGIN_SUCCESS = createActionName('LOGIN_SUCCESS');
export const LOGIN_FAILURE = createActionName('LOGIN_FAILURE');
export const LOGOUT = createActionName('LOGOUT');

// Action creators 

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

// Thunk action creator for login request
export const loginRequest = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(startRequest(LOGIN_REQUEST));
      const response = await axios.post(`${API_URL}/auth/login`, userData);
      const { tokens, user } = response.data;
      localStorage.setItem('accessToken', tokens.access_token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      dispatch(endRequest(LOGIN_REQUEST));
    } catch (error) {
      console.error('Error logging in:', error);
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
      dispatch(errorRequest(LOGIN_REQUEST, error.message));
    }
  };
};

// Thunk action creator for logout request
export const logoutRequest = () => {
  return async (dispatch) => {
    try {
      dispatch(startRequest(LOGOUT));
      const accessToken = localStorage.getItem('accessToken');

      // Remove user data from local storage and Redux state
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      dispatch({ type: LOGOUT });
      
      // If access token exists, send logout request to backend
      if (accessToken) {
        await axios.delete(`${API_URL}/auth/logout`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
      }
      dispatch(endRequest(LOGOUT));
    } catch (error) {
      console.error('Error logging out:', error);
      dispatch(errorRequest(LOGOUT, error.message));
    }
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      const { access_token } = action.payload.tokens; 
      return { ...state, loading: false, currentUser: { ...action.payload.user, tokens: { access_token } }, error: null };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, currentUser: null };

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

export default userReducer;
