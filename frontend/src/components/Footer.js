import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <p>&copy; {currentYear} Mind Horizon. Empowered by Codveda Technologies. All rights reserved.</p>
                    <p>Ispired By Ms. Kalonde. </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
