import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isShow: false,
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    showSignUp: (state) => state.isShow = true,
    hideSignUp: (state) => state.isShow = false
  },
})

export const { actions, reducer } = authenticationSlice
export const { showSignUp, hideSignUp } = actions
export default reducer