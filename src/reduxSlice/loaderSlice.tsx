import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
    name: "loader",
    initialState: {
        value: false,
        global: true,
    },
    reducers: {
        setLoader: (state) => {
            state.value = true;
        },
        removeLoader: (state) => {
            state.value = false;
        },
        setGlobalLoader: (state) => {
            state.global = true;
        },
        removeGlobalLoader: (state) => {
            state.global = false;
        },
    },
});

export const { setLoader, removeLoader, setGlobalLoader, removeGlobalLoader } =
    loaderSlice.actions;

export default loaderSlice.reducer;
