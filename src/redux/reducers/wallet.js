import {
  REQUEST_SUCCESSFUL,
  ADD_EXPENSES,
  DEL_EXPENSES,
  EDIT_EXPENSES,
  SAVE_EDIT } from '../actions';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      currencies: action.payload,
    };

  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload] };

  case DEL_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.payload)] };

  case EDIT_EXPENSES:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };

  case SAVE_EDIT:
    return {
      ...state,
      idToEdit: 0,
      editor: false,
      // expenses: [...state.expenses.filter((expense) => expense.id !== action.payload.id), action.payload],
    };

  default:
    return state;
  }
};

export default walletReducer;
