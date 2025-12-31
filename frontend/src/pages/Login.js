import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleSubmit} className="auth-form">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="btn">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;
