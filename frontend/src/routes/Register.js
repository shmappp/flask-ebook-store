import React, { useState } from 'react'
import '../App.css'
import '../css/Login.css'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router'

const registerUser = async (credentials) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export const Register = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await registerUser({
            username,
            password
        });
    console.log(token);
    }

    return (
        <>
        <div className='App'>
            <div className='login-wrapper'> 
                <h1>Create account</h1>
                <Link to='/login'>Back to login</Link>
                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        <p>Username</p>
                        <input type='text' onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        <p>Password</p>
                        <input type='text' onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <div>
                        <Button type='submit'>Submit</Button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )

}

export default Register;