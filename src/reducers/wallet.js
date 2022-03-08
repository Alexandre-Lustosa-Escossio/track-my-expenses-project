// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
};
const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'saveExpensesData': {
    const prevExpenses = { ...state }.expenses;
    const prevExpensesCount = prevExpenses.length;
    return ({
      expenses: [...prevExpenses, { id: prevExpensesCount, ...action.payload }],
    });
  }
  default:
    return state;
  }
};
export default wallet;
