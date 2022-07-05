import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchClotches } from "./asyncActions";
import { Clothes } from './types';

interface ClothesSliceState {
    clothes: Clothes[];
    status: string;
    error: string | null;
};

const initialState: ClothesSliceState = {
    clothes: [],
    status: 'loading',
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
    extraReducers: (builder) => {
        builder.addCase(fetchClotches.pending, (state, action) => {
            state.status = 'loading';
            state.clothes = [...state.clothes];
        });

        builder.addCase(fetchClotches.fulfilled, (state, action) => {
            state.status = action.payload.status;
            state.clothes = [...state.clothes, ...action.payload.data];
        });

        builder.addCase(fetchClotches.rejected, (state, action) => {
            state.status = 'not found';
            state.clothes = [...state.clothes];
        });
    },
});

export const selectClothes = (state: RootState) => state.clothes;

export const { setClothes } = clothesSlice.actions;

export default clothesSlice.reducer;