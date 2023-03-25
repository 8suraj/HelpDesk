import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { UserContext } from "../../context/user.context";
import "./register.styles.scss";
import Button from "../../components/button/button.component";
import lock from "../../assest/svgs/lock.svg";
import email from "../../assest/svgs/email.svg";
import user from "../../assest/svgs/user.svg";
import loginSvg from "../../assest/svgs/login.svg";
import { InputField } from "../../components/inputField/inputField.component";
import { register } from "../../components/authentication/auth.component";
import ValidationSchema from "../../components/authentication/validationSchemaRegister";

export default function Register() {
  const { setCurrentUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleSubmit = (values) => {
    const { username, password, email } = values;
    register(username, password, email, setCurrentUserToken, navigate).then(
      (err) => setError(err)
    );
  };
  return (
    <>
      <div className="login">
        <div className="login__container">
          <div className="login__container-1">
            <div className="login__container-1-svg">
              <img src={loginSvg} alt="" />
            </div>
          </div>
          <div className="login__container-2">
            <div className="login__body-2">
              <div className="login__body-2-header">
                Register <span>Now</span>
              </div>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  confirmPassword: "",
                  email: "",
                }}
                enableReinitialize
                validationSchema={ValidationSchema}
                onSubmit={handleSubmit}
              >
                <div className="login__form">
                  <Form>
                    <InputField
                      name="username"
                      className="loginField"
                      type="text"
                      placeholder="Username"
                      img={user}
                    />

                    <InputField
                      name="email"
                      className="loginField"
                      type="email"
                      placeholder="Email"
                      img={email}
                    />
                    <InputField
                      name="password"
                      className="loginField"
                      type="password"
                      placeholder="Password"
                      img={lock}
                    />
                    <InputField
                      name="confirmPassword"
                      className="loginField"
                      type="password"
                      placeholder="Confirm Password"
                      img={lock}
                    />
                    {error && <div>{error}</div>}
                    <Link to="/">
                      <div className="login__form--bottom">
                        <p>Already have an account ? Sign In</p>
                      </div>
                    </Link>
                    <Button
                      text="Continue"
                      type="submit"
                      className="btn--green login__container--custom"
                    />
                  </Form>
                </div>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
