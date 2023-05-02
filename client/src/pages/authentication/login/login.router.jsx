import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { UserContext } from '../../../context/user.context';
import { login, InputField } from '../../../components';
import ValidationSchema from '../../../components/authentication/validationSchemaLogIn';
import email from './email.svg';

import './auth.styles.scss';
import Lock from './lock.svg';
export default function Login() {
	const { setCurrentUserToken } = useContext(UserContext);
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const handleSubmit = (values) => {
		const { email, password } = values;
		login(
			email,
			password,
			setCurrentUserToken,
			navigate
		).then((err) => setError(err));
	};
	return (
		<div className='auth'>
			<Formik
				initialValues={{ email: '', password: '' }}
				enableReinitialize
				validationSchema={ValidationSchema}
				onSubmit={handleSubmit}>
				<Form
					className='auth__container'
					style={{ gap: '6rem' }}>
					<div className='header'>Login</div>

					<InputField
						img={email}
						name='email'
						placeholder='Email'
					/>

					<InputField
						img={Lock}
						name='password'
						placeholder='Password'
						type='password'
					/>
					{error && (
						<div className='auth__error'>
							{error ? error : error.response.data.error}
						</div>
					)}
					<div className='auth__ca'>
						Don't have an account?
						<Link to='/register'>Create One</Link>
					</div>
					<button className='btn btn--large' type='submit'>
						Login
					</button>
				</Form>
			</Formik>
		</div>
	);
}
