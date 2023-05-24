import React from 'react';
import './ticketModal.styles.scss';
import { Draggable } from 'react-beautiful-dnd';
import Tag from '../tag/tag.components';
import DetailsModal from '../detailsModal/detailsModal';
import message from '../../asset/svgs/message.svg';
export default function TicketModal({
	data,
	index,
	isDraggable,
	isClickable,
}) {
	const [modalOpen, setModalOpen] = React.useState(false);

	return (
		<>
			<Draggable
				key={data._id}
				draggableId={data._id}
				index={index}
				isDragDisabled={isDraggable}>
				{(provided) => (
					// <>
					<div
						className='ticketModal'
						onClick={() => setModalOpen(isClickable)}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}>
						<div className='ticketModal__tags'>
							<Tag
								text={data?.ticketStatus}
								className='tag__brwn'
							/>
							<Tag
								text={data?._id.slice(
									data?._id.length - 8,
									data?._id?.length - 1
								)}
								className='tag__blue'
							/>
						</div>
						<div className='ticketModal__desc'>
							{data?.description}
						</div>
						<div className='ticketModal__comment'>
							<div>
								<img src={message} alt='' />

								<span>
									{data?.ticketUpdates.reduce((a, c) => {
										if (c.updateType === 'comment') {
											return (a = a + 1);
										}
										return a;
									}, 0)}
								</span>
							</div>
							<div>
								{data &&
									`${new Date(
										data?.createdAt
									).toLocaleString('en-US', {
										month: 'long',
									})} ${new Date(
										data?.createdAt
									).getDate()},${new Date(
										data?.createdAt
									).getFullYear()}`}
							</div>
						</div>
					</div>
				)}
			</Draggable>
			<DetailsModal
				data={data}
				open={modalOpen}
				onClose={() => setModalOpen(false)}
			/>
		</>
	);
}
