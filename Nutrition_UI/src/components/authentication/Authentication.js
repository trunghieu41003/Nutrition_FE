import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Authentication.css';
import logo from '../../dashboard_image/logo.png';

const Authentication = ({ onComplete }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    // Handle login logic
    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill out all fields');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('Response status:', response.status);
            console.log('Response data:', data);

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setMessage(data.message);
                setError('');

                onComplete();

                // Navigate to the dashboard
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Error occurred during login:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="authentication-container">
            <div className="header-logo">
                <img src={logo} alt="Nutritioners Logo" />
                <h1 className="logo-title">Nutritioners</h1>
            </div>

            <div className="background"></div>

            <div className="auth-popup">
                <h2>Log In</h2>
                <p>Enter your email and password to access your account.</p>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <button onClick={handleLogin}>Login</button>
                {message && <p className="success">{message}</p>}
            </div>
        </div>
    );
};

export default Authentication;
