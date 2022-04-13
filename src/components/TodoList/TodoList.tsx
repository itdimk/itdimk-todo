import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addTodo } from "../../redux/reducers/todoReducer";
import { TodoItem as TodoItemType } from "../../types/TodoItem";
import { TodoItem, TodoItemProps } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.scss";

export interface TodoListProps {
  todos: TodoItemProps[];
}

export function TodoList() {
  const { user } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAddItemClick = () => {
    const todo: TodoItemType = {
      content: Math.random().toString(),
      id: Math.random().toString(),
      title: Math.random().toString(),
      created: new Date(),
    };
    dispatch(addTodo(todo));
  };

  useEffect(() => {
    if (!user) navigate("/sign-in");
  });

  return (
    <div className={styles.todos}>
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
      <button onClick={handleAddItemClick}>Add item</button>
    </div>
  );
}
