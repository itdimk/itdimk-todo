import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { todoReducer } from "./reducers/todoReducer";

export const rootReducer = combineReducers({
  todoReducer,
});
