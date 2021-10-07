import React from 'react';
import { Web3Context } from '../context';

function withWeb3Context(WrappedComponent) {
	return function Web3Wrapper(props) {
		//TODO
		return (
			<Web3Context.Provider value={{ account: { address: '0x123' } }}>
				<WrappedComponent {...props} />
			</Web3Context.Provider>
		);
	};
}

export default withWeb3Context;
