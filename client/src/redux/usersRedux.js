import initialState from "./initialState";


/*SELECTORS*/

/*ACTIONS*/
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName("LOG_IN");


/*ACTION CREATORS*/

export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});


/* REDUCER */
export default function usersReducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...statePart,
        user: action.payload,
      };
    default:
    return statePart;
  }
}