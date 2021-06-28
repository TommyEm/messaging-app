import * as React from 'react';
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import axios, { AxiosError } from 'axios';
import { uniqueId } from 'lodash';

import { Button } from './components/button/Button';
import { List } from './components/list/List';
import { IApiMessage, IMessageData } from './components/message/Message';
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

	// These refs are used to auto-scroll the list of messages into view
	const mainRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	// This one is needed to focus the input field
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Without a real API, data are fetched from a local file
				const ax = axios.create({
					baseURL: 'http://localhost:3000/data',
				});
				const response = await ax.get<IApiMessage[]>('fake-data.json');
				setIsLoaded(true);

				// Without IDs from the API, we generate and add unique IDs to be used as keys when listed
				const messageData = response.data.map((item: IApiMessage) => {
					const id = uniqueId('message-');
					return { ...item, id };
				});
				setMessages(messageData);

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
			mainRef.current.scrollTo({
				top: listRef.current.offsetHeight,
				behavior: 'smooth',
			});
		}

		// Since there's only 1 available action, let's auto-focus the input field each time the message list is rendered
		inputRef.current?.focus();
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
					id: uniqueId('message-'),
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
		return <p>Something went wrong...</p>;

	} else if (!isLoaded) {
		return <p>Loading...</p>;

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
						ref={inputRef}
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
