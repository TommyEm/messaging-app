import * as React from 'react';


interface IButton {
}

export const Button: React.FC<IButton> = ({ children }) => {
	return (
		<button className='Button'>
			{children}
		</button>
	)
};