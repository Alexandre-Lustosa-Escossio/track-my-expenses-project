// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
};
const user = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case 'saveLoginInfo':
    return ({ ...state, email: payload });
  default:
    return state;
  }
};
export default user;
