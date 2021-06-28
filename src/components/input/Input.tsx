import * as React from 'react';
import './Input.css';


interface IInput {
	value: string;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: any) => void;
}

export const Input = React.forwardRef<HTMLInputElement, IInput>(({
	value,
	onChange,
	onKeyDown
}, ref) => {
	return (
		<input
			ref={ref}
			className='Input'
			type='text'
			value={value}
			placeholder='Type a message'
			onChange={onChange}
			onKeyDown={onKeyDown}
		/>
	);
});