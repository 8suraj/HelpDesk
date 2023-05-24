import React, { useEffect, useState } from 'react';
import { getRequest } from '../../api/api';
import { io } from 'socket.io-client';
import useSWR from 'swr';
import { DragDropContext } from 'react-beautiful-dnd';
import jwt_decode from 'jwt-decode';
import { getToken } from '../../components';
import DonutChart from '../../components/donutChart/donutChart.components';
import TicketContainer from '../../components/ticketContainer/ticketModalContainer.components';
import './ticket.styles.scss';
export default function Ticket() {
	const [tickets1, setTickets1] = useState([]);
	const [tickets2, setTickets2] = useState([]);
	const [tickets3, setTickets3] = useState([]);
	const userData = jwt_decode(getToken());
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
	const statusHandler = (to, id) => {
		Socket.emit('update', {
			ticketId: id,
			body: to,
			updateType: 'status',
			fullName: userData.fullName,
			isResolver: userData.isResolver,
		});
	};
	const assignmentHandler = (id) => {
		Socket.emit('update', {
			ticketId: id,
			resolverId: userData.id,
			updateType: 'assignment',
			fullName: userData.fullName,
			isResolver: userData.isResolver,
		});
	};
	const { data: data1, error: error1 } = useSWR(
		userData.isResolver
			? [process.env.REACT_APP_API_TICKET_UNASSIGNED]
			: [process.env.REACT_APP_API_TICKET_UNRESOLVED],
		getRequest
	);
	const { data: data2, error: error2 } = useSWR(
		userData.isResolver
			? [process.env.REACT_APP_API_TICKET_ASSIGNED_TOUSER]
			: [process.env.REACT_APP_API_TICKET_RESOLVED],
		getRequest
	);
	const { data: data3, error: error3 } = useSWR(
		userData.isResolver
			? [process.env.REACT_APP_API_TICKET_ASSIGNED]
			: [process.env.REACT_APP_API_TICKET_ESCALATED],
		getRequest
	);
	useEffect(() => {
		if (data1) {
			setTickets1(data1?.data.tickets);
		}
	}, [data1]);
	useEffect(() => {
		if (data2) {
			setTickets2(data2?.data.tickets);
		}
	}, [data2]);
	useEffect(() => {
		if (data3) {
			setTickets3(data3?.data.tickets);
		}
	}, [data3]);
	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		if (
			destination.droppableId === 'Escalated' &&
			source.droppableId === 'Unresolved'
		) {
			statusHandler(destination.droppableId, draggableId);
			let Tick;
			const array = [];
			for (let ticket of tickets1) {
				if (ticket._id !== draggableId) {
					array.push(ticket);
				} else {
					Tick = {
						...ticket,
						ticketStatus: destination.droppableId,
					};
				}
			}
			setTickets1(() => [...array]);
			setTickets3(() => [...tickets3, Tick]);
		}
		if (
			destination.droppableId === 'Assigned To You' &&
			source.droppableId === 'Unassigned'
		) {
			assignmentHandler(draggableId);
			let Tick;
			const array = [];
			for (let ticket of tickets1) {
				if (ticket._id !== draggableId) {
					array.push(ticket);
				} else {
					Tick = ticket;
				}
			}
			setTickets1(() => [...array]);
			setTickets2(() => [...tickets2, Tick]);
		}
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='ticket'>
				<div className='ticket__container'>
					<div className='ticket__graph'>
						<div>
							<div style={{ color: '#e89520' }}>
								{userData.isResolver
									? `Unassigned`
									: `Unresolved`}{' '}
								:{tickets1?.length}
							</div>
							<div style={{ color: '#5ce820' }}>
								{userData.isResolver
									? `Assigned To You`
									: `Resolved`}{' '}
								:{tickets2?.length}
							</div>
							<div style={{ color: '#e8202a' }}>
								{userData.isResolver
									? `Assigned`
									: `Escalated`}{' '}
								:{tickets3?.length}
							</div>
						</div>
						<div>
							<DonutChart
								data={[
									{
										value: tickets1?.length,
										color: '#e89520',
										name: userData.isResolver
											? `Unassigned`
											: `Unresolved`,
									},
									{
										value: tickets2?.length,
										color: '#5ce820',
										name: userData.isResolver
											? `Assigned To You`
											: `Resolved`,
									},
									{
										value: tickets3?.length,
										color: '#e8202a',
										name: userData.isResolver
											? `Assigned`
											: `Escalated`,
									},
								]}
							/>
						</div>
					</div>

					<div className='ticket__kanban'>
						{!tickets1 && !error1 && (
							<div>Loading unresolved tickets...</div>
						)}
						{!tickets2 && !error2 && (
							<div>
								Loading resolved tickets...
								{console.log(tickets2)}
							</div>
						)}
						{!tickets3 && !error3 && (
							<div>Loading escalated tickets...</div>
						)}
						{data1 && (
							<TicketContainer
								data={tickets1}
								header={
									userData.isResolver
										? `Unassigned`
										: `Unresolved`
								}
								color='#e89520'
							/>
						)}
						{data2 && (
							<TicketContainer
								data={tickets2}
								header={
									userData.isResolver
										? `Assigned To You`
										: `Resolved`
								}
								color='#5ce820'
							/>
						)}
						{data3 && (
							<TicketContainer
								data={tickets3}
								header={
									userData.isResolver
										? `Assigned`
										: `Escalated`
								}
								color='#e8202a'
							/>
						)}
					</div>
				</div>
			</div>
		</DragDropContext>
	);
}
