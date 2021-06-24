import * as React from 'react';


export interface IMessageData {
	text: string;
	private: boolean;
}

interface IMessage {
}

export const Message: React.FC<IMessage> = ({ children }) => {
	return (
		<div className='Message'>
			{children}
		</div>
	)
};