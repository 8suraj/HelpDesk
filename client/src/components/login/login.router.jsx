import React from 'react';
import './auth.styles.scss';
import Lock from './lock.svg';
import persona from './persoona.svg';
export default function Login() {
	return (
		<div className='auth'>
			<div
				className='auth__container'
				style={{ gap: '6rem' }}>
				<div className='header'>Login</div>

				<div className='input__holder'>
					<img src={persona} alt='' />
					<input className='input' placeholder='Email' />
				</div>

				<div className='input__holder'>
					<img src={Lock} alt='' />
					<input className='input' placeholder='Password' />
				</div>
				<div className='auth__ca'>
					Don't have an account?<span>Create One</span>
				</div>
				<button className='btn btn--large'>Login</button>
			</div>
		</div>
	);
}
