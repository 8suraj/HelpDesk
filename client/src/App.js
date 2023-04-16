import "./App.css";
import {
  Login,
  Register,
  TicketsRouterRaiser,
  TicketsRouterResolver,
  RaiserRouter,
  ResolverRouter,
  TicketDetails,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import { NavbarRaiser, NavbarResolver } from "./components";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/raiser" element={<NavbarRaiser />}>
          <Route index element={<RaiserRouter />} />
          <Route path="tickets" element={<TicketsRouterRaiser />} />
          <Route path="tickets/:id" element={<TicketDetails />} />
        </Route>
        <Route path="/resolver" element={<NavbarResolver />}>
          <Route index element={<ResolverRouter />} />
          <Route path="tickets" element={<TicketsRouterResolver />} />
          <Route path="tickets/:id" element={<TicketDetails />} />
          {/* <Route path="/resolver/view" element={<CreateTicket />} /> */}
          {/* <Route path="/resolver/assign" element={<CreateTicket />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
