import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

test('Verifica se o Header renderiza conforme o esperado', () => {
  renderWithRouterAndRedux(<Wallet />);
  const email = screen.getByTestId('email-field');
  const expenses = screen.getByTestId('total-field');
  const currencyField = screen.getByTestId('header-currency-field');

  expect(email).toBeInTheDocument();
  expect(expenses).toBeInTheDocument();
  expect(expenses).toHaveTextContent(0);
  expect(currencyField).toBeInTheDocument();
  expect(currencyField).toHaveTextContent('BRL');
});

test('Verifica se a página da Carteira renderiza conforme o esperado', async () => {
  renderWithRouterAndRedux(<Wallet />);
  const value = screen.getByTestId('value-input');
  const description = screen.getByTestId('description-input');
  const currency = screen.getByTestId('currency-input');
  const method = screen.getByTestId('method-input');
  const tag = screen.getByTestId('tag-input');
  const btn = screen.getByRole('button');

  expect(value).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(currency).toBeInTheDocument();
  expect(method).toBeInTheDocument();
  expect(tag).toBeInTheDocument();
  expect(btn).toBeInTheDocument();
  expect(screen.getByRole('table')).toBeInTheDocument();

  userEvent.type(value, '10');
  userEvent.type(description, 'teste');
  await waitFor(() => {
    userEvent.selectOptions(currency, 'USD');
  });
  userEvent.selectOptions(method, 'Dinheiro');
  userEvent.selectOptions(tag, 'Alimentação');
  userEvent.click(btn);

  expect(value).toHaveTextContent('');
  expect(description).toHaveTextContent('');
  expect(currency).toHaveTextContent('USD');
  expect(method).toHaveTextContent('Dinheiro');
  expect(tag).toHaveTextContent('Alimentação');

  expect(await screen.findByText('teste')).toBeInTheDocument();
  expect(await screen.findByText('10.00')).toBeInTheDocument();
  expect(await screen.findByText('Dólar Americano/Real Brasileiro')).toBeInTheDocument();

  const editBtn = screen.getByTestId('edit-btn');
  const delBtn = screen.getByTestId('delete-btn');

  expect(editBtn).toBeInTheDocument();
  expect(delBtn).toBeInTheDocument();
});
