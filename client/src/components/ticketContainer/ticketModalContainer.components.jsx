import React from 'react';
import './ticketModalContainer.styles.scss';
import TicketModal from '../ticketModal/ticketModal.component';
export default function TicketContainer({
	data,
	header,
	color,
}) {
	return (
		<div className='ticketModalContainer'>
			<div
				className='ticketModalContainer__head'
				style={{ color: color }}>
				{header}
			</div>
			<div className='ticketModalContainer__body'>
				{data &&
					data?.data?.tickets?.map((item) => (
						<TicketModal data={item} />
					))}
			</div>
		</div>
	);
}
