import React, { useState } from 'react'
import '../App.css'
import '../css/Login.css'
import Button from 'react-bootstrap/esm/Button'
import { Link, useNavigate } from 'react-router'

const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => {});
            throw new Error(errorData.message || 'login failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error.message);
        return {'error': error.message};
    }
    
}

export const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [failedSubmit, setFailedSubmit] = useState(false);
    const navigate = useNavigate();
    const minUsernameLength = 3, maxUsernameLength = 20;
    const minPasswordLength = 3, maxPasswordLength = 30;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        if (!username || username.length < minUsernameLength || username.length > maxUsernameLength) {
            setUsernameError(`Username must be between ${minUsernameLength} and ${maxUsernameLength} characters in length`);
            valid = false;
        }
        if (!password || password.length < minPasswordLength || password.length > maxPasswordLength) {
            setPasswordError(`Password must be between ${minPasswordLength} and ${maxPasswordLength} characters in length`);
            valid = false;
        }
        if (!valid) {
            setFailedSubmit(true);
            return;
        }
        const response = await loginUser({
            username,
            password
        });
    if (response?.access_token) {
        console.log('Login successful: ', response);
        localStorage.setItem('token', response.access_token);
        navigate('/');
    } else {
        console.error('Login failed', response.error || response);
    }
    }

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);

        if (failedSubmit && (value.length < minUsernameLength || value.length > maxUsernameLength)) {
            setUsernameError(`Username must be between ${minUsernameLength} and ${maxUsernameLength} characters in length`);
        } else {
            setUsernameError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (value.length < minPasswordLength || value.length > maxPasswordLength) {
            setPasswordError(`Password must be between ${minPasswordLength} and ${maxPasswordLength} characters in length`);
        } else {
            setPasswordError('');
        }
    };

    return (
        <>
        <div className='App'>
            <div className='login-wrapper'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        <p>Username</p>
                        <input type='text' onChange={(e) => handleUsernameChange(e)} />
                        {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
                    </label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        <p>Password</p>
                        <input type='text' onChange={(e) => handlePasswordChange(e)} />
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
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