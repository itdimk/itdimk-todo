import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { Container } from "../../components/CenteredLayout/Container";
import { login } from "../../redux/reducers/authReducer";
import styles from "../../styles/form.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user, isLoading } = useAppSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const onSubmit = (values: any) => {
    const loginAction = login({
      email: values.email,
      password: values.password,
    });
    dispatch(loginAction);
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.email) errors.email = "Required";
    if (!values.password) errors.password = "Required";
    return errors;
  };

  return (
    <Container center={true}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Sign in</h2>

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
            {error && <div className={styles.error}>{error}</div>}
            <button
              type="submit"
              className={styles.submit}
              disabled={isLoading ? true : undefined}
            >
              Submit
            </button>

            <p className={styles.bottomText}>
              Need an account? <Link to="/sign-up">Sign up</Link>
            </p>
            <p className={styles.bottomText}>
              <Link to="/reset-password">Forgot password</Link>
            </p>
          </form>
        )}
      />
    </Container>
  );
}
