import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type LikedItem = {
  key: string;
  itemName: string;
  itemComments: string;
  itemSubgroup: string;
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
        item => item.itemGroup !== action.payload.itemGroup,
      );
    },
    onUpdateItem: (state, action: PayloadAction<LikedItem>) => {
      console.log("action " + action.payload.itemRating)

       state.items.list = state.items.list.map(item => {
        if (item.key == action.payload.key) {
          return {...item,   itemName: action.payload.itemName, itemComments: action.payload.itemComments, itemRating: action.payload.itemRating};
        }
        return item;
      });
    },

    onOrderChange: (state, action: PayloadAction<LikedItem[]>) => {
      state.items.list = action.payload;
    },
  },
});

export const {addLikeItem, removeItem, onOrderChange, onUpdateItem} =
  likeListGroupSlice.actions;

export default likeListGroupSlice.reducer;
