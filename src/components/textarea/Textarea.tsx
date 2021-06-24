import * as React from 'react';


interface ITextarea {
}

export const Textarea: React.FC<ITextarea> = ({ children }) => {
	return (
		<input
			className='Textarea'
			type='textarea'
		/>
	)
};