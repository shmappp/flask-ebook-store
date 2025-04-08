import React, { useState } from 'react'
import '../App.css'
import '../css/Login.css'
import Button from 'react-bootstrap/esm/Button'
import { Link, useNavigate } from 'react-router'

const registerUser = async (credentials) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => {});
            throw new Error(errorData.message || 'register failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error.message);
        return {'error': error.message};
    }
    
}

export const Register = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [failedSubmit, setFailedSubmit] = useState(false);
    const [formError, setFormError] = useState('');
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
        const response = await registerUser({
            username,
            password
        });
    if (response.msg) {
        console.log('register successful: ', response);
        navigate('/login');
    } else {
        console.error('register failed', response.error || response);
        setFormError(response.error || response);
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
            <div className='register-wrapper'>
                <h1>Create account</h1>
                <Link to='/register'>Back to login</Link>
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
                    {formError && <p style={{ color: 'red' }}>{formError}</p>}
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

