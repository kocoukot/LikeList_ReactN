import { createSlice } from '@reduxjs/toolkit';

export const likeListGroupSlice = createSlice({
  name: 'likeItem',
  initialState: {
    items: [],
  },
  reducers: {
    addLikeItem: (state, action) => {
      state.items.push(action.payload.id);
    },
    removeItem: (state, action) => {
      state.items.splice(state.items.indexOf(action.payload.id), 1);
    },
  },
});

export const addLikeItem = likeListGroupSlice.actions.addLikeItem;
export const removeItem = likeListGroupSlice.actions.removeItem;

export default likeListGroupSlice.reducer;
