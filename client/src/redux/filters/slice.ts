import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FiltersSliceState, SortPropertyEnum } from "./types";

const initialState: FiltersSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESC,
    },
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        }
    }
})

export const selectFilters = (state: RootState) => state.filters;

export const { setSearchValue, setCategoryId } = filtersSlice.actions;

export default filtersSlice.reducer;