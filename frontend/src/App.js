import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import BlogForm from './pages/BlogForm';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<BlogList />} />
                        <Route path="/blog/:id" element={<BlogDetail />} />
                        <Route path="/create" element={<BlogForm />} />
                        <Route path="/edit/:id" element={<BlogForm />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
