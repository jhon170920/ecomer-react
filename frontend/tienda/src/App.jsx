import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminPanel from './components/Auth/Admin';
import { AuthProvider } from '.';
import PrivateRoute from './PrivateRoute';
import Layout from './components/Layout';


function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>


      <Route path='/productos' 
            element={
              <PrivateRoute rolRequerido="user">
                <Layout />
                <div>Pagina de Productos</div>
              </PrivateRoute>
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
    </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
