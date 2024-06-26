import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCoins, fetchExpenses, saveEdit } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: -1,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  reset = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleSubmit = () => {
    this.setState((prevState) => ({
      id: prevState.id + 1 }), () => {
      const { id, value, description, currency, method, tag } = this.state;

      const expenses = {
        id,
        value,
        description,
        currency,
        method,
        tag,
      };

      const { dispatch } = this.props;
      dispatch(fetchExpenses(expenses));

      this.reset();
    });
  };

  handleEdit = () => {
    const { dispatch, idToEdit, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const newExpense = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: expenses[idToEdit].exchangeRates,
    };
    dispatch(saveEdit(expenses, newExpense));

    this.reset();
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>

        <label htmlFor="valor">
          Valor
          <input
            name="value"
            id="valor"
            onChange={ this.handleChange }
            value={ value }
            type="number"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="descript">
          Descrição
          <input
            name="description"
            id="descript"
            onChange={ this.handleChange }
            value={ description }
            type="text"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currencies">
          Moeda
          <select
            onChange={ this.handleChange }
            value={ currency }
            name="currency"
            id="currencies"
            data-testid="currency-input"
          >
            {
              currencies.map((currencyI, index) => (
                <option key={ index } value={ currencyI }>{ currencyI }</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          Pagamento
          <select
            onChange={ this.handleChange }
            value={ method }
            name="method"
            id="method"
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria
          <select
            onChange={ this.handleChange }
            value={ tag }
            name="tag"
            id="tag"
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Transporte">Transporte</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ editor ? this.handleEdit : this.handleSubmit }
        >
          { editor ? 'Editar despesa' : 'Adicionar despesa' }

        </button>

      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  editor: globalState.wallet.editor,
  idToEdit: globalState.wallet.idToEdit,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
