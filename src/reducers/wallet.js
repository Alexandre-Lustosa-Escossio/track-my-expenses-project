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

  case 'editModeOff': {
    return ({
      ...state,
      editModeOn: false,
      editingId: '',
    });
  }

  case 'editExpense': {
    const { editedExpense } = action;
    const { id } = editedExpense;
    const prevExpenses = { ...state }.expenses;
    const editedExpenses = prevExpenses.map((expense) => (
      expense.id === id ? ({ ...expense, ...editedExpense }) : expense
    ));
    return { expenses: editedExpenses };
  }

  default:
    return state;
  }
};
export default wallet;
