import * as types from './constants/actionTypes.ts';

export const login = (username) => ({
  type: types.LOGIN,
  payload: username,
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const signup = (username) => ({
  type: types.SIGNUP,
  payload: username,
});
