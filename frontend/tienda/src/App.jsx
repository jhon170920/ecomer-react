import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminPanel from './components/Pages/Admin';
import {AuthProvider} from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Productos from './components/Pages/Productos';
import Recuperar from './components/Auth/Recuperar';
import Perfil from './components/Pages/Perfil';
import CodigoRecuperar from './components/Auth/CodigoRecuperar';
import { CartProvider } from './context/CartContext';
import Carrito from './components/Pages/Carrito';
import Contacto from './components/Pages/Contacto';

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>

    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/recuperar' element={<Recuperar/>}/>
      <Route path='/perfil' element={<Perfil/>}/>
      <Route path='/codigo-recuperar' element={<CodigoRecuperar/>}/>
      <Route path='/carrito' element={<Carrito/>}/>
      <Route path='/contacto' element={<Contacto/>}/>



      <Route path='/productos' 
            element={<Productos />
            }/>
            <Route 
            path="/admin"
            element={
              <PrivateRoute rolRequerido="admin">
                <AdminPanel />
              </PrivateRoute>
            }/>
            <Route path="*" element={<Navigate to="/" replace/>} />
    </Routes>
    </CartProvider>
    </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
