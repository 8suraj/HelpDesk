import './App.css';
import {
	Login,
	Register,
	TicketsRouterRaiser,
	TicketsRouterResolver,
	TicketDetails,
} from './pages';
import { Routes, Route } from 'react-router-dom';
import {
	Navigation,
	CreateTicket,
	Hero,
} from './components';
function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/' element={<Navigation />}>
				<Route index element={<Hero />} />
				<Route
					path='create-tickets'
					element={<CreateTicket />}
				/>
				{/* <Route
					path='tickets'
					element={<TicketsRouterRaiser />}
				/>
				<Route
					path='tickets/:id'
					element={<TicketDetails />}
				/> */}
			</Route>
			{/* <Route path='/resolver' element={<Navigation />}>
				<Route
					path='tickets'
					element={<TicketsRouterResolver />}
				/>
				<Route
					path='tickets/:id'
					element={<TicketDetails />}
				/> 
			</Route>*/}
		</Routes>
	);
}

export default App;
