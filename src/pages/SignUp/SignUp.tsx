import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "../../components/CenteredLayout/Container";
import { useAppSelector } from "../../redux/hooks";
import { register } from "../../redux/reducers/authReducer";
import styles from "../../styles/form.module.scss";

export function SignUp() {
  const dispatch = useDispatch();

  const onSubmit = (values: any) => {
    const registerAction = register({
      email: values.email,
      password: values.password,
    });
    dispatch(registerAction);
  };

  const { error, isLoading } = useAppSelector((state) => state.authReducer);

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.email) errors.email = "Required";
    if (!values.password) errors.password = "Required";

    if (values.password !== values.confirmPassword)
      errors.confirmPassword = "Passwords don't match";
    return errors;
  };

  return (
    <Container center={true}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Sign up</h2>

            <Field name="email">
              {({ input, meta }) => (
                <div className={styles.group}>
                  <label className={styles.label}>Email</label>
                  <input type="email" {...input} className={styles.textInput} />
                  {meta.touched && meta.error && (
                    <span className={styles.error}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field>

            <Field name="password">
              {({ input, meta }) => (
                <div className={styles.group}>
                  <label className={styles.label}>Password</label>
                  <input
                    type="password"
                    {...input}
                    className={styles.textInput}
                  />
                  {meta.touched && meta.error && (
                    <span className={styles.error}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field>

            <Field name="confirmPassword">
              {({ input, meta }) => (
                <div className={styles.group}>
                  <label className={styles.label}>Confirm password</label>
                  <input
                    type="password"
                    {...input}
                    className={styles.textInput}
                  />
                  {meta.touched && meta.error && (
                    <span className={styles.error}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field>

            {error && <div className={styles.error}>{error}</div>}
            <button
              type="submit"
              className={styles.submit}
              disabled={isLoading ? true : undefined}
            >
              Submit
            </button>

            <p className={styles.bottomText}>
              Already have an account? <Link to="/sign-in">Sign in</Link>
            </p>
          </form>
        )}
      />
    </Container>
  );
}
