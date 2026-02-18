import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminPanel from './components/Pages/Admin';
import {AuthProvider} from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Productos from './components/Pages/Productos';


function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>


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
    </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
