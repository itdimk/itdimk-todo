import { TodoItem, TodoItemProps } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.scss";

export interface TodoListProps {
  todos: TodoItemProps[];
}

export function TodoList() {
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
    </div>
  );
}
