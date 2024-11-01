import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Authentication.css';
import logo from '../../dashboard_image/logo.png';
import gg_logo from '../../image/Icon/gg_icon.png';

const Authentication = ({ onComplete }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [mode, setMode] = useState('login'); // "login", "forgotPassword", or "resetPassword"

    const navigate = useNavigate();

    // Utility function to check if email contains any special characters
    const isEmailValid = (email) => /^[a-zA-Z0-9@.]+$/.test(email);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        if (!isEmailValid(email)) {
            setError('Email cannot contain special characters');
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
    
            if (response.ok) {
                localStorage.setItem('token', data.token);
                
                // Fetch user data to get userId
                const userResponse = await fetch('http://localhost:3000/api/auth/users', {
                    method: 'GET',
                    headers: {  
                        'Authorization': `Bearer ${data.token}`,
                    },
                });
    
                const userData = await userResponse.json();
                if (userResponse.ok) {
                    localStorage.setItem('userId', userData.user.id); // Store userId in localStorage
                    localStorage.setItem('userName', userData.user.name); // Optional: Store userName if needed
                    setMessage(data.message);
                    setError('');
                    onComplete();
                    navigate('/dashboard');
                } else {
                    console.error('Error fetching user data:', userData);
                    setError('Failed to retrieve user information');
                }
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Error during login', err);
            setError('An error has occurred. Please try again.');
        }
    };
    

    // Handle forgot password logic
    const handleForgotPassword = async () => {
        if (!email) {
            setError('Please enter email');
            return;
        }
        if (!isEmailValid(email)) {
            setError('Email cannot contain special characters');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Check your email for password reset instructions');
                setError('');
                setMode('resetPassword');
            } else {
                setError(data.message || 'Gửi email đặt lại mật khẩu không thành công');
            }
        } catch (err) {
            console.error('Error during reset', err);
            setError('An error has occurred. Please try again.');
        }
    };

    // Handle reset password logic
    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            setError('Please fill out both fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords dont match');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password: newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Reset password successfully');
                setError('');
                setMode('login');
            } else {
                setError(data.message || 'Password reset failed');
            }
        } catch (err) {
            console.error('An error occurred during the password change process', err);
            setError('An error has occurred. Please try again.');
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
                {mode === 'login' && (
                    <>
                        <h2>Welcome back</h2>
                        <p>
                            You haven't had an account? &nbsp;
                            <Link to="/onboard?step=6"><span>Sign up</span></Link>
                        </p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))} // Removes spaces
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="error">{error}</p>}

                        <p className="forgot-password" onClick={() => setMode('forgotPassword')}>
                            Forgot password
                        </p>

                        <button onClick={handleLogin}>Login</button>
                        <div className="divider">
                            <span>or</span>
                        </div>

                        <button className="google-signup1">
                            <img src={gg_logo} alt="Google icon" />
                            Continue with Google
                        </button>
                        {message && <p className="success">{message}</p>}
                    </>
                )}

                {mode === 'forgotPassword' && (
                    <>
                        <h2>Forgot password</h2>
                        <p>
                        Enter the email you used to create your account so we can send you instructions on how to reset your password.
                        </p>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <p className="error">{error}</p>}
                        <button onClick={handleForgotPassword}>Resend Email</button>
                        {message && <p className="success">{message}</p>}

                        <button onClick={() => setMode('login')} className="back-to-login">
                            Back to login
                        </button>
                    </>
                )}

                {mode === 'resetPassword' && (
                    <>
                        <h2>Đặt lại mật khẩu</h2>
                        <p>Chọn một mật khẩu mới cho tài khoản của bạn</p>
                        <input
                            type="password"
                            placeholder="Mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {error && <p className="error">{error}</p>}

                        <button onClick={() => setMode('login')} className="back-to-login">
                            Quay lại đăng nhập
                        </button>
                        <button onClick={handleResetPassword} className="reset-password">
                            Đặt lại mật khẩu
                        </button>
                        {message && <p className="success">{message}</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default Authentication;
