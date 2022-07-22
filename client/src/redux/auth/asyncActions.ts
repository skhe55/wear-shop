import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RequestBodyLogin, RequestBodyRegistration, ResponseBodyLogin, ResponseBodyRegistration } from "./types";

export const signin = createAsyncThunk<ResponseBodyLogin, RequestBodyLogin>(
    'auth/signinStatus',
    async (body: RequestBodyLogin) => {
        const {data} = await axios.post<ResponseBodyLogin>(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/login`, {
            ...body
        });

        return data;
    }
)

export const registration = createAsyncThunk<ResponseBodyRegistration, RequestBodyRegistration>(
    'auth/registrationStatus',
    async (body) => {
        const {data} = await axios.post<ResponseBodyRegistration>(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/registration`, {
            ...body
        });

        return data;
    }
)