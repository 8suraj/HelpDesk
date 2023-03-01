import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { UserContext } from '../../context/user.context';
import  Button  from '../../components/button/button.component';
import { InputField } from '../../components/inputField/inputField.component';
import './login.styles.scss';
import { login } from '../../components/authentication/auth.component';
import ValidationSchema from '../../components/authentication/validationSchemaLogIn';
import login1 from '../../assest/svgs/login.svg'
function Login() {
  const { setCurrentUserToken } = useContext(UserContext);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();
  const handleSubmit = (values) => {
    const { username, password } = values;
    login(
      username,
      password,
      setCurrentUserToken,
      // navigate
    ).then((err) => setError(err));
  };

  return (
    <div className='login'>
      <div className='login__container'>

        <div className="login__item">
            <div className="login__item-img">
                <img src={login1} alt="" />
            </div>
        </div>
        <div className="login__item">
          <div className="login__item-2">
                      <Formik
            initialValues={{ username: '', password: '' }}
            enableReinitialize
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
            >

              {/* <Navbar /> */}
              <div className='login__formContainer'>
                <h1>
                  Welcome <span>Back</span>
                </h1>
                <p>Login with your</p>

                <Form>
                  <div className='login__form'>
                    <InputField
                      name='username'
                      className='register__form'
                      type='text'
                      placeholder='Username'
                    />

                    <InputField
                      name='password'
                      className='register__form'
                      type='password'
                      placeholder='Password'
                    />
                    {error && <div>{error}</div>}
                  </div>
                  <div className='login__form--bottom'>
                    <p>I forgot password or cant sign in</p>
                  </div>
                  <Button
                    text='Continue'
                    type='submit'
                    className='btn--green login__container--custom'
                  />
                </Form>
                {/* <Button
                  text='or login with'
                  className='btn--transparent login__container--bottom--transparentButton'
                /> */}

                <div className='login__container--divider' />

                {/* <div className='login__container--quickLogin'>
                  <img src={GoogleLogo} alt='' />
                  <img src={appleIcon} alt='' />
                </div> */}
              </div>
          </Formik>
          </div>

        </div>
      </div>
    </div>
   
  );
}

export default Login;

// import React from 'react'

// const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login