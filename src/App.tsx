import * as React from 'react';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

import { Button } from './components/button/Button';
import { List } from './components/list/List';
import { IMessageData } from './components/message/Message';
import { Textarea } from './components/textarea/Textarea';
import './App.css';


function App() {
	const [error, setError] = useState<AxiosError | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [messages, setMessages] = useState<IMessageData[]>([] as IMessageData[]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Without a real API, we fetch data from a local file
				const ax = axios.create({
					baseURL: 'http://localhost:3000/data'
				});
				const response = await ax.get('fake-data.json');
				setIsLoaded(true);
				setMessages(response.data);

			} catch (err) {
				setIsLoaded(true);
				setError(err);
			}
		}

		fetchData();
	}, []);

	if (error) {
		return <div>Error</div>;

	} else if (!isLoaded) {
		return <div>Loading...</div>;

	} else {
		return (
			<div className="App">
				<h1>Message App</h1>

				<List items={messages} />

				<Textarea />
				<Button>Send</Button>
			</div>
		);
	}
}

export default App;
