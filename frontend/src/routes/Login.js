import React, { useState } from 'react'
import '../App.css'
import '../css/Login.css'
import Button from 'react-bootstrap/esm/Button'
import { Link, useNavigate } from 'react-router'

const loginUser = async (credentials) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser({
            username,
            password
        });
    if (response?.access_token) {
        console.log('Login successful: ', response);
        localStorage.setItem('token', response.access_token);
        navigate('/');
    } else {
        console.error('Login failed', response);
        alert('Login failed.')
    }

    }

    return (
        <>
        <div className='App'>
            <div className='login-wrapper'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        <p>Username</p>
                        <input type='text' onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        <p>Password</p>
                        <input type='text' onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <p>If you aren't registered, register <Link to='/register'>here</Link></p>
                    <div>
                        <Button type='submit'>Submit</Button>
                    </div>
                </form>
                
            </div>
        </div>
        </>
    )

}

export default Login;