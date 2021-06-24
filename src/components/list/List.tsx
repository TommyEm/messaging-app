import * as React from 'react';

import { Message } from '../message/Message';


interface IList {
	items: React.ReactNode[];
}

export const List: React.FC<IList> = ({ items }) => {
	const listItems = items.map((item: any, i: number) => {
		return (
			<li key={i} className='ListItem'>
				<Message>
					item.text
				</Message>
			</li>
		)
	})

	return (
		<div className='List'>
			{listItems}
		</div>
	)
};