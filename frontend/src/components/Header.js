import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import AuthContext from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-section">
                    <Link to="/" className="logo">
                        <img src="/icon.jpg" alt="Mind Horizon Logo" className="logo-icon" />
                        <h1>Mind Horizon</h1>
                        <p className="tagline">Your Blog, Your Voice</p>
                    </Link>
                </div>
                <nav className="nav-menu">
                    <Link to="/" className="nav-link">
                        All Posts
                    </Link>
                    <Link to="/create" className="nav-link btn-create">
                        Write Post
                    </Link>
                    {user ? (
                        <>
                            <span className="nav-user">Hello, {user.name}</span>
                            <button className="nav-link btn-ghost" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
