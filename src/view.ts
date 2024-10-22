import Papa from 'papaparse';
import { store, getContext } from '@wordpress/interactivity';

type ServerState = {
	state: {
		urlBase: string;
	};
};

type Context = {
	isXSelected: boolean;
	isYSelected: boolean;
};

const storeDef = {
	state: {},
	actions: {
		toggleX() {
			const context = getContext<Context>();
			context.isXSelected = !context.isXSelected;
		},
		toggleY() {
			const context = getContext<Context>();
			context.isYSelected = !context.isYSelected;
		},
	},
	callbacks: {
		// Runs due to watcher.
		// TODO: Save the processed data in context.
		loadGraph: async () => {
			const { isXSelected, isYSelected } = getContext<Context>();

			if (isXSelected && isYSelected) {
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
			const { isXSelected, isYSelected } = getContext<Context>();
			return isXSelected && isYSelected;
		}
	},
};

type Store = ServerState & typeof storeDef;

const { state } = store<Store>( 'plotter-ts', storeDef );
