import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

test('Verifica se a página da Carteira renderiza conforme o esperado', () => {
  renderWithRouterAndRedux(<Wallet />);

  const email = screen.getByTestId('email-field');
  const expenses = screen.getByTestId('total-field');
  const currencyField = screen.getByTestId('header-currency-field');
  const value = screen.getByTestId('value-input');
  const description = screen.getByTestId('description-input');
  const currency = screen.getByTestId('currency-input');
  const method = screen.getByTestId('method-input');
  const tag = screen.getByTestId('tag-input');
  const btn = screen.getByRole('button');

  expect(email).toBeInTheDocument();
  expect(expenses).toBeInTheDocument();
  expect(expenses).toHaveTextContent(0);
  expect(currencyField).toBeInTheDocument();
  expect(currencyField).toHaveTextContent('BRL');
  expect(value).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(currency).toBeInTheDocument();
  expect(method).toBeInTheDocument();
  expect(tag).toBeInTheDocument();
  expect(btn).toBeInTheDocument();

  userEvent.type(value, '10');
  userEvent.type(description, 'teste');
  userEvent.click(btn);
  expect(value).toHaveTextContent('');
  expect(description).toHaveTextContent('');
  expect(method).toHaveTextContent('Dinheiro');
  expect(tag).toHaveTextContent('Alimentação');
});
