import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/Auth.css';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showWelcome, setShowWelcome] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await register({ name, email, password });
            setShowWelcome(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    if (showWelcome) {
        return (
            <div className="welcome-container">
                <div className="welcome-content">
                    <div className="welcome-icon">✨</div>
                    <h1 className="welcome-title">WELCOME TO MIND-HORIZON</h1>
                    <p className="welcome-subtitle">Find peace in sharing your thoughts</p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-visual">
                <div className="auth-visual-content">
                    <div className="meditation-icon">🧘‍♂️</div>
                    <h1 className="auth-visual-title">Mind Horizon</h1>
                    <p className="auth-visual-text">Share your thoughts, find your peace</p>
                </div>
            </div>
            <div className="auth-container">
                <h2>Create Account</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
                <div className="auth-divider">
                    <span>or</span>
                </div>
                <p className="auth-footer">
                    Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
