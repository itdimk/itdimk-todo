import { TodoItem } from "../../types/TodoItem";

export interface TodoListState {
    todos: TodoItem[]
    isLoading: Boolean
}