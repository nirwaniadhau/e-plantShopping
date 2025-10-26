import { createSlice } from "@reduxjs/toolkit";

// Initial state of the cart
const initialState = {
  items: [], // each item will have { name, image, cost, quantity }
};

// Create the slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 1️⃣ Add item to cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // 2️⃣ Remove item from cart
    removeItem: (state, action) => {
      // Filter out the item with the matching name
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // 3️⃣ Update item quantity
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
      
      // Find the item in the cart that matches the given name
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // If the item is found, update its quantity to the new value
      }
    },
  },
});

// Exporting actions for use in components
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export reducer as default for store.js
export default cartSlice.reducer;