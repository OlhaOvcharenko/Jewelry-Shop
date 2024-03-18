import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { withExtraArgument, thunk} from 'redux-thunk';
import initialState from './initialState';
import productsReducer from './productsRedux';
import bagReducer from './bagRedux';


// combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
  bagItems: bagReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(withExtraArgument(thunk))));

export default store;