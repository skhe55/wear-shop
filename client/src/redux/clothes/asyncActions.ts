import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ResponseClothesBody, RequestClothesBody, Clothes } from "./types";

export const fetchClotches = createAsyncThunk<ResponseClothesBody, RequestClothesBody>(
    'clothes/fetchClothesStatus',
    async (body: RequestClothesBody) => {
        const { data } = await axios.post<ResponseClothesBody>(`http://localhost:3001/wear/filter-wear`, {
            ...body,
        });
        if(data.status === 'success') {
            return data;
        } else {
            throw new Error();
        }
    },
);

