import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-section">
                    <Link to="/" className="logo">
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
                </nav>
            </div>
        </header>
    );
};

export default Header;
