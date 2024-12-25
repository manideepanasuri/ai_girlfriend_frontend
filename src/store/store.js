import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './features/userdata'
import clearchat from './features/clearChat'

export const store = configureStore({
  reducer: {
    user:UserReducer,
    clearchat:clearchat,
  },
})