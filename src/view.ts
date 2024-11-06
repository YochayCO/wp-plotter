import { store } from '@wordpress/interactivity';
import actions from './utils/actions';
import extraContext from './utils/extraContext';
import { ServerState } from './types/state';

const storeDef = store( 'plotter-ts', {
	state: {
		height: window.innerHeight * 0.9,
	},
	actions,
	extraContext,
});

type Store = ServerState & typeof storeDef;

store< Store >( 'plotter-ts', storeDef );
