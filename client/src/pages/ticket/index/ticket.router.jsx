import React from 'react';
import { getRequest } from '../../../api/api';
import useSWR from 'swr';
import jwt_decode from 'jwt-decode';
import './ticket.styles.scss';
import { getToken } from '../../../components';
import DonutChart from '../../../components/donutChart/donutChart.components';
import TicketContainer from '../../../components/ticketContainer/ticketModalContainer.components';
export default function Ticket() {
	const userData = jwt_decode(getToken());
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
	return (
		<div className='ticket'>
			<div className='ticket__container'>
				<div className='ticket__graph'>
					<div>
						<div style={{ color: '#e89520' }}>
							{userData.isResolver
								? `Unassigned`
								: `Unresolved`}{' '}
							:{data1?.data?.tickets?.length}
						</div>
						<div style={{ color: '#5ce820' }}>
							{userData.isResolver
								? `Assigned To You`
								: `Resolved`}{' '}
							:{data2?.data?.tickets?.length}
						</div>
						<div style={{ color: '#e8202a' }}>
							{userData.isResolver
								? `Assigned`
								: `Escalated`}{' '}
							:{data3?.data?.tickets?.length}
						</div>
					</div>
					<div>
						<DonutChart
							data={[
								{
									value: data1?.data?.tickets?.length,
									color: '#e89520',
								},
								{
									value: data2?.data?.tickets?.length,
									color: '#5ce820',
								},
								{
									value: data3?.data?.tickets?.length,
									color: '#e8202a',
								},
							]}
						/>
					</div>
				</div>
				<div className='ticket__kanban'>
					{!data1 && !error1 && (
						<div>Loading unresolved tickets...</div>
					)}
					{!data2 && !error2 && (
						<div>Loading resolved tickets...</div>
					)}
					{!data3 && !error3 && (
						<div>Loading escalated tickets...</div>
					)}
					{data1 && (
						<TicketContainer
							data={data1}
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
							data={data2}
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
							data={data3}
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
	);
}
