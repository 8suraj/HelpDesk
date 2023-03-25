import "./App.css";
import { Login, Register } from "./pages/index";
import { Routes, Route } from "react-router-dom";
import {
  NavbarRaiser,
  NavbarResolver,
} from "./components/navbar/navbar.component";
import { HomeRaiser } from "./pages/raiser/index/home.router";
import { TicketRaiser } from "./pages/raiser/createTicket.router";
import { CreateTicket } from "./components/createTicket/createTicket.component";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/raiser" element={<NavbarRaiser />}>
          <Route index element={<HomeRaiser />} />
          <Route path="/raiser/create" element={<TicketRaiser />} />
          <Route path="/raiser/view" element={<CreateTicket />} />
        </Route>
        <Route path="/resolver" element={<NavbarResolver />}>
          <Route index element={<HomeRaiser />} />
          <Route path="/resolver/resolve" element={<TicketRaiser />} />
          <Route path="/resolver/view" element={<CreateTicket />} />
          <Route path="/resolver/assign" element={<CreateTicket />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
