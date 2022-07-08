import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FiltersSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FiltersSliceState = {
    searchValue: '',
    categoryName: '',
    currentPage: 0,
    sort: {
        name: 'убывающей популярности',
        sortProperty: SortPropertyEnum.RATING_DESC,
    },
    fetching: false
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCategoryName(state, action: PayloadAction<string>) {
            state.categoryName = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setFetching(state, action: PayloadAction<boolean>) {
            state.fetching = action.payload;
        }
    }
})

export const selectFilters = (state: RootState) => state.filters;

export const { setSearchValue, setCategoryName, setCurrentPage, setSort, setFetching } = filtersSlice.actions;

export default filtersSlice.reducer;