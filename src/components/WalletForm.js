import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCoins } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>

        <input type="number" data-testid="value-input" />

        <input type="text" data-testid="description-input" />

        <label htmlFor="currency">
          <select name="currency" id="currency" data-testid="currency-input">
            {
              currencies.map((currency, index) => (
                <option key={ index } value={ currency }>{ currency }</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          <select name="method" id="method" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          <select name="tag" id="tag" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Transporte">Transporte</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
