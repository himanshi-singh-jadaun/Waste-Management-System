import React, { useContext } from 'react';
import './navbar.css';
import { Link , useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { logoutCall } from '../apiCalls';


export default function Navbar() {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    const handleDashboard = (e) => {
        e.preventDefault();
        navigate('/admin');
    };

    const handleLogout = (e) => {
        e.preventDefault();
        logoutCall(dispatch)
    };

    return (
        // <nav className='navbar'>
            <div className="navContainer">
                
                    <div className='logoImg'>
                    <Link to='/'>
                        <img src="/src/images/logo.png" alt="" />
                        </Link>
                    </div>
                
                <div className="titleContainer">
                    <p>Waste Management System</p>
                   {/* <img src="/src/ws-logo.png" alt="" /> */}
                </div>
                
                <div className='linksContainer'>
                    {user ? (
                        <>
                            {/* <Link to='/admin' 
                            style={{ textDecoration: "none", color: "white", marginRight: "1rem" }}>
                                <span className='navItem'>Dashboard</span>
                            </Link> */}
                            <button 
                            className='navBtn1'
                            onClick={handleDashboard}
                            >
                             Dashboard
                            </button>
                            <button className='navBtn' 
                            onClick={handleLogout}
                            >
                            Logout
                            </button>
                        </>
                    ) : (
                        <>
                        {/* <Link to='/login' 
                        style={{ textDecoration: "none", color: "white" }}
                        >
                            <span className='navItem'>Login</span>
                        </Link> */}
                        <button 
                        className='navBtn'
                        onClick={handleLogin}
                        >
                        Login
                        </button>
                        {/* <Link to='/register' style={{ textDecoration: "none", color: "white" }}>
                        <span className='navItem'>Register</span>
                        </Link> */}
                    </>
                        )}
                </div>
            </div>
        // </nav>
    )
}
