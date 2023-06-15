export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';

export const addEmail = (email) => ({
  type: 'ADD_EMAIL',
  payload: email,
});

function requestSuccessful(data) {
  return {
    type: REQUEST_SUCCESSFUL,
    payload: data,
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
