// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  editModeOn: false,
  editingId: '',
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

  case 'deleteExpense': {
    const { idToDelete } = action;
    const prevExpenses = { ...state }.expenses;
    const newExpenses = prevExpenses.filter((expense) => expense.id !== idToDelete);
    return ({
      expenses: [...newExpenses],
    });
  }

  case 'editModeOn': {
    const { idToEdit } = action;
    return ({
      ...state,
      editModeOn: true,
      editingId: idToEdit,
    });
  }

  default:
    return state;
  }
};
export default wallet;
