import * as React from 'react';
import classNames from 'classnames';
import './Message.css';


export interface IApiMessage {
	text: string;
	private: boolean;
}

export interface IMessageData extends IApiMessage {
	id: string;
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