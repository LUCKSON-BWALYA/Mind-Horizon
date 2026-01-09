import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showWelcome, setShowWelcome] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login({ email, password });
            setShowWelcome(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    if (showWelcome) {
        return (
            <div className="welcome-container">
                <div className="welcome-content">
                    <img src="/Peaceful.png" alt="Welcome" className="welcome-image" />
                    <h1 className="welcome-title">WELCOME TO MIND-HORIZON</h1>
                    <p className="welcome-subtitle">Find peace in sharing your thoughts</p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-visual">
                <img src="/Peaceful.png" alt="Meditation" className="auth-image" />
            </div>
            <div className="auth-container">
                <div className="container">
                    <div className="login-box">
                        <div className="header">Sign In</div>
                        {error && <div className="auth-error">{error}</div>}
                        <form onSubmit={handleSubmit} className="form">
                            <input
                                className="input"
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />

                            <input
                                className="input"
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />

                            <button type="submit" className="button sign-in">Sign In</button>
                        </form>

                        <div className="auth-divider">
                            <span>or</span>
                        </div>
                        <p className="auth-footer">
                            Don't have an account? <Link to="/register" className="auth-link">Create one</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
