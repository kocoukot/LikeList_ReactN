import {configureStore} from '@reduxjs/toolkit';
import {likeListGroupSlice} from '../store/groups'

import likeItemReducer from './groups'

export const store = configureStore({
  reducer: {
    listItems: likeListGroupSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

