import initialState from "./initialState";
import { API_URL } from "../config";

/*SELECTORS*/
export const getUser = ({users}) => users.user;

/*ACTIONS*/
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName("LOG_IN");
const LOG_OUT = createActionName("LOG_OUT");

/*ACTION CREATORS*/

export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});

export const logOut = (payload) => ({
  type: LOG_OUT,
  payload,
});

export const fetchUserData = () => {
  return (dispatch) => {
    const options = {
      method: "GET",
      credentials: 'include'
    };

    fetch(`${API_URL}/api/users`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Server error");
        }
      })
      .then((user) => {
        // Update user data in local storage
        localStorage.getItem('user', JSON.stringify(user));
        dispatch(logIn({ user }));
        console.log('user logged in:', user )
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  };
};


/* REDUCER */
export default function usersReducer(statePart = [], action = {}) {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return {
        ...statePart,
        user: null,
      };
    default:
    return statePart;
  }
}