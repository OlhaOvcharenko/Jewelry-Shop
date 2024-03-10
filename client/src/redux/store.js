import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { withExtraArgument, thunk } from 'redux-thunk';
import initialState from './initialState';
import productsReducer from './productsRedux';

// combine reducers
const rootReducer = combineReducers({
  products: productsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(withExtraArgument(thunk))));

export default store;