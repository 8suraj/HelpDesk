import './App.css';
import {
	Login,
	Register,
	Ticket,
	Home,
	AssignedTicket,
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
					element={<AssignedTicket />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
