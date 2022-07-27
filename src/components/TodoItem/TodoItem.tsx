import { useDispatch } from "react-redux";
import { removeTodo } from "../../redux/reducers/todoReducer";
import styles from "./TodoItem.module.scss";

export interface TodoItemProps {
  id: string;
  title: string;
  content: string;
  created: Date;
}

export function TodoItem({ id, title, content, created }: TodoItemProps) {
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(removeTodo(id));
  };
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <p className={styles.content}>{content}</p>
      <p className={styles.created}>{created.toLocaleString()}</p>
      <span className={styles.delete} onClick={deleteItem}>
        X
      </span>
    </div>
  );
}
