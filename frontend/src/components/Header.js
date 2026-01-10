import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import AuthContext from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setShowMenu(false);
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-section">
                    <Link to="/" className="logo">
                        <img src="/icon.jpg" alt="Mind Horizon Logo" className="logo-icon" />
                        <h1 className="logo-title">Mind Horizon</h1>
                        <p className="tagline">Your Mind shapes every result you get</p>
                    </Link>
                </div>
                {user && (
                    <nav className="user-nav">
                        <button
                            className="menu-toggle"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            ☰ Menu
                        </button>
                        <div className={`nav-menu ${showMenu ? 'active' : ''}`}>
                            <Link to="/blogs" className="nav-link" onClick={() => setShowMenu(false)}>
                                📚 All Posts
                            </Link>
                            <Link to="/create" className="nav-link btn-create" onClick={() => setShowMenu(false)}>
                                ✏️ Create Post
                            </Link>
                            <Link to="/my-posts" className="nav-link" onClick={() => setShowMenu(false)}>
                                👤 My Posts
                            </Link>
                            <span className="nav-user">Hello, {user.name}</span>
                            <button className="nav-link btn-logout" onClick={handleLogout}>
                                🚪 Sign Out
                            </button>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
