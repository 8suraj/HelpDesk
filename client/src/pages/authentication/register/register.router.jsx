import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { UserContext } from '../../../context/user.context';
import { register, InputField } from '../../../components';
import ValidationSchema from '../../../components/authentication/validationSchemaRegister';
import '../login/auth.styles.scss';
import Lock from '../../../asset/svgs/lock.svg';
import persona from '../../../asset/svgs/persoona.svg';
import email from '../../../asset/svgs/email.svg';

export default function Register() {
	const { setCurrentUserToken } = useContext(UserContext);
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const handleSubmit = (values) => {
		console.log(values);
		const { username, password, email, fullName } = values;
		register(
			username,
			password,
			email,
			fullName,
			setCurrentUserToken,
			navigate
		).then((err) => setError(err));
	};
	return (
		<div className='auth'>
			<Formik
				initialValues={{
					username: '',
					password: '',
					confirmPassword: '',
					fullName: '',
					email: '',
				}}
				enableReinitialize
				validationSchema={ValidationSchema}
				onSubmit={handleSubmit}>
				<Form
					className='auth__container'
					style={{ gap: '2rem' }}>
					<div className='header'>Sign Up</div>

					<InputField
						img={email}
						name='email'
						placeholder='Email'
					/>
					<InputField
						img={persona}
						name='username'
						placeholder='Username'
					/>
					<InputField
						img={persona}
						name='fullName'
						placeholder='Full Name'
					/>
					<InputField
						img={Lock}
						name='password'
						placeholder='Password'
						type='password'
					/>
					<InputField
						img={Lock}
						name='confirmPassword'
						placeholder=' Confirm Password'
						type='password'
					/>
					{error && (
						<div className='auth__error'>
							{error.message || error.response.data.error}
						</div>
					)}
					<div className='auth__ca'>
						Already have an account?
						<Link to='/'>Sign In</Link>
					</div>
					<button className='btn btn--large' type='submit'>
						Sign Up
					</button>
				</Form>
			</Formik>
		</div>
	);
}
