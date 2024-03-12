import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit: (state, action) => {
      state.balance += action.payload;
    },

    withdraw: (state, action) => {
      state.balance -= action.payload;
    },

    requestLoan: (state, action) => {
      if (state.loan > 0) return;
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.loanPurpose;
      state.balance = state.balance + action.payload.amount;
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
  },
});

console.log(accountSlice);
/*
export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case 'account/requestLoan':
      if (state.loan < 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };

    case 'account/covertingCurrency':
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

export const deposit = (amount, currency) => {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  // return { type: 'account/withdraw', payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: 'account/covertingCurrency' });

    // API call
    const host = 'api.frankfurter.app';
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    const converted = data.rates.USD;

    dispatch({ type: 'account/deposit', payload: converted });
    // // return action
  };
};

export function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: {
      amount,
      purpose,
    },
  };
}

export function payLoan() {
  return {
    type: 'account/payLoan',
  };
}
*/
