import { configureStore } from '@reduxjs/toolkit'
import reducer from '../pages/mapSlice'
export const store = configureStore({
  reducer: {
    reducer: reducer,
  },
})
