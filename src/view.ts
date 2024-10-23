import { store } from '@wordpress/interactivity';
import actions from './utils/actions';
import extraContext from './utils/extraContext';

store( 'plotter-ts', {
	actions,
	extraContext
});
