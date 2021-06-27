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
import { Label } from './components/label/Label';
import { Textarea } from './components/textarea/Textarea';
import { Checkbox } from './components/checkbox/Checkbox';
import './App.css';


function App() {
	const [error, setError] = useState<AxiosError | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [messages, setMessages] = useState<IMessageData[]>([] as IMessageData[]);
	const [newMessage, setNewMessage] = useState<string>('');
	const [newMessagePrivate, setNewMessagePrivate] = useState<boolean>(false);

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
	};

	const handleSubmitFromTextarea = (e: any) => {
		// Submit if the Return key is pressed
		if (e.keyCode === 13) {
			handleAddMessage();
		}
	};

	const togglePrivateMessage = () => {
		setNewMessagePrivate(!newMessagePrivate);
	};

	const handleAddMessage = useCallback(() => {
		if (newMessage !== '') {
			setMessages([
				...messages,
				{
					text: newMessage,
					private: newMessagePrivate,
				},
			]);
			setNewMessage('');
			setNewMessagePrivate(false);
		}
	}, [newMessage, messages, newMessagePrivate]);

	if (error) {
		return <div>Error</div>;

	} else if (!isLoaded) {
		return <div>Loading...</div>;

	} else {
		return (
			<div className='App'>
				<header className='App-header'>
					<h1>Messaging App</h1>
				</header>

				<main className='App-main'>
					<List items={messages} />
				</main>

				<footer className='App-footer'>
					<Textarea
						value={newMessage}
						onChange={handleChangeMessage}
						onKeyDown={handleSubmitFromTextarea}
					/>
					<Label>
						Private:
						<Checkbox checked={newMessagePrivate} onChange={togglePrivateMessage} />
					</Label>
					<Button type='submit' onClick={handleAddMessage}>Send</Button>
				</footer>
			</div>
		);
	}
}

export default App;
