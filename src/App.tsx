import * as React from 'react';
import {
	useCallback, 
	useEffect,
	useRef,
	useState 
} from 'react';
import axios, { AxiosError } from 'axios';

import { Button } from './components/button/Button';
import { List } from './components/list/List';
import { IMessageData } from './components/message/Message';
import { Label } from './components/label/Label';
import { Input } from './components/input/Input';
import { Checkbox } from './components/checkbox/Checkbox';
import './App.css';


function App() {
	const [error, setError] = useState<AxiosError | null>(null);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [messages, setMessages] = useState<IMessageData[]>([] as IMessageData[]);
	const [newMessage, setNewMessage] = useState<string>('');
	const [newMessagePrivate, setNewMessagePrivate] = useState<boolean>(false);

	const listRef = useRef<HTMLUListElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

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

	// Scroll into view each time a new message is displayed
	useEffect(() => {
		if (mainRef.current && listRef.current) {
			const newOffset = listRef.current.offsetHeight;

			mainRef.current.scrollTo({
				top: newOffset,
				behavior: 'smooth',
			});
		}
	}, [messages]);

	const handleChangeMessage = (e: React.FormEvent<HTMLInputElement>) => {
		setNewMessage(e.currentTarget.value);
	};

	const handleSubmitFromInput = (e: any) => {
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

			// Reset the fields
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

				<main ref={mainRef} className='App-main'>
					<List ref={listRef} items={messages} />
				</main>

				<footer className='App-footer'>
					<Input
						value={newMessage}
						onChange={handleChangeMessage}
						onKeyDown={handleSubmitFromInput}
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
