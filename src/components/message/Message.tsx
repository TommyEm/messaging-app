import * as React from 'react';


interface IMessage {
}

export const Message: React.FC<IMessage> = ({ children }) => {
	return (
		<div className='Message'>
			{children}
		</div>
	)
};