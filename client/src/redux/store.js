import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { withExtraArgument, thunk} from 'redux-thunk';
import initialState from './initialState';
import productsReducer from './productsRedux';
import bagReducer from './bagRedux';
import ordersReducer from './orderRedux';
import usersReducer from './usersRedux';


// combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
  bag: bagReducer,
  orders: ordersReducer,
  users: usersReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(withExtraArgument(thunk))));

export default store;