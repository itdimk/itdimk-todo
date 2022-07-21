import { createAction, createReducer } from "@reduxjs/toolkit";
import { TodoItem } from "../../types/TodoItem";
import { TodoListState } from "../states/TodoListState";
import {
  ADD_TODO,
  LOADED_TODOS,
  LOAD_TODOS,
  REMOVE_TODO,
  UPDATE_TODO,
} from "../actionTypes";

const initState: TodoListState = {
  todos: [],
  isLoading: false,
};

export const addTodo = createAction<TodoItem>(ADD_TODO);
export const removeTodo = createAction<string>(REMOVE_TODO);
export const updateTodo = createAction<TodoItem>(UPDATE_TODO);
export const loadedTodos = createAction<TodoItem[]>(LOADED_TODOS);
export const loadTodos = createAction(LOAD_TODOS);

export const todoReducer = createReducer(initState, (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      state.todos.push(action.payload);
    })
    .addCase(removeTodo, (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    })
    .addCase(updateTodo, (state, action) => {
      const index = state.todos.findIndex(
        (item) => item.id === action.payload.id
      );
      state.todos[index] = action.payload;
    })
    .addCase(loadedTodos, (state, action) => {
      state.todos = action.payload;
    });
});
