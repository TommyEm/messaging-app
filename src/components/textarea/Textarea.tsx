import * as React from 'react';
import './Textarea.css';


interface ITextarea {
	value: string;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const Textarea: React.FC<ITextarea> = ({ value, onChange }) => {
	return (
		<input
			className='Textarea'
			type='textarea'
			value={value}
			placeholder='Type a message'
			onChange={onChange}
		/>
	);
};