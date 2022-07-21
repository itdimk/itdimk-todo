import styles from "./TodoItem.module.scss";

export interface TodoItemProps {
  id: string;
  title: string;
  content: string;
  created: Date
}

export function TodoItem({title, content, created}: TodoItemProps) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <p className={styles.content}>{content}</p>
      <p className={styles.created}>{created.toLocaleString()}</p>
    </div>
  );
}
