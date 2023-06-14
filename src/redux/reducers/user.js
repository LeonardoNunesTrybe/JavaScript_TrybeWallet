import { ADD_EMAIL } from '../actions';

const USER_INITIAL_STATE = {
  email: '',
};

const emailReducer = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return { ...state, email: action.payload };

  default:
    return state;
  }
};

export default emailReducer;
