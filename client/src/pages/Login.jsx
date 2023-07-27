import React, { useRef, useContext } from 'react';
import './login.css';
import { AuthContext } from '../context/AuthContext';
import { loginCall } from '../apiCalls';
import { Link , useNavigate} from 'react-router-dom';

export default function Login() {
    const username = useRef();
    const password = useRef();
    const { isFetching, error, dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall({
            username: username.current.value,
            password: password.current.value
        }, dispatch)
    };

    return (
        <div>
            <div className='loginContainer'>
                <div className="loginForm">
                <form action="" onSubmit={handleSubmit}>
                    <h2>Sign in</h2>
                    <div className="inputContainer">
                    <label>User Name</label>
                    <input
                        type="text"
                        required
                        ref={username}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        ref={password}
                    />
                    <div className="LoginBtn">
                    <button
                        className='mainBtn'
                        type='submit'
                        disabled={isFetching}
                    >
                        Login
                    </button>
                    </div>
                    </div>
                    <div className="checkRegister">
                       <Link to='/register' variant="body2">
					      Not a Administrator? Register
				       </Link>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}
