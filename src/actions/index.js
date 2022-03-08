import apiFetcher from '../helpers/apiFetcher';

export const userAction = (payload) => ({
  type: 'saveLoginInfo',
  payload,
});

const walletActionMaker = (payload) => ({
  type: 'saveExpensesData',
  payload });

const composePayload = (payload, apiResponse) => {
  payload = { ...payload, exchangeRates: apiResponse };
  return walletActionMaker(payload);
};

export const walletAction = (payload) => (dispatch) => {
  apiFetcher()
    .then((res) => {
      dispatch(composePayload(payload, res));
    });
};
