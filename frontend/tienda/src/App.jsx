import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Auth/Login';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
2