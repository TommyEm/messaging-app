import * as React from 'react';
import { Message, IMessageData } from '../message/Message';
import './List.css';


interface IList {
	items: IMessageData[];
}

export const List = React.forwardRef<HTMLUListElement, IList>(({ items }, ref) => {
	const listItems = items.map((item: IMessageData) => {
		return (
			<li key={item.id} className='ListItem'>
				<Message privateMessage={item.private}>
					{item.text}
				</Message>
			</li>
		);
	});

	return (
		<ul ref={ref} className='List'>
			{listItems}
		</ul>
	);
});