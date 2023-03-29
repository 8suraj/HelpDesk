import "./App.css";
import {
  Login,
  Register,
  TicketsRouter,
  RaiserRouter,
  ResolverRouter,
} from "./pages";
import { Routes, Route } from "react-router-dom";
import { Q } from "./pages/tickets/1";
import { NavbarRaiser, NavbarResolver } from "./components";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/raiser" element={<NavbarRaiser />}>
          <Route index element={<RaiserRouter />} />
          <Route path="/raiser/tickets" element={<TicketsRouter />} />
          <Route path="/raiser/tickets/:id" element={<Q />} />
        </Route>
        <Route path="/resolver" element={<NavbarResolver />}>
          <Route index element={<ResolverRouter />} />
          <Route path="/resolver/resolve" element={<TicketsRouter />} />
          {/* <Route path="/resolver/view" element={<CreateTicket />} /> */}
          {/* <Route path="/resolver/assign" element={<CreateTicket />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
