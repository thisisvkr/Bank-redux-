import { createStore } from 'redux';
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

const store = createStore(accountReducer);

console.log('hey hero'); // Log this message firs

const deposit = () => {
  return { type: 'account/deposit', payload: 100000 };
};
store.dispatch(deposit()); // Dispatch action
console.log(store.getState());

store.dispatch({ type: 'account/withdraw', payload: 500 });
console.log(store.getState());

store.dispatch({
  type: 'account/requestLoan',
  payload: { amount: 1000, purpose: 'buy a car' },
});
console.log(store.getState());

store.dispatch({ type: 'account/payLoan' });
console.log(store.getState());

function createCustomer(fullName, nationalId) {
  return {
    type: 'customer/createCustomer',
    fullName,
    nationalId,
    createAt: new Date().toISOString,
  };
}

function updateName(fullName) {
  return {
    type: 'customer/updateName',
  };
}
