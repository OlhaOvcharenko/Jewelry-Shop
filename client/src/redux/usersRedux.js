import { API_URL } from "../config";
import axios from "axios";
import initialState from "./initialState";

// SELECTORS
export const getUser = () => {
  let loggedUser = localStorage.getItem('user');
  return loggedUser ? JSON.parse(loggedUser) : null;
};


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginRequest = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, userData);
      const { tokens, user } = response.data;
      localStorage.setItem('accessToken', tokens.access_token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error logging in:', error);
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const logoutRequest = () => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      // Remove user data from local storage and Redux state
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      dispatch({ type: LOGOUT });

      // If access token exists, send logout request to backend
      if (accessToken) {
        await axios.delete(`${API_URL}/api/auth/logout`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      const { access_token } = action.payload.tokens; // Assuming tokens are nested under 'tokens'
      return { ...state, loading: false, currentUser: { ...action.payload.user, tokens: { access_token } }, error: null };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export default userReducer;
