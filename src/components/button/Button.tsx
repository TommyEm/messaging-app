import * as React from 'react';
import './Button.css';


interface IButton {
	type?: 'button' | 'submit' | 'reset';
	onClick: () => void;
}

export const Button: React.FC<IButton> = ({
	children,
	type = 'button',
	onClick
}) => {
	return (
		<button
			className='Button'
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};