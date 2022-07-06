import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchClotches } from "./asyncActions";
import { Clothes, Status } from './types';

interface ClothesSliceState {
    items: Clothes[];
    status: Status;
    error: string | null;
};

const initialState: ClothesSliceState = {
    items: [],
    status: Status.LOADING,
    error: null,
}

const clothesSlice = createSlice({
    name: 'clothes',
    initialState,
    reducers: {
        setClothes(state, action: PayloadAction<Clothes[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchClotches.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [...state.items];
        });

        builder.addCase(fetchClotches.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.items = [...state.items, ...action.payload.data];
        });

        builder.addCase(fetchClotches.rejected, (state, action) => {
            state.status = Status.NOT_FOUND;
            state.items = [...state.items];
        });
    },
});

export const selectClothes = (state: RootState) => state.clothes;

export const { setClothes } = clothesSlice.actions;

export default clothesSlice.reducer;