import { createStore, combineReducers } from 'redux';
// import { createStore } from 'react-redux';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};
const initialStateCustomer = {
  fullName: '',
  nationalId: '',
  cretedAt: '',
};
function accountReducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };

    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        LoanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };

    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

let rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

let store = createStore(rootReducer);

const deposit = () => {
  return { type: 'account/deposit', payload: 100000 };
};
store.dispatch(deposit()); // Dispatch action

function withdraw() {
  return { type: 'account/withdraw', payload: 500 };
}
store.dispatch(withdraw());

function requestLoan() {
  return {
    type: 'account/requestLoan',
    payload: {
      amount: 1000,
      purpose: 'buy a car',
    },
  };
}
store.dispatch(requestLoan());

store.dispatch({ type: 'account/payLoan' });

function createCustomer(fullName, nationalId) {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullName: fullName,
      nationalId: nationalId,
      createdAt: new Date().toISOString,
    },
  };
}

function updateName(fullName) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  };
}

store.dispatch(createCustomer('Vivek', 123123123));

store.dispatch(updateName('Mohit'));
console.log(store.getState());

let store1 = createStore(rootReducer);
console.log(store1);

console.log(store1.getState());
