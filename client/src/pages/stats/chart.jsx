import React, { PureComponent } from 'react';
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	LabelList,
	Legend,
	ResponsiveContainer,
} from 'recharts';

export const Example = ({ data }) => {
	console.log(data);
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<BarChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 20,
					right: 30,
					left: 20,
					bottom: 5,
				}}>
				<CartesianGrid
					vertical={false}
					strokeDasharray=''
				/>
				<XAxis dataKey='name' />
				<YAxis />
				<Legend iconType='circle' />
				<Bar
					dataKey='Resolved'
					fill='#53eb34'
					maxBarSize={80}>
					<LabelList
						dataKey='Resolved'
						position='top'
						minPointSize={3}
					/>
				</Bar>
				<Bar
					dataKey='Unresolved'
					fill='#eb9334'
					maxBarSize={80}
					minPointSize={3}>
					<LabelList dataKey='Unresolved' position='top' />
				</Bar>
				<Bar
					dataKey='Escalated'
					fill='#eb3d34'
					maxBarSize={80}>
					<LabelList
						dataKey='Escalated'
						position='top'
						minPointSize={3}
					/>
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
};
export const Example1 = ({ data }) => {
	console.log(data);
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<BarChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 20,
					right: 30,
					left: 20,
					bottom: 5,
				}}>
				<CartesianGrid
					vertical={false}
					strokeDasharray=''
				/>
				<XAxis dataKey='name' />
				<YAxis />
				<Legend iconType='circle' />
				<Bar
					dataKey='Resolved'
					fill='#53eb34'
					maxBarSize={80}>
					<LabelList
						dataKey='Resolved'
						position='top'
						minPointSize={3}
					/>
				</Bar>
				<Bar
					dataKey='InQueue'
					fill='#eb9334'
					maxBarSize={80}
					minPointSize={3}>
					<LabelList dataKey='InQueue' position='top' />
				</Bar>
				<Bar
					dataKey='Escalated'
					fill='#eb3d34'
					maxBarSize={80}>
					<LabelList
						dataKey='Escalated'
						position='top'
						minPointSize={3}
					/>
				</Bar>
				<Bar
					dataKey='InProgress'
					fill='#f7da48'
					maxBarSize={80}>
					<LabelList
						dataKey='InProgress'
						position='top'
						minPointSize={4}
					/>
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
};
