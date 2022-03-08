import React from 'react';

class ExpensesList extends React.Component {
  render() {
    return (
        {expenses.map((expense) => {
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
                    data-testid="delete-btn"
                    onClick={ () => this.handleDeleteExpenseBtn(id) }
                  >
                    x

                  </button>
                </td>
              </tr>);
          })}   
    )
  }
}
