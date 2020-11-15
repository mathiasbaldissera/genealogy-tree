import { createReducer, createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  login: ['username', 'password'],
  openLoginModal: [],
  closeLoginModal: [],
});

export const INITIAL_STATE = {
  logged: false,
  tried: false,
  openLoginModal: false,
};
const login = (state = INITIAL_STATE, { username, password }) => {
  const logged = username === 'admin' && password === 'admin';
  return { ...state, logged, tried: !logged, openLoginModal: !logged };
};

const openLoginModal = (state = INITIAL_STATE) => ({
  ...state,
  openLoginModal: true,
});

const closeLoginModal = (state = INITIAL_STATE) => ({
  ...state,
  openLoginModal: false,
});
export const HANDLERS = {
  [Types.LOGIN]: login,
  [Types.OPEN_LOGIN_MODAL]: openLoginModal,
  [Types.CLOSE_LOGIN_MODAL]: closeLoginModal,
};

export default createReducer(INITIAL_STATE, HANDLERS);
