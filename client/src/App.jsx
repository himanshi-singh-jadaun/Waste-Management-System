import React, { useContext } from 'react';
import './app.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Complain from './pages/Complain';
import Admin from './pages/Admin';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import Footer from './components/Footer';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/complain" element={<Complain />} />
        <Route path='/login' element={user ? <Navigate to='/admin' /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/admin' element={user ? <Admin /> : <Login />} />
      </Routes>      
      <Footer />
    </BrowserRouter>
    
  )
};

export default App;
