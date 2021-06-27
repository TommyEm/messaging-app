import * as React from 'react';
import './Textarea.css';


interface ITextarea {
	value: string;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: any) => void;
}

export const Textarea: React.FC<ITextarea> = ({ value, onChange, onKeyDown }) => {
	return (
		<input
			className='Textarea'
			type='textarea'
			value={value}
			placeholder='Type a message'
			onChange={onChange}
			onKeyDown={onKeyDown}
		/>
	);
};