import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Example, Example1 } from './chart';
import { getToken } from '../../components';
import { getRequest } from '../../api/api';
import jwt_decode from 'jwt-decode';
import './stats.styles.scss';
export default function Stats() {
	const [tickets1, setTickets1] = useState(null);
	const [tickets2, setTickets2] = useState(null);
	const [tickets3, setTickets3] = useState(null);
	const [data, setData] = useState([]);
	const [tickets, setTickets] = React.useState({
		InQueue: [],
		Resolved: [],
		Escalated: [],
		InProgress: [],
	});
	const userData = jwt_decode(getToken());
	const { data: data5, error } = useSWR(
		userData.isResolver && [
			process.env.REACT_APP_API_TICKET_ASSIGNED_TOUSER,
			{ sorted: 1 },
		],
		getRequest
	);

	const { data: data1, error: error1 } = useSWR(
		!userData.isResolver
			? [process.env.REACT_APP_API_TICKET_UNRESOLVED]
			: null,
		getRequest
	);
	const { data: data2, error: error2 } = useSWR(
		!userData.isResolver
			? [process.env.REACT_APP_API_TICKET_RESOLVED]
			: null,
		getRequest
	);
	const { data: data3, error: error3 } = useSWR(
		!userData.isResolver
			? [process.env.REACT_APP_API_TICKET_ESCALATED]
			: null,
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
	useEffect(() => {
		setData([
			{
				Resolved: tickets2?.length,
				Unresolved: tickets1?.length,
				Escalated: tickets3?.length,
				sample: 10,
			},
		]);
	}, [tickets2, tickets1, tickets3]);

	React.useEffect(() => {
		if (data5) {
			setTickets([
				{
					InProgress:
						data5?.data?.tickets.InProgress.length,
					InQueue: data5?.data?.tickets.InQueue.length,
					Resolved: data5?.data?.tickets.Resolved.length,
					Escalated: data5?.data?.tickets.Escalated.length,
				},
			]);
		}
	}, [data5]);
	return (
		<div className='stats'>
			{!userData.isResolver && <Example data={data} />}
			{userData.isResolver && tickets && (
				<Example1 data={tickets} />
			)}
		</div>
	);
}
