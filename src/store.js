import { createStore, combineReducers } from 'redux';
import accountReducer from './features/accouns/accountSlice';
import customerReducer from './features/customers/customerSlice';

// import { createStore } from 'react-redux';

let rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

let store = createStore(rootReducer);
export default store;
