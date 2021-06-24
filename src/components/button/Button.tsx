import * as React from 'react';


interface IButton {
	onClick: () => void;
}

export const Button: React.FC<IButton> = ({ children, onClick }) => {
	return (
		<button className='Button' onClick={onClick}>
			{children}
		</button>
	);
};