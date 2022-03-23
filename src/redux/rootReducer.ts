import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import { todoReducer } from "./reducers/todoReducer";

export const rootReducer = combineReducers({
  todoReducer,
  authReducer
});
