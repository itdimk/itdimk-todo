import { createAction, createReducer } from "@reduxjs/toolkit";
import { TodoItem } from "../../domain/TodoItem";
import { TodoList } from "../../domain/TodoList";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../actionTypes";

const initState: TodoList = {
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
};

const addTodo = createAction<TodoItem>(ADD_TODO);
const removeTodo = createAction<string>(REMOVE_TODO);
const updateTodo = createAction<TodoItem>(UPDATE_TODO);

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
