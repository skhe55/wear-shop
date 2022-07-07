import { Action, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk';
import clothesReducer from './clothes/slice';
import filtersReducer from './filters/slice';
import cartReducer from './cart/slice';

const store = configureStore({
    reducer: {
        clothes: clothesReducer,
        filters: filtersReducer,
        cart: cartReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export default store;