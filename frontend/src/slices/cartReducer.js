import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return { cartItems: [], totalQuantity: 0 };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { cartItems: [], totalQuantity: 0 };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState = loadState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const { id, name, price, image, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (!existingItem) {
        state.cartItems.push({
          id,
          name,
          price,
          image,
          quantity,
        });
      } else {
        existingItem.quantity += quantity;
      }
      state.totalQuantity += quantity;
      saveState(state);
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
        state.totalQuantity--;
      }
      saveState(state);
    },
  },
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
