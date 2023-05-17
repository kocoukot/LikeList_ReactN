import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type LikedItem = {
  key: string;
  itemName: string;
  itemComments: string;
  itemGroup: string;
  itemColor: string;
  itemRating: number;
  itemGroupIcon: string;
};

type LikedItemsState = {
  list: LikedItem[];
};

const initialState: LikedItemsState = {
  list: [],
};

export const likeListGroupSlice = createSlice({
  name: 'likeItem',
  initialState: {
    items: initialState,
  },
  reducers: {
    addLikeItem: (state, action: PayloadAction<LikedItem>) => {
      state.items.list.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.list = state.items.list.filter(
        todo => todo.key !== action.payload,
      );
    },

    onOrderChange: (state, action: PayloadAction<LikedItem[]>) => {
      state.items.list = action.payload;
    },
  },
});

export const {addLikeItem, removeItem, onOrderChange} =
  likeListGroupSlice.actions;

export default likeListGroupSlice.reducer;
