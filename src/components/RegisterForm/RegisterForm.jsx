import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";

import Button from "../Button/Button";

import { registerThunk } from "../../redux/auth/authOperations";
import { registrationSchema } from "../../helpers/registrationSchema";
import { selectIsLoading } from "../../redux/auth/authSelectors";

import s from "./RegisterForm.module.css";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (values, actions) => {
      try {
        await dispatch(registerThunk(values)).unwrap();
        actions.resetForm();
        navigate("/auth/login", { replace: true });
      } finally {
        actions.setSubmitting(false);
      }
    },
    [dispatch, navigate],
  );

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <nav className={s.linkNav}>
          <Link to="/auth/register" className={s.registerLink}>
            Registration
          </Link>
          <Link to="/auth/login" className={s.loginLink}>
            Log In
          </Link>
        </nav>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={registrationSchema}
          validateOnBlur={true}
        >
          <Form className={s.form}>
            <label>
              <div>
                <Field
                  type="text"
                  name="name"
                  className={s.input}
                  placeholder="Enter your name"
                />
              </div>
              <ErrorMessage
                name="name"
                component="span"
                className={s.errorMessage}
              />
            </label>
            <label>
              <div>
                <Field
                  type="email"
                  name="email"
                  className={s.input}
                  placeholder="Enter your email"
                />
              </div>
              <ErrorMessage
                name="email"
                component="span"
                className={s.errorMessage}
              />
            </label>
            <label>
              <div className={s.passwordWrapper}>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={s.input}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={s.eyeButton}
                >
                  {showPassword ? (
                    <MdOutlineVisibilityOff size="18" />
                  ) : (
                    <MdOutlineRemoveRedEye size="18" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="span"
                className={s.errorMessage}
              />
            </label>
            <Button text="Register Now" type="submit" isLoading={isLoading} />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
