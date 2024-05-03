import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Product {
  id: string; // Make sure it matches the type used in Products component
  title: string;
  description: string;
  category: string;
  imageurl: string;
  price: number;
  oldprice: number;
  rating: number;
  creator: string;
  quantity: number; // Add quantity property
}

interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: [],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item: any = state.products.find(
        (item) => item.id === action.payload
      );
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item: any = state.products.find(
        (item) => item.id === action.payload
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = shopSlice.actions;
export default shopSlice.reducer;
