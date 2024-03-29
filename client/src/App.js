import './App.css';
import React from 'react';
import {
	Login,
	Register,
	Ticket,
	Home,
	AssignedTickets,
	Stats,
} from './pages';
import { Routes, Route } from 'react-router-dom';
import { Navigation, CreateTicket } from './components';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/home' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route
					path='create-tickets'
					element={<CreateTicket />}
				/>
				<Route path='tickets' element={<Ticket />} />
				<Route
					path='assigned-tickets'
					element={<AssignedTickets />}
				/>
				<Route path='stats' element={<Stats />} />
			</Route>
		</Routes>
	);
}

export default App;
