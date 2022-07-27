import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { addTodo } from "../../redux/reducers/todoReducer";
import styles from "./AddItem.module.scss";

export function AddItem() {
  const dispatch = useDispatch();
  const { isLoading } = useAppSelector((state) => state.todoReducer);

  const onSubmit = (values: any) => {
    const addTodoAction = addTodo({
      id: Math.random().toString().replace(".", ""),
      title: values.title,
      content: values.text,
      created: new Date(),
    });
    dispatch(addTodoAction);
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.title) errors.title = "Required";
    if (!values.text) errors.text = "Required";
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <Field name="title">
            {({ input, meta }) => (
              <>
                <div className={styles.group}>
                  <label className={styles.label}>Title</label>
                  <input type="text" {...input} className={styles.textInput} />
                </div>
                {meta.touched && meta.error && (
                  <span className={styles.error}>{meta.error}</span>
                )}
              </>
            )}
          </Field>

          <Field name="text">
            {({ input, meta }) => (
              <>
                <div className={styles.group}>
                  <label className={styles.label}>Text</label>
                  <input type="text" {...input} className={styles.textInput} />
                </div>
                {meta.touched && meta.error && (
                  <span className={styles.error}>{meta.error}</span>
                )}
              </>
            )}
          </Field>
          <button
            type="submit"
            className={styles.submit}
            disabled={isLoading ? true : undefined}
          >
            Add
          </button>
        </form>
      )}
    />
  );
}
