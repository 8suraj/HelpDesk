import './App.css';
import Login from './pages/login/login.router'
import { Routes,Route } from "react-router-dom";
// import {NavbarRaiser } from './components/navbar/navbar.component'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>} />

      </Routes>
    </div>
  );
}

export default App;
