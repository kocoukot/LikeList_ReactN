// import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// export type LikedItem = {
//   key: string;
//   itemName: string;
//   itemComments: string;
//   itemGroup: string;
//   itemColor: string;
//   itemRating: number;
//   itemGroupIcon: string;
// };

// type LikedItemsState = {
//   list: LikedItem[];
// };

// const initialState: LikedItemsState = {
//   list: [],
// };
// export const ADD_TODO = "ADD_TODO";

// export const addTodo = (item: LikedItem) => ({
//   type: ADD_TODO,
//   payload:  item
// })

// const todoReducer = (state = initialState, action:  PayloadAction<LikedItem>) => {
//   switch (action.type) {
//     case ADD_TODO: {
//       console.log("action.payload " + action.payload.itemGroup + " type " + action.type)
//       return {
//         ...state,
//         list: [ ...state.list, action.payload]
//       };
//     }
//     default:
//       return state;
//   }
// }

// export default todoReducer;
 

// // export const likeListGroupSlice = createSlice({
// //   name: 'likeItem',
// //   initialState: {
// //     items: initialState,
// //   },
// //   reducers: {
// //     addLikeItem: (state, action: PayloadAction<LikedItem>) => {
// //       console.log('addItem action ' + action.payload);
// //       const test: LikedItemsState = {list: [action.payload]}
// //       state.items.list = test.list
// //        state.items.list.forEach(item =>{
// //         console.log("item " + item.itemGroup)
// //        })
// //     },
// //     removeItem: (state, action) => {
// //       state.items.list = state.items.list.filter(
// //         todo => todo.key !== action.payload,
// //       );
// //     },

// //     onOrderChange: (state, action: PayloadAction<LikedItem[]>) => {
// //       state.items.list = action.payload
// //     },
// //   },
// // });

// // export const {addLikeItem, removeItem, onOrderChange } = likeListGroupSlice.actions;
// // // export const removeItem = likeListGroupSlice.actions.removeItem;
// // // export const onOrderChange = likeListGroupSlice.actions.onOrderChange;


