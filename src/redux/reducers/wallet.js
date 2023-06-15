// import { ADD_EMAIL } from '../actions';
import { REQUEST_SUCCESSFUL } from '../actions';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCCESSFUL:
    return { ...state, currencies: action.payload };

  default:
    return state;
  }
};

export default walletReducer;
