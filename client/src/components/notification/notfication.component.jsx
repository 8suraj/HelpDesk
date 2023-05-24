import React from 'react';
import {
	NotifcationModal,
	NotificationHeader,
	Notifications,
	Slideright,
} from './notification.styles';
import { Overlay } from '../modal/modal.styles';
import cross from '../../asset/svgs/cross.svg';
import DetailsModal from '../detailsModal/detailsModal';
import profile from '../../asset/svgs/profile.svg';
export default function Notification({
	open,
	onClose,
	data,
	setData,
}) {
	const [clear, setClear] = React.useState(false);
	const [modalOpen, setModalOpen] = React.useState(false);
	const clickHandler = () => {
		console.log('clicked');
		setClear(!clear);
		setData([]);
		setTimeout(() => onClose(), 1000);
		setTimeout(() => setClear(false), 100);
	};
	if (!open) return null;
	return (
		<>
			<NotifcationModal>
				<NotificationHeader>
					<h2> Notifications</h2>
					<div>
						{/* {console.log(data)} */}
						<h2 onClick={clickHandler}>Clear</h2>
						<img src={cross} alt='' onClick={onClose} />
					</div>
				</NotificationHeader>
				{console.log('clear', clear)}
				{data?.map((item) => (
					<>
						{clear ? (
							<Slideright>
								<Notifications className=''>
									<img src={profile} alt='' />
									<div onClick={() => setModalOpen(true)}>
										<strong>{data.fullName}</strong>

										{item?.updateType === 'status' ? (
											item?.body === 'Created' ? (
												<strong>
													Created Ticket on{' '}
													{item?.date?.split('T')[0]}
												</strong>
											) : (
												<strong>
													Ticket status changed to
													{item?.body} on{' '}
													{item?.date?.split('T')[0]}
												</strong>
											)
										) : (
											''
										)}

										{item.updateType === 'comment' && (
											<>
												<strong>
													Commented on{' '}
													{item.date.split('T')[0]}{' '}
													<b>Comment:</b>
													<br />
												</strong>
												<b>{item.body}</b>
											</>
										)}
									</div>
								</Notifications>
							</Slideright>
						) : (
							<Notifications className=''>
								<img src={profile} alt='' />
								<div onClick={() => setModalOpen(true)}>
									<strong>{data.fullName}</strong>

									{item?.updateType === 'status' ? (
										item?.body === 'Created' ? (
											<strong>
												Created Ticket on{' '}
												{item?.date?.split('T')[0]}
											</strong>
										) : (
											<strong>
												Ticket status changed to
												{item?.body} on{' '}
												{item?.date?.split('T')[0]}
											</strong>
										)
									) : (
										''
									)}

									{item.updateType === 'comment' && (
										<>
											<strong>
												Commented on{' '}
												{item.date.split('T')[0]}{' '}
												<b>Comment:</b>
												<br />
											</strong>
											<b>{item.body}</b>
										</>
									)}
								</div>
							</Notifications>
						)}
						<DetailsModal
							data={item.ticket}
							open={modalOpen}
							onClose={() => setModalOpen(false)}
						/>
					</>
				))}
			</NotifcationModal>
			<Overlay />
		</>
	);
}
