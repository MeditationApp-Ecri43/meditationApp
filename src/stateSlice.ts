import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface LoginState {
  value: boolean
}

// Define the initial state using that type
const initialState: LoginState = {
  value: false,
}

export const loginSlice = createSlice({
  name: 'login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state) => {
      state.value === true
    },
    logout: (state) => {
      state.value === false
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    signup: (state, action: PayloadAction<number>) => {
      state.value === true
    },
  },
})

export const { login, logout, signup } = loginSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default loginSlice.reducer