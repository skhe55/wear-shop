import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateTotalPrice } from "../../utils/calculateTotalPrice";
import { getDataCartFromLS } from "../../utils/getDataCartFromLS";
import { RootState } from "../store";
import { CartItem, CartSliceState } from "./types";

const initialState: CartSliceState = getDataCartFromLS();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        plusItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if(findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }

            state.total_price = calculateTotalPrice(state.items);
        },
        minusItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if(findItem) {
                findItem.count--;
            }

            state.total_price = calculateTotalPrice(state.items);
        },
        removeItem(state, action: PayloadAction<CartItem>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload.id); 
            state.total_price = calculateTotalPrice(state.items);
        },
        clearItems(state) {
            state.items = [];
            state.total_price = 0;
        },
    },
});

export const selectCart = (state: RootState) => state.cart;

export const { plusItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;