import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  status: 'idle',
}

export const map = createSlice({
  name: 'maps',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

export const { reducer, actions } = map
export const { increment, decrement } = actions

export default reducer
