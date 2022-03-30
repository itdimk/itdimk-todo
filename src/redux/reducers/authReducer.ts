import { createAction, createReducer } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { AuthState } from "../states/AuthState";
import { SignInData } from "../../types/SignInData";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  RESET_PASSWORD,
  SET_LOADING,
  SET_USER,
} from "../actionTypes";

const initState: AuthState = {
  user: null,
  isLoading: false,
};

export const login = createAction<SignInData>(LOGIN);
export const register = createAction<SignInData>(REGISTER);
export const logout = createAction(LOGOUT);
export const resetPass = createAction<string>(RESET_PASSWORD);
export const setUser = createAction<User | null>(SET_USER);
export const setLoading = createAction<Boolean>(SET_LOADING);

export const authReducer = createReducer(initState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    });
});
