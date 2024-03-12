import { createStore, combineReducers, applyMiddleware } from 'redux';
import accountReducer from './features/accouns/accountSlice';
import customerReducer from './features/customers/customerSlice';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension/lib/types/logOnly';

// import { createStore } from 'react-redux';

let rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
