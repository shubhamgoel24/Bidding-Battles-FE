import { combineReducers, configureStore } from "@reduxjs/toolkit";

import isLoggedInReducer from "reduxSlice/isLoggedInSlice";
import loaderReducer from "reduxSlice/loaderSlice";

const rootReducer = combineReducers({
    isLoggedIn: isLoggedInReducer,
    loader: loaderReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
