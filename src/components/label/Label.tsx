import * as React from 'react';
import './Label.css';


interface ILabel {}

export const Label: React.FC<ILabel> = ({ children }) => {
	return (
		<label className='Label'>{children}</label>
	);
};