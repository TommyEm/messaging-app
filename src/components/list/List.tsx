import * as React from 'react';
import { Message, IMessageData } from '../message/Message';
import './List.css';


interface IList {
	items: IMessageData[];
}

export const List: React.FC<IList> = ({ items }) => {
	const listItems = items.map((item: any, i: number) => {
		return (
			<li key={i} className='ListItem'>
				<Message privateMessage={item.private}>
					{item.text}
				</Message>
			</li>
		)
	});

	return (
		<ul className='List'>
			{listItems}
		</ul>
	);
};