import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
interface LoginState {
  value: boolean;
  username: null | string;
  password: null | string;
}

// Define the initial state using that type
const initialState: LoginState = {
  value: false,
  username: null,
  password: null,
};

export const loginSlice = createSlice({
  name: 'login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state) => {
      state.value === true;
    },
    logout: (state) => {
      state.value === false;
    },
    signup: (state) => {
      state.value === true;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // signup: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});

export const { login, logout, signup } = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default loginSlice.reducer;
