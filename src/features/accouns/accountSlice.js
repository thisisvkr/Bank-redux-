const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

export default function accountReducer(state = initialState, action) {
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

export const deposit = () => {
  return { type: 'account/deposit', payload: 100000 };
};

export function withdraw() {
  return { type: 'account/withdraw', payload: 500 };
}

export function requestLoan() {
  return {
    type: 'account/requestLoan',
    payload: {
      amount: 1000,
      purpose: 'buy a car',
    },
  };
}
