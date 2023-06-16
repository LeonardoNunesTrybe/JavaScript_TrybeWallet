import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  sum = () => {
    const { expenses } = this.props;
    const expensesTotal = expenses
      .map((expense) => expense.value * expense.exchangeRates[expense.currency].ask);
    const totalExpense = expensesTotal.reduce((acc, curr) => acc + curr, 0);
    return totalExpense.toFixed(2);

    // reduce((prevV, currV, currI) => {
    //   const rate = expenses[currI].exchangeRates[currV.currency].ask;
    //   return prevV + (currV.value * rate);
    // }, 0);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          Olá
          {' '}
          {email}
        </p>
        <p data-testid="total-field">{ this.sum() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
