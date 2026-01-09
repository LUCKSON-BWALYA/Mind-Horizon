import React from 'react';
import '../styles/Loader.css';

const Loader = ({ type = 'spinner' }) => {
    if (type === 'spinner') {
        return (
            <div className="spinnerContainer">
                <div className="spinner"></div>
            </div>
        );
    }

    if (type === 'words') {
        return (
            <div className="loader">
                <div className="words">
                    <span className="word">Loading</span>
                    <span className="word">Processing</span>
                    <span className="word">Fetching</span>
                    <span className="word">Please wait</span>
                </div>
            </div>
        );
    }

    return (
        <div className="spinnerContainer">
            <div className="spinner"></div>
        </div>
    );
};

export default Loader;
