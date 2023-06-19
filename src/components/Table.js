import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { delExpenses, editExpenses } from '../redux/actions';

class Table extends Component {
  handleRemove = (id) => {
    const { dispatch } = this.props;
    dispatch(delExpenses(id));
  };

  handleEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {' '}
                {Number(expense.value
                  * expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  onClick={ () => this.handleEdit(expense.id) }
                  data-testid="edit-btn"
                >
                  Editar despesa

                </button>
                <button
                  onClick={ () => this.handleRemove(expense.id) }
                  data-testid="delete-btn"
                >
                  Excluir

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
  idToEdit: globalState.wallet.idToEdit,
});

export default connect(mapStateToProps)(Table);
