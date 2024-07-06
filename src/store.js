import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

export let { changeName } = user.actions;

const stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

const cartItems = createSlice({
  name: "cartItems",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      let num = state.findIndex((a) => {
        return a.id == action.payload;
      });
      state[num].count++;
    },
    addItem(state, action) {
      state.push(action.payload);
    },
  },
});

export let { addCount, addItem } = cartItems.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cartItems: cartItems.reducer,
  },
});
