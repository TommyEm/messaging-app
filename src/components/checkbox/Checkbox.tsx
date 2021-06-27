import * as React from 'react';
import './Checkbox.css';


interface ICheckbox {
	checked: boolean;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<ICheckbox> = ({ checked, onChange }) => {
	return (
		<input
			className='Checkbox'
			type='checkbox'
			checked={checked}
			onChange={onChange}
		/>
	);
};