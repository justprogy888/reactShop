import './App.scss';
import MainPage from "./components/MainPage/MainPage.jsx"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AdminPage from './components/AdminPage/AdminPanel.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import RegisterPage from './components/RegisterPage/RegisterPage.jsx';
function App() {
  return (
      <BrowserRouter useRef="/">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
