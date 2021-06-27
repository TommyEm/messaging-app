import * as React from 'react';
import classNames from 'classnames';
import './Message.css';


export interface IMessageData {
	text: string;
	private: boolean;
}

interface IMessage {
	privateMessage: boolean;
}

export const Message: React.FC<IMessage> = ({ children, privateMessage }) => {
	const cx = classNames('Message', { 'mod-private': privateMessage });
	return (
		<div className={cx}>
			{children}
		</div>
	)
};