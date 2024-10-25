import * as d3 from 'd3';
import { store } from '@wordpress/interactivity';
import actions from './utils/actions';
import extraContext from './utils/extraContext';
import { ServerState } from './types/state';

// TODO: remove graph POC and add real functionality
const xScaleKeys = ['0'];
const yScale = d3
	.scaleLinear()
	.domain([0, 10])
	.range([380, 0]);
const xScale = d3
	.scaleBand()
	.domain(xScaleKeys)
	.range([0, 580])
	.padding(0.25);

const storeDef = store( 'plotter-ts', {
	componentProps: {
		boxes: [{
			group: '0',
			min: 2,
			q1: 3,
			median: 5,
			q3: 6,
			max: 9,
		}],
		xScale: {
			width: xScale.bandwidth(),
			halfWidth: xScale.bandwidth() / 2,
			group: xScale('0'),
		},
		yScale: {
			min: yScale(2),
			q1: yScale(3),
			median: yScale(5),
			q3: yScale(6),
			max: yScale(9),
			boxHeight: yScale(3) - yScale(6)
		},
		translation: `translate(${xScale('0')},0)`
	},
	actions,
	extraContext
});

type Store = ServerState & typeof storeDef;

store< Store >( 'plotter-ts', storeDef );
