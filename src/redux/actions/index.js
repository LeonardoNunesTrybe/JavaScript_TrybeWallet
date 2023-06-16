export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DEL_EXPENSES = 'DEL_EXPENSES';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

function requestSuccessful(currencies) {
  return {
    type: REQUEST_SUCCESSFUL,
    payload: currencies,
  };
}

export function fetchCoins() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
      dispatch(requestSuccessful(currencies));
    } catch (error) {
      console.log(error);
    }
  };
}

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

export function fetchExpenses(expenses) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      expenses.exchangeRates = data;
      dispatch(addExpenses(expenses));
    } catch (error) {
      console.log(error);
    }
  };
}

export const delExpenses = (expenses) => ({
  type: DEL_EXPENSES,
  payload: expenses,
});
