import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { UserContext } from '../../context/user.context';
import './login.styles.scss'
import  Button  from '../../components/button/button.component';
import lock from '../../assest/svgs/lock.svg'
import email from '../../assest/svgs/email.svg'
import loginSvg from '../../assest/svgs/login.svg'
import { InputField } from '../../components/inputField/inputField.component';
import { login } from '../../components/authentication/auth.component';
import ValidationSchema from '../../components/authentication/validationSchemaLogIn';

const Login = () => {
    const { setCurrentUserToken } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const handleSubmit = (values) => {
      const { username, password } = values;
      login(
        username,
        password,
        setCurrentUserToken,
        navigate
      ).then((err) => setError(err));
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
                  welcome <span>back</span> 
                </div>
                <Formik
                  initialValues={{ username: '', password: '' }}
                  enableReinitialize
                  validationSchema={ValidationSchema}
                  onSubmit={handleSubmit}
                  >
                  <div className='login__form'>
                    <Form>
                      <div className="login__form-header">
                        Login with your
                      </div>
                      {/* <div className='login__form'> */}
                        <InputField
                          name='username'
                          className='loginField'
                          type='text'
                          placeholder='Username'
                          img={email}
                        />

                        <InputField
                          name='password'
                          className='loginField'
                          type='password'
                          placeholder='Password'
                          img={lock}
                        />
                        {error && <div>{error}</div>}
                      {/* </div> */}
                      <div className='login__form--bottom'>
                        <p>Don’t have account ? Sign Up</p>
                      </div>
                      <Button
                        text='Continue'
                        type='submit'
                        className='btn--green login__container--custom'
                      />
                    </Form>
                  </div>
                </Formik>
              </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login