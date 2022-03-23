import { createAction, createReducer } from "@reduxjs/toolkit";
import { TodoItem } from "../../types/TodoItem";
import { TodoListState } from "../states/TodoListState";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../actionTypes";

const initState: TodoListState = {
  todos: [
    {
      id: "De124",
      content: "Some content Some content",
      title: "My todo title",
      created: new Date(),
    },
    {
      id: "De125",
      content: "Some content content  content",
      title: "My another todo title",
      created: new Date(),
    },
  ],
  isLoading: false
};

export const addTodo = createAction<TodoItem>(ADD_TODO);
export const removeTodo = createAction<string>(REMOVE_TODO);
export const updateTodo = createAction<TodoItem>(UPDATE_TODO);

export const todoReducer = createReducer(initState, (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      state.todos.push(action.payload);
    })
    .addCase(removeTodo, (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    })
    .addCase(updateTodo, (state, action) => {
      const index = state.todos.findIndex(item => item.id === action.payload.id);
      state.todos[index] = action.payload;
    } );
});
