import Papa from 'papaparse';
import { store, getContext } from '@wordpress/interactivity';

// Global state
type ServerState = {
	state: {
		urlBase: string;
	};
};

// Local state
type Context = {
	xValue: string;
	yValue: string;
};

const storeDef = {
	state: {},
	actions: {
		selectX(event: Event) {
			const context = getContext<Context>();
			context.xValue = (event.target as HTMLSelectElement)?.value || '';
		},
		selectY(event: Event) {
			const context = getContext<Context>();
			context.yValue = (event.target as HTMLSelectElement)?.value || '';
		},
	},
	// Event listeners and computables
	callbacks: {
		// Runs due to watcher.
		// TODO: Save the processed data in context.
		loadGraph: async () => {
			const { xValue, yValue } = getContext<Context>();

			if (storeDef.callbacks.isGraphVisible()) {
				const url = '/wp-content/uploads/2024/10/2022_STATA-1.csv' // TODO: calculate by Survey, X, Y. Use state.urlBase
				
				try {
					console.log('Fetching data...');
					Papa.parse(url, {
						header: true,
						download: true,
						complete: function (results) {
							console.log('Result:', results);
						}
					});
				} catch (error) {
					console.error(error);
				}
			}
		},
		isGraphVisible: () => {
			const { xValue, yValue } = getContext<Context>();
			return xValue && yValue;
		}
	},
};

type Store = ServerState & typeof storeDef;

const { state } = store<Store>( 'plotter-ts', storeDef );
