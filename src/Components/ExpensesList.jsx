import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { activateEditMode, deleteExpenseAction } from '../actions';

class ExpensesList extends React.Component {
    handleDeleteExpenseBtn = (idToDelete) => {
      const { deleteExpense } = this.props;
      deleteExpense(idToDelete);
    }

  handleEditExpenseBtn = (idToEdit) => {
    const { setEditMode } = this.props;
    setEditMode(idToEdit);
  }

  render() {
    const { expenses } = this.props;
    return (
      expenses.map((expense) => {
        const { description, tag, method,
          value, currency, exchangeRates, id } = expense;
        const formattedValue = parseFloat(value).toFixed(2);
        const exchangingQuotation = exchangeRates[currency].ask;
        // Source: https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8
        const formattedQuotation = Math.round(exchangingQuotation * 100) / 100;
        const currentCurrency = exchangeRates[currency].name.split('/')[0];
        const CONVERT_TO = 'Real';
        const convertedValue = (value * exchangingQuotation).toString();
        const separatorIndex = [...convertedValue].indexOf('.');
        const THREE = 3;
        const roundedValue = convertedValue.slice(0, separatorIndex + THREE);
        return (
          <tr key={ expense.id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{formattedValue}</td>
            <td>{currentCurrency}</td>
            <td>{formattedQuotation}</td>
            <td>{roundedValue}</td>
            <td>{CONVERT_TO}</td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => this.handleEditExpenseBtn(id) }
              >
                Editar
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.handleDeleteExpenseBtn(id) }
              >
                x

              </button>
            </td>
          </tr>);
      })
    );
  }
}

ExpensesList.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (idToDelete) => dispatch(deleteExpenseAction(idToDelete)),
  setEditMode: (idToEdit) => dispatch(activateEditMode(idToEdit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
