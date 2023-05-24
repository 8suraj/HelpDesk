import React, { useState } from 'react';
import personCalling from '../../asset/svgs/personCalling.svg';
import { Form, Formik } from 'formik';
import { postRequest } from '../../api/api';
import jwt_decode from 'jwt-decode';
import {
	InputField,
	TextField,
	getToken,
	Select,
} from '..';
import { withAuthRaiser } from '../../hoc/auth/auth.hoc';
import './createTicket.styles.scss';
import persona from '../../asset/svgs/persoona.svg';
import ticket from '../../asset/svgs/ticket.svg';
import email from '../../asset/svgs/email.svg';
import right from '../../asset/svgs/done100.svg';
import wrong from '../../asset/svgs/close100.svg';

const tickets = [
	{ label: 'Grievance', value: 'Grievance' },
	{ label: 'Reimbursement', value: 'Reimbursement' },
	{ label: 'Asset allocation', value: 'Asset allocation' },
	{ label: 'Client request', value: 'Client request' },
	{ label: 'Onboarding', value: 'Onboarding' },
	{ label: 'Change request', value: 'Change request' },
	{ label: 'Marketing', value: 'Marketing' },
];
function CreateTicket() {
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);
	const [show, setShow] = useState(true);
	const [ticketID, setTicketID] = useState(false);
	const [ticketType, setTicketType] = useState(null);
	const handleSubmit = (values) => {
		console.log(values);
		const payload = JSON.stringify({
			...values,
			ticketType,
		});
		postRequest(
			process.env.REACT_APP_API_RAISER_CREATE_TICKET,
			payload
		)
			.then((result) => setTicketID(result.data.ticketId))
			.catch((err) => {
				setError(err.message);
			});
	};
	React.useEffect(() => {
		setData(jwt_decode(getToken()));
	}, []);

	React.useEffect(() => {
		setTicketID(false);
		setError(false);
		setShow(true);
	}, []);
	React.useEffect(() => {
		if (ticketID) {
			setShow(false);
		}
		if (error) {
			setShow(false);
		}
		setTimeout(() => {
			setError(false);
			setTicketID(false);
			setShow(true);
		}, 3000);
	}, [ticketID, error]);
	return (
		<div className='create'>
			<div className='create__container'>
				{show && (
					<>
						<div className='create__svg'>
							<img src={personCalling} alt='' />
						</div>

						<Formik
							initialValues={{
								ticketType: ticketType ? ticketType : '',
								fullName: data ? data.fullName : '',
								email: data ? data.email : '',
								description: '',
							}}
							enableReinitialize
							onSubmit={handleSubmit}>
							<Form className='create__form'>
								<div className='header'>Create Ticket</div>

								<InputField
									img={persona}
									name='fullName'
									placeholder='Full Name'
								/>
								<InputField
									img={email}
									name='email'
									placeholder='Email'
								/>
								<Select
									onChange={(e) => setTicketType(e)}
									name='ticketType'
									img={ticket}
									options={tickets}
								/>

								<TextField
									name='description'
									placeholder='Description'
								/>
								{error && (
									<div className='auth__error'>
										{error?.response?.data?.error
											? error?.response?.data?.error
											: error}
									</div>
								)}
								<button
									className='btn btn--large'
									type='submit'
									disabled={ticketType ? false : true}>
									Submit
								</button>
							</Form>
						</Formik>
					</>
				)}
				{ticketID && (
					<div className='holder'>
						<img src={right} alt='' />
						<p>Ticket id:{ticketID}</p>
					</div>
				)}
				{error && (
					<div className='holder'>
						<img src={wrong} alt='' />
						<p>Your Computer sucks:{error}</p>
					</div>
				)}
			</div>
		</div>
	);
}
export default withAuthRaiser(CreateTicket);
