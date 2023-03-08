
import './App.css';
import {NavbarIssuer} from './components/navbar/navbar.component'
import {BannerIssuer} from './components/banner/banner.component'
// import { InputField } from './components/inputField/inputField.component';
import Login from './pages/login/login.router'

function App() {
  return (
    <div className="App">
      <NavbarIssuer/>
      <BannerIssuer/>
     {/* <Login /> */}
     {/* <InputField /> */}
    </div>
  );
}

export default App;
