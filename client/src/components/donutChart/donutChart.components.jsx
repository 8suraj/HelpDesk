import React, {
	memo,
	useCallback,
	useEffect,
	useRef,
} from 'react';
import * as d3 from 'd3';

const DonutChart = memo(({ data }) => {
	const chartRef = useRef(null);

	const createDonutChart = useCallback(() => {
		const svg = d3.select(chartRef.current);
		const width = svg.attr('width');
		const height = svg.attr('height');
		const margin = 10;
		const radius = Math.min(width, height) / 2 - margin;

		const color = d3
			.scaleOrdinal()
			.domain(data.map((d) => d.name))
			.range(data.map((d) => d.color));

		const pie = d3.pie().value((d) => d.value);

		const arc = d3
			.arc()
			.innerRadius(radius * 0.5)
			.outerRadius(radius);

		const g = svg
			.append('g')
			.attr(
				'transform',
				`translate(${width / 2},${height / 2})`
			);

		const path = g
			.selectAll('path')
			.data(pie(data))
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', (d) => color(d.data.name));
	}, [data]);

	useEffect(() => {
		createDonutChart();
	}, [createDonutChart]);

	useEffect(() => {
		return () => {
			const svg = d3.select(chartRef.current);
			svg.selectAll('*').remove();
		};
	}, []);

	return (
		<svg ref={chartRef} width={100} height={100}></svg>
	);
});

export default DonutChart;
