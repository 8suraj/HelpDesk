import React from 'react';
import './ticketModal.styles.scss';
import Tag from '../tag/tag.components';
import DetailsModal from '../detailsModal/detailsModal';
import message from './message.svg';
export default function TicketModal({ data }) {
	const [modalOpen, setModalOpen] = React.useState(false);

	return (
		<>
			<div
				className='ticketModal'
				onClick={() => setModalOpen(true)}>
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

						<span>{data?.comments.length}</span>
					</div>
					<div>
						{data &&
							`${new Date(data?.createdAt).toLocaleString(
								'en-US',
								{
									month: 'long',
								}
							)} ${new Date(
								data?.createdAt
							).getDate()},${new Date(
								data?.createdAt
							).getFullYear()}`}
					</div>
				</div>
			</div>
			<DetailsModal
				data={data}
				open={modalOpen}
				onClose={() => setModalOpen(false)}
			/>
		</>
	);
}
