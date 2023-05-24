import React from 'react';
import { getRequest } from '../../api/api';
import useSWR from 'swr';
import { io } from 'socket.io-client';
import { DragDropContext } from 'react-beautiful-dnd';
import jwt_decode from 'jwt-decode';
import { getToken } from '../../components';
import DonutChart from '../../components/donutChart/donutChart.components';
import TicketContainer from '../../components/ticketContainer/ticketModalContainer.components';
export default function AssignedTickets() {
	const [tickets, setTickets] = React.useState({
		InQueue: [],
		Resolved: [],
		Escalated: [],
		InProgress: [],
	});
	const { data, error } = useSWR(
		[
			process.env.REACT_APP_API_TICKET_ASSIGNED_TOUSER,
			{ sorted: 1 },
		],
		getRequest
	);
	const Socket = io('http://localhost:7000/', {
		transportOptions: {
			polling: {
				extraHeaders: {
					Authorization: `Bearer ${getToken()}`,
				},
			},
		},
	});
	const userData = jwt_decode(getToken());
	React.useEffect(() => {
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
	React.useEffect(() => {
		if (data) {
			setTickets({
				InQueue: [],
				Resolved: [],
				Escalated: [],
				InProgress: [],
			});
			console.log(data?.data?.tickets);
			setTickets((prevTickets) => ({
				...prevTickets,
				InProgress: [
					...data?.data?.tickets.InProgress,
					...prevTickets.InProgress,
				],
				InQueue: [
					...data?.data?.tickets.InQueue,
					...prevTickets.InQueue,
				],
				Resolved: [
					...data?.data?.tickets.Resolved,
					...prevTickets.Resolved,
				],
				Escalated: [
					...data?.data?.tickets.Escalated,
					...prevTickets.Escalated,
				],
			}));
		}
	}, [data]);

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		statusHandler(destination.droppableId, draggableId);
		if (
			destination.droppableId === 'InProgress' &&
			source.droppableId === 'In-Queue'
		) {
			let Tick;
			const array = [];
			for (let ticket of tickets.InQueue) {
				if (ticket._id !== draggableId) {
					array.push(ticket);
				} else {
					Tick = {
						...ticket,
						ticketStatus: destination.droppableId,
					};
				}
			}
			setTickets((prevTickets) => ({
				...prevTickets,
				InProgress: [Tick, ...prevTickets.InProgress],
				InQueue: [...array],
			}));
		}
		if (
			destination.droppableId === 'InProgress' &&
			source.droppableId === 'Escalated'
		) {
			let Tick;
			const array = [];
			for (let ticket of tickets.Escalated) {
				if (ticket._id !== draggableId) {
					array.push(ticket);
				} else {
					Tick = {
						...ticket,
						ticketStatus: destination.droppableId,
					};
				}
			}
			setTickets((prevTickets) => ({
				...prevTickets,
				InProgress: [Tick, ...prevTickets.InProgress],
				Escalated: [...array],
			}));
		}
		if (
			destination.droppableId === 'Resolved' &&
			source.droppableId === 'InProgress'
		) {
			let Tick;
			const array = [];
			for (let ticket of tickets.InProgress) {
				if (ticket._id !== draggableId) {
					array.push(ticket);
				} else {
					Tick = {
						...ticket,
						ticketStatus: destination.droppableId,
					};
				}
			}
			setTickets((prevTickets) => ({
				...prevTickets,
				Resolved: [Tick, ...prevTickets.InProgress],
				InProgress: [...array],
			}));
		}
		if (
			destination.droppableId === 'Resolved' &&
			source.droppableId === 'Escalated'
		) {
			let Tick;
			const array = [];
			for (let ticket of tickets.Escalated) {
				if (ticket._id !== draggableId) {
					array.push(ticket);
				} else {
					Tick = {
						...ticket,
						ticketStatus: destination.droppableId,
					};
				}
			}
			setTickets((prevTickets) => ({
				...prevTickets,
				Resolved: [Tick, ...prevTickets.InProgress],
				Escalated: [...array],
			}));
		}
		if (
			destination.droppableId === 'Resolved' &&
			source.droppableId === 'In-Queue'
		) {
			let Tick;
			const array = [];
			for (let ticket of tickets.InQueue) {
				if (ticket._id !== draggableId) {
					array.push(ticket);
				} else {
					Tick = {
						...ticket,
						ticketStatus: destination.droppableId,
					};
				}
			}
			setTickets((prevTickets) => ({
				...prevTickets,
				Resolved: [Tick, ...prevTickets.InProgress],
				InQueue: [...array],
			}));
		}
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='ticket'>
				<div className='ticket__container ticket__container--assigned'>
					<div className='ticket__graph'>
						<div>
							<div style={{ color: '#ffff' }}>
								Total :
								{tickets?.InProgress.length +
									tickets?.Resolved.length +
									tickets?.InQueue.length +
									tickets?.Escalated.length}
							</div>
							<div style={{ color: '#DB9F04' }}>
								In-Queue :{tickets?.InQueue.length}
							</div>
							<div style={{ color: '#FFE604' }}>
								In-Progress :{tickets?.InProgress.length}
							</div>
							<div style={{ color: '#DB0404' }}>
								Escalated :{tickets?.Escalated.length}
							</div>
							<div style={{ color: '#04DB19' }}>
								Resolved :{tickets?.Resolved.length}
							</div>
						</div>
						<div>
							<DonutChart
								data={[
									{
										value: tickets?.InQueue.length,
										color: '#e89520',
										name: 'In-Queue',
									},
									{
										value: tickets?.InProgress.length,
										color: '#FFE604',
										name: 'In-Progress',
									},
									{
										value: tickets?.Escalated.length,
										color: '#e8202a',
										name: 'Escalated',
									},
									{
										value: tickets?.Resolved.length,
										color: '#04DB19',
										name: 'Resolved',
									},
								]}
							/>
						</div>
					</div>

					<div className='ticket__kanban ticket__kanban--assigned'>
						{!data && !error && (
							<div>Data is Loading...</div>
						)}

						{data && (
							<>
								<TicketContainer
									data={tickets?.InQueue}
									header='In-Queue'
									color='#e89520'
								/>
								<TicketContainer
									data={tickets?.InProgress}
									header='InProgress'
									color='#FFE604'
								/>
								<TicketContainer
									data={tickets?.Escalated}
									header='Escalated'
									color='#e8202a'
								/>
								<TicketContainer
									data={tickets?.Resolved}
									header='Resolved'
									color='#04DB19'
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</DragDropContext>
	);
}
