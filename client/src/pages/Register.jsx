import React, { useRef, useContext } from 'react';
import './register.css';
import axios from "axios";
import { useNavigate} from 'react-router-dom';


export default function Register() {

    const navigate = useNavigate();

    const nameRef = useRef();
    const passwordRef = useRef();
    // const isAdminRef = useRef();

    const handleSubmit = async (e) => {
        try {
            const newUser = {
                username: nameRef.current.value,
                password:passwordRef.current.value,
                // isAdmin:isAdminRef.current.value,
            };

            e.preventDefault();
            console.log("Inside frontend route");
            await axios.post("http://localhost:4000/api/auth/register", newUser);
            navigate('/login');

        }catch(err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className='registerContainer'>
                <div className="registerForm">
                <form action="" onSubmit={handleSubmit}>
                    <h2>Sign up</h2>
                    <div className="inputContainer">
                    <label>User Name</label>
                    <input
                        type="text" 
                        placeholder="username" 
                        ref={nameRef} className="rbbInput" 
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="password" 
                        ref={passwordRef} className="rbbInput" 
                    />
                    <div className="RegisterBtn">
                    <button
                        className='mainBtn'
                        type='submit'
                    >
                        Register
                    </button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}
