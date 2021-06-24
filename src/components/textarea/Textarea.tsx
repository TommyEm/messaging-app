import * as React from 'react';


interface ITextarea {
	value: string;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const Textarea: React.FC<ITextarea> = ({ value, onChange }) => {
	return (
		<input
			className='Textarea'
			type='textarea'
			defaultValue={value}
			onChange={onChange}
		/>
	);
};