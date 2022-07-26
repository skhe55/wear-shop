import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { registration, signin } from "./asyncActions";

interface AuthSliceState {
    token: string;
    isAuth: boolean;
    role: string;
    notification: string;
}

const initialState: AuthSliceState = {
    token: '',
    isAuth: false,
    role: '',
    notification: ''
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setRole(state, action: PayloadAction<string>) {
            state.role = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signin.pending, (state, action) => {
            state.token = state.token;
            state.isAuth = state.isAuth;
            state.role = state.role;
            state.notification = '';
        }),
        builder.addCase(signin.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.isAuth = true;
            state.notification = 'Вы успешно зашли в аккаунт!';
        }),
        builder.addCase(signin.rejected, (state, aciton) => {
            state.token = '';
            state.role = '';
            state.isAuth = false;
            state.notification = 'Что-то пошло не так, вам не удалось зайти :(';
        }),
        builder.addCase(registration.pending, (state, action) => {
            state.token = state.token;
            state.isAuth = state.isAuth;
            state.role = state.role;
        }),
        builder.addCase(registration.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.isAuth = true;
        }),
        builder.addCase(registration.rejected, (state, action) => {
            state.isAuth = false;
            state.role = '';
            state.token = '';
        })
    }
});

export const selectAuth = (state: RootState) => state.auth;

export const {setToken, setAuth, setRole} = authSlice.actions;

export default authSlice.reducer;