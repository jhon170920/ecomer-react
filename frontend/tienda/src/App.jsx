import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Perfil from './components/Pages/Perfil';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/perfil' element={<Perfil/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
