import React, { useState, useEffect } from 'react';
import './detailsModal.styles.scss';
import cross from '../../asset/svgs/crooss.svg';
import circle from '../../asset/svgs/circle.svg';
import { Formik, Form } from 'formik';
import { TextField } from '../inputField/inputField.component';
import { io } from 'socket.io-client';
import { getToken } from '../authentication/auth.component';
import jwt_decode from 'jwt-decode';
export default function DetailsModal({
	open,
	onClose,
	data,
}) {
	const [ticketUpdates, setTicketUpdates] = React.useState([
		...data.ticketUpdates,
	]);
	const [active, setActive] = useState('Comment');
	const Socket = io('http://localhost:7000/', {
		transportOptions: {
			polling: {
				extraHeaders: {
					Authorization: `Bearer ${getToken()}`,
				},
			},
		},
	});
	useEffect(() => {
		Socket.on('connect', (socket) => {
			console.log('connected');
		});
		return () => {
			Socket.on('disconnect', (socket) => {
				console.log('disconnected');
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	Socket.on('notification', (data) => {
		setTicketUpdates([...ticketUpdates, data]);
	});
	const userData = jwt_decode(getToken());
	const commentHandler = (values, { resetForm }) => {
		const { textData } = values;
		Socket.emit('update', {
			ticketId: data?._id,
			body: textData,
			updateType: 'comment',
			fullName: userData.fullName,
			isResolver: userData.isResolver,
		});
		setTicketUpdates([
			...ticketUpdates,
			{
				body: textData,
				updateType: 'comment',
				fullName: userData.fullName,
				isResolver: userData.isResolver,
			},
		]);
		resetForm({ values: '' });
	};
	const getSiblings = function (e) {
		// for collecting siblings
		let siblings = [];
		// if no parent, return no sibling
		if (!e.parentNode) {
			return siblings;
		}
		// first child of the parent node
		let sibling = e.parentNode.firstChild;

		// collecting siblings
		while (sibling) {
			if (sibling.nodeType === 1 && sibling !== e) {
				siblings.push(sibling);
			}
			sibling = sibling.nextSibling;
		}
		return siblings;
	};
	const handleClick = (e) => {
		setActive(e.target.textContent);
		e.target.classList.toggle(
			'detailsModal__interaction--active'
		);
		let siblings = getSiblings(e.target);
		siblings.shift();
		siblings.forEach((e) => {
			e.classList.remove(
				'detailsModal__interaction--active'
			);
		});
	};
	const handleReset = (formik) => {
		formik.resetForm({ values: '' });
	};
	if (!open) return null;
	return (
		<div className='detailsModal'>
			<div className='detailsModal__container'>
				<img
					src={cross}
					alt=''
					className='detailsModal__cross'
					onClick={onClose}
				/>
				<div className='detailsModal__tag'>
					<span className='tag tag__brwn'>
						{data?.ticketStatus}
					</span>
					<span className='tag tag__blue'>
						{data?._id.slice(
							data?._id.length - 8,
							data?._id?.length - 1
						)}
					</span>
				</div>
				<div className='detailsModal__desc'>
					<div className='detailsModal__desc--header'>
						Description:
					</div>
					<div className='detailsModal__desc--body'>
						{data?.description}
					</div>
				</div>
				<div className='detailsModal__interaction'>
					<span>Show:</span>
					<span
						onClick={handleClick}
						className={
							active === 'All' &&
							'detailsModal__interaction--active'
						}>
						All
					</span>
					<span onClick={handleClick}>History</span>
					<span
						onClick={handleClick}
						className='detailsModal__interaction--active'>
						Comment
					</span>
				</div>
				<div className='detailsModal__comment'>
					{active == 'Comment' && (
						<>
							<div className='detailsModal__comment1'>
								<img src={circle} alt='' />
								<span>SR</span>
							</div>
							<Formik
								onSubmit={commentHandler}
								initialValues={{
									textData: '',
								}}
								enableReinitialize>
								{(formik) => (
									<Form className='detailsModal__comment2'>
										<TextField
											name='textData'
											className='detailsModal__comment--box'
										/>
										<div className='detailsModal__comment--save'>
											<button
												className='btn btn--Xsmall '
												type='Submit'>
												Save
											</button>

											<button
												className='btn btn--Xsmall-g '
												onClick={() => handleReset(formik)}>
												Cancel
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</>
					)}
					{active === 'History' && (
						<div className='detailsModal__history'>
							{data?.ticketUpdates.map((item) => (
								<div className='detailsModal__history--status'>
									{item?.updateType === 'status' && (
										<>
											<div className='detailsModal__comment1'>
												<img src={circle} alt='' />
												<span>
													{item?.fullName
														?.split(' ')[0][0]
														.toUpperCase()}
													{item?.fullName
														?.split(' ')[1][0]
														.toUpperCase()}
												</span>
											</div>
											<div
												style={{ 'font-weight': 'bold' }}>
												{item?.fullName.toUpperCase()}
											</div>
										</>
									)}
									{item?.updateType === 'status' &&
										(item?.body === 'Created' ? (
											<div>
												Created Ticket on{' '}
												{item?.date?.split('T')[0]}
											</div>
										) : (
											<div>
												Ticket status changed to{' '}
												{item?.body} on{' '}
												{item?.date?.split('T')[0]}
											</div>
										))}
								</div>
							))}
						</div>
					)}
					{active === 'All' && (
						<div className='detailsModal__history'>
							{ticketUpdates?.map((item) => (
								<div className='detailsModal__history--status'>
									<div className='detailsModal__comment1'>
										<img src={circle} alt='' />
										<span>
											{item?.fullName
												?.split(' ')[0][0]
												.toUpperCase()}
											{item?.fullName?.split(' ')[1][0] &&
												item?.fullName
													?.split(' ')[1][0]
													?.toUpperCase()}
										</span>
									</div>
									<div style={{ 'font-weight': 'bold' }}>
										{item?.fullName}
									</div>
									{item?.updateType === 'status' ? (
										item?.body === 'Created' ? (
											<div>
												Created Ticket on{' '}
												{item?.date?.split('T')[0]}
											</div>
										) : (
											<div>
												Ticket status changed to{' '}
												{item?.body} on{' '}
												{item?.date?.split('T')[0]}
											</div>
										)
									) : (
										''
									)}

									{item.updateType === 'comment' && (
										<>
											<div>
												Commented on {item?.date}{' '}
												<b>Comment:</b>
												<br />
											</div>
											<b>{item.body}</b>
										</>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
