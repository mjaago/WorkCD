import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DAppProvider, ChainId } from '@usedapp/core';
require('dotenv').config();

ReactDOM.render(
	<React.StrictMode>
		<DAppProvider
			config={{
				readOnlyChainId: ChainId.Localhost,
				readOnlyUrls: {
					[ChainId.Localhost]: 'http://localhost:8545',
				},
			}}
		>
			<App />
		</DAppProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
