import * as React from 'react';
import { 
	useCallback, 
	useEffect, 
	useState 
} from 'react';
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
	const [newMessage, setNewMessage] = useState<string>('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Without a real API, we fetch data from a local file
				const ax = axios.create({
					baseURL: 'http://localhost:3000/data'
				});
				const response = await ax.get<IMessageData[]>('fake-data.json');
				setIsLoaded(true);
				setMessages(response.data);

			} catch (err) {
				setIsLoaded(true);
				setError(err);
			}
		};

		fetchData();
	}, []);

	const handleChangeMessage = (e: React.FormEvent<HTMLInputElement>) => {
		setNewMessage(e.currentTarget.value);	
	}

	const onAddMessage = useCallback(() => {
		setMessages([
			...messages,
			{
				text: newMessage,
				private: false,
			},
		]);
		
	}, [newMessage]);

	if (error) {
		return <div>Error</div>;

	} else if (!isLoaded) {
		return <div>Loading...</div>;

	} else {
		return (
			<div className="App">
				<h1>Message App</h1>

				<List items={messages} />

				<Textarea value={newMessage} onChange={handleChangeMessage} />
				<Button onClick={onAddMessage}>Send</Button>
			</div>
		);
	}
}

export default App;
