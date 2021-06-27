import * as React from 'react';
import './Input.css';


interface IInput {
	value: string;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: any) => void;
}

export const Input: React.FC<IInput> = ({ value, onChange, onKeyDown }) => {
	return (
		<input
			className='Input'
			type='text'
			value={value}
			placeholder='Type a message'
			onChange={onChange}
			onKeyDown={onKeyDown}
		/>
	);
};