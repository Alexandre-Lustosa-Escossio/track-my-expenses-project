import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletAction } from '../actions';
import apiFetcher from '../helpers/apiFetcher';

class Wallet extends React.Component {
    state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      currencyList: [],
    }

    async componentDidMount() {
      const apiResponse = await apiFetcher();
      const indexOfUSDT = Object.keys(apiResponse).indexOf('USDT');
      const currencyList = Object.keys(apiResponse);
      currencyList.splice(indexOfUSDT, 1);
      this.setState({
        currencyList,
      });
    }

      handleInputChange = (event) => {
        const { target: { value, name } } = event;
        this.setState({
          [name]: value,
        });
      }

    handleBtnClick = () => {
      const { dispatchExpensesData } = this.props;
      const sharedState = { ...this.state };
      delete sharedState.currencyList;
      dispatchExpensesData(sharedState);
      this.setState({
        value: '',
        description: '',
      });
    }

    render() {
      const { email, expenses } = this.props;
      const { value, description, currencyList } = this.state;
      return (
        <>
          <header>
            <span data-testid="email-field">
              Olá,
              {email}
            </span>
            <span data-testid="total-field">
              Despesas totais:
              {expenses.reduce((acc, curr) => acc += (parseFloat(curr.value) * parseFloat(curr.exchangeRates[curr.currency].ask)), 0)}
            </span>
            <span data-testid="header-currency-field">
              Cambio:BRL
            </span>
          </header>
          <main>
            <label htmlFor="value-input">
              Valor
              <input
                id="value-input"
                data-testid="value-input"
                name="value"
                type="number"
                value={ value }
                onChange={ (event) => this.handleInputChange(event) }
              />
            </label>
            <label htmlFor="currency-input">
              Moeda
              <select
                id="currency-input"
                data-testid="currency-input"
                name="currency"
                onChange={ (event) => this.handleInputChange(event) }
              >
                {currencyList.map((currency, index) => (
                  <option
                    key={ index }
                    data-testid={ currency }
                  >
                    {currency}
                  </option>))}
              </select>
            </label>
            <label htmlFor="method-input">
              Método de Pagamento
              <select
                id="method-input"
                data-testid="method-input"
                name="method"
                onChange={ (event) => this.handleInputChange(event) }
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="tag-input">
              Tipo
              <select
                id="tag-input"
                data-testid="tag-input"
                name="tag"
                onChange={ (event) => this.handleInputChange(event) }
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>
            <label htmlFor="description-input">
              Descrição
              <input
                id="description-input"
                data-testid="description-input"
                type="text"
                name="description"
                value={ description }
                onChange={ (event) => this.handleInputChange(event) }
              />
            </label>
            <button
              type="button"
              onClick={ this.handleBtnClick }
            >
              Adicionar Despesa
            </button>
          </main>
        </>
      );
    }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchExpensesData: (state) => dispatch(walletAction(state)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatchExpensesData: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
