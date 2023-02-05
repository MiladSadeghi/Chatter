import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector as rawUseSelector } from "react-redux";
import authReducer from "./features/auth/authSlice"

const rootReducer = combineReducers({
  auth: authReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "development" ? false : true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export default store;