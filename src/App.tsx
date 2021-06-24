import * as React from 'react';

import { Button } from './components/button/Button';
import { List } from './components/list/List';
import { Textarea } from './components/textarea/Textarea';
import './App.css';


const fakeData = [
	{
		text: 'Lorem',
		private: true,
	},
	{
		text: 'Lorem',
		private: true,
	},
	{
		text: 'Lorem',
		private: true,
	},
];

function App() {
	return (
		<div className="App">
			<h1>Message App</h1>

			<List items={fakeData} />
			
			<Textarea />
			<Button>Send</Button>
		</div>
	);
}

export default App;
