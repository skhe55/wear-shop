import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Clothes, Status } from './types';

interface ClothesSliceState {
    clothes: Clothes[];
    status: Status;
    error: string | null;
};

const initialState: ClothesSliceState = {
    clothes: [],
    status: Status.LOADING,
    error: null,
}

const clothesSlice = createSlice({
    name: 'clothes',
    initialState,
    reducers: {
        setClothes(state, action: PayloadAction<Clothes[]>) {
            state.clothes = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase()
    // }
})

export const selectClothes = (state: RootState) => state.clothes;

export const { setClothes } = clothesSlice.actions;

export default clothesSlice.reducer;