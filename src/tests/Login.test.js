import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

test('Verifica se a página de Login renderiza conforme o esperado', () => {
  renderWithRouterAndRedux(<Login />);

  const email = screen.getByTestId('email-input');
  const senha = screen.getByTestId('password-input');
  const btn = screen.getByRole('button');

  expect(email).toBeInTheDocument();
  expect(senha).toBeInTheDocument();
  expect(btn).toBeInTheDocument();

  userEvent.type(email, 'email.com');
  expect(btn).toBeDisabled();
  userEvent.type(email, 'email@email.com');
  expect(btn).toBeDisabled();

  userEvent.type(senha, '12345');
  expect(btn).toBeDisabled();
  userEvent.type(senha, '123456');
  expect(btn).toBeEnabled();
});

test('Verifica se após as validações corretas, ao carregar no botão a rota é alterada', () => {
  const { history } = renderWithRouterAndRedux(<App />);

  const email = screen.getByTestId('email-input');
  const senha = screen.getByTestId('password-input');
  const btn = screen.getByRole('button');

  userEvent.type(email, 'email@email.com');
  userEvent.type(senha, '123456');
  userEvent.click(btn);
  expect(history.location.pathname).toBe('/carteira');
});
