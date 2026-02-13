import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Perfil from './components/Pages/Perfil';
import Productos from './components/Pages/Productos';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/perfil' element={<Perfil/>}/>
      <Route path='/productos' element={<Productos/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
