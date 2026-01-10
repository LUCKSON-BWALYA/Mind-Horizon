import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import BlogForm from './pages/BlogForm';
import Login from './pages/Login';
import MyPosts from './pages/MyPosts';
import Register from './pages/Register';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/blogs" element={<BlogList />} />
                        <Route path="/my-posts" element={<MyPosts />} />
                        <Route path="/blog/:id" element={<BlogDetail />} />
                        <Route path="/create" element={<BlogForm />} />
                        <Route path="/edit/:id" element={<BlogForm />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
