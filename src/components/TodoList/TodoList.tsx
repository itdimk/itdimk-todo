import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addTodo } from "../../redux/reducers/todoReducer";
import { TodoItem as TodoItemType } from "../../types/TodoItem";
import { AddItem } from "../AddItem/AddItem";
import { TodoItem, TodoItemProps } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.scss";

export interface TodoListProps {
  todos: TodoItemProps[];
}

export function TodoList() {
  const { user } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) navigate("/sign-in");
  });

  return (
    <div className={styles.todos}>
      <AddItem />
      <TodoItem
        id="0"
        title="title"
        content="fklsdjflksdjfkl"
        created={new Date()}
      />
      <TodoItem
        id="0"
        title="title"
        content="fklsdjflksdjfkl"
        created={new Date()}
      />
      <TodoItem
        id="0"
        title="title"
        content="fklsdjflksdjfkl"
        created={new Date()}
      />
     </div>
  );
}
