import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './ticketModalContainer.styles.scss';
import TicketModal from '../ticketModal/ticketModal.component';
import { getToken } from '../authentication/auth.component';
import jwt_decode from 'jwt-decode';
export default function TicketContainer({
	data,
	header,
	color,
}) {
	const userData = jwt_decode(getToken());
	return (
		<Droppable
			droppableId={header}
			isDropDisabled={
				header === 'Assigned' ||
				(header === 'Resolved' && !userData.isResolver)
			}>
			{(provided) => (
				<div className='ticketModalContainer'>
					<div
						className='ticketModalContainer__head'
						style={{ color: color }}>
						{header}
					</div>

					<div
						className='ticketModalContainer__body'
						ref={provided.innerRef}
						{...provided.droppableProps}>
						{data &&
							data?.map((item, index) => (
								<TicketModal
									data={item}
									index={index}
									isDraggable={
										header === 'Assigned' ||
										(header === 'Escalated' &&
											!userData.isResolver) ||
										header === 'Resolved' ||
										header === 'Assigned To You'
									}
									isClickable={
										header !== 'Unassigned' &&
										header !== 'Assigned'
									}
								/>
							))}
						{provided.placeholder}
					</div>
				</div>
			)}
		</Droppable>
	);
}
