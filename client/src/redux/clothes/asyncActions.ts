import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ResponseClothesBody, RequestClothesBody } from "./types";

export const fetchClotches = createAsyncThunk<ResponseClothesBody, RequestClothesBody>(
    'clothes/fetchClothesStatus',
    async (body: RequestClothesBody) => {
        const { data } = await axios.post<ResponseClothesBody>(`${process.env.REACT_APP_SERVER_BASE_URL}/wear/filter-wear`, {
            ...body,
        });
        if(data.status === 'success') {
            return data;
        } else {
            throw new Error();
        }
    },
);

