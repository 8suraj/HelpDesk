// import React from 'react';
// import { Formik, Form } from 'formik';
// import useSWR from 'swr';
// import decode from 'jwt-decode';
// import Send from './send.svg';
// import './ticketDetails.styles.scss';
// import {
// 	Comment,
// 	Button1,
// 	TextField,
// 	getToken,
// } from '../../../components';
// import { io } from 'socket.io-client';
// import { useParams } from 'react-router-dom';
// import { getRequest } from '../../../api/api';
// export default function TicketDetails() {
// 	const [comments, setComments] = React.useState([]);
// 	const [scrollRef, setScrollRef] = React.useState(null);
// 	const { id } = useParams();
// 	const userData = decode(getToken());
// 	const Socket = io('http://localhost:7000/', {
// 		transportOptions: {
// 			polling: {
// 				extraHeaders: {
// 					Authorization: `Bearer ${getToken()}`,
// 				},
// 			},
// 		},
// 	});
// 	React.useEffect(() => {
// 		Socket.on('connect', (socket) => {
// 			console.log('connected');
// 		});
// 		scrollToBottom();
// 		return () => {
// 			Socket.on('disconnect', (socket) => {
// 				console.log('disconnected');
// 			});
// 		};
// 	}, []);
// 	Socket.on('notification', (data) => {
// 		setComments([...comments, data]);
// 	});
// 	const commentHandler = (values, { resetForm }) => {
// 		const { textData } = values;
// 		Socket.emit('comment', {
// 			ticketId: id,
// 			comment: textData,
// 			isResolver: userData.isResolver,
// 		});
// 		setComments([
// 			...comments,
// 			{ body: textData, isResolver: userData.isResolver },
// 		]);
// 		resetForm({ values: '' });
// 	};
// 	const { data, error, isLoading } = useSWR(
// 		[
// 			process.env.REACT_APP_API_TICKET_DETAILS,
// 			{ ticketId: id },
// 		],
// 		getRequest
// 	);
// 	const scrollToBottom = () => {
// 		if (scrollRef) {
// 			scrollRef.scrollIntoView({ behavior: 'smooth' });
// 		}
// 	};
// 	React.useEffect(() => {
// 		setComments(data && [...data.data.ticket.comments]);
// 	}, [data]);
// 	React.useEffect(() => {
// 		scrollToBottom();
// 	}, [comments]);

// 	return (
// 		<div className='ticketDetails'>
// 			{error && <p>{error.message}</p>}
// 			{isLoading && <p>Ticket Data is loading</p>}
// 			{data && (
// 				<div className='ticketDetails__container'>
// 					<div className='ticketDetails__header'>
// 						<div className='ticketDetails__header1'>
// 							<div>
// 								Ticket Id:
// 								{data.data.ticket._id?.slice(
// 									data.data.ticket._id?.length - 10,
// 									data.data.ticket._id?.length - 1
// 								)}
// 							</div>
// 							<div className='ticketDetails__header1--status'>
// 								Status:
// 								<span>{data.data.ticket.ticketStatus}</span>
// 							</div>
// 						</div>
// 						<div className='ticketDetails__header2'>
// 							<Button1 text='Esclate' />
// 						</div>
// 					</div>
// 					<div className='ticketDetails__body'>
// 						{comments?.map((item) => (
// 							<Comment
// 								text={item.body}
// 								isSender={
// 									userData.isResolver === item.isResolver
// 								}
// 								isResolver={item.isResolver}
// 							/>
// 						))}
// 						<div ref={(ref) => setScrollRef(ref)}></div>
// 					</div>

// 					<Formik
// 						onSubmit={commentHandler}
// 						initialValues={{
// 							textData: '',
// 						}}
// 						enableReinitialize>
// 						<Form className='ticketDetails__footer'>
// 							<div className='ticketDetails__footer--textField'>
// 								<TextField
// 									name='textData'
// 									className='ticketDetails__footer--textFieldtextarea'
// 								/>
// 							</div>
// 							<div className='ticketDetails__footer--sendBtn'>
// 								<button type='submit'>
// 									<img src={Send} alt='' />
// 								</button>
// 							</div>
// 						</Form>
// 					</Formik>
// 				</div>
// 			)}
// 		</div>
// 	);
// }
