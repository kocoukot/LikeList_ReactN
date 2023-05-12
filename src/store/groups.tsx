import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import GroupModel from '../utils/GroupModel';

interface Todo {
  id: string
  itemName: string
  itemGroup: string
  itemColor: string
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};


export const likeListGroupSlice = createSlice({
  name: 'likeItem',
  initialState: {
    items: initialState,
  },
  reducers: {
    addLikeItem: (state, action: PayloadAction<GroupModel>) => {
      console.log('addItem action ' + action.payload)
      state.items.todos.push(action.payload.toJson());
    },
    removeItem: (state, action) => {
      state.items.todos = state.items.todos.filter(todo => todo.id !== action.payload);

    },
  },
});

export const addLikeItem = likeListGroupSlice.actions.addLikeItem;
export const removeItem = likeListGroupSlice.actions.removeItem;

export default likeListGroupSlice.reducer;

