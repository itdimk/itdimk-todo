import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { Container } from "../../components/CenteredLayout/Container";
import { login, resetPass } from "../../redux/reducers/authReducer";
import styles from "../../styles/form.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const onSubmit = (values: any) => {
    const resetPassAction = resetPass(values.email);
    dispatch(resetPassAction);
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) errors.email = "Required";
    return errors;
  };

  return (
    <Container center={true}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Reset password</h2>

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

            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.submit}>
              Submit
            </button>

            <p className={styles.bottomText}>
               <Link to="/sign-in">Sign in</Link>
            </p>
          </form>
        )}
      />
    </Container>
  );
}
