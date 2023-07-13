import { createSlice } from "@reduxjs/toolkit";

export const isLoggedInSlice = createSlice({
    name: "isLoggedIn",
    initialState: {
        value: true,
        docCreated: true,
    },
    reducers: {
        login: (state) => {
            state.value = true;
        },
        logout: (state) => {
            state.value = false;
        },
        docFound: (state) => {
            state.docCreated = true;
        },
        docNotFound: (state) => {
            state.docCreated = false;
        },
    },
});

export const { login, logout, docFound, docNotFound } = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;
