import apiFetcher from '../helpers/apiFetcher';

export const userAction = (payload) => ({
  type: 'saveLoginInfo',
  payload,
});

const saveExpensesAction = (payload) => ({
  type: 'saveExpensesData',
  payload });

const composePayload = (payload, apiResponse) => {
  payload = { ...payload, exchangeRates: apiResponse };
  return saveExpensesAction(payload);
};

export const walletAction = (payload) => (dispatch) => {
  apiFetcher()
    .then((res) => {
      dispatch(composePayload(payload, res));
    });
};

export const deleteExpenseAction = (idToDelete) => ({
  type: 'deleteExpense',
  idToDelete,
});

export const activateEditMode = (idToEdit) => ({
  type: 'editModeOn',
  idToEdit,
});

export const deactivateEditMode = () => ({
  type: 'editModeOff',
});

export const editExpenseAction = (state) => ({
  type: 'editExpense',
  editedExpense: state,
});
