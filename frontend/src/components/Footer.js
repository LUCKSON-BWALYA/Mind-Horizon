import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <p>&copy; {currentYear} Mind Horizon. All rights reserved.</p>
                    <p>A professional blog platform built with React and Node.js</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
