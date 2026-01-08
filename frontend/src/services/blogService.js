import authService from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch all blogs
export const fetchAllBlogs = async (category = '', sortBy = 'createdAt', order = 'desc') => {
    try {
        let url = `${API_URL}/blogs?sortBy=${sortBy}&order=${order}`;
        if (category) {
            url += `&category=${category}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

// Fetch a single blog by ID
export const fetchBlogById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/blogs/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching blog:', error);
        throw error;
    }
};

const defaultHeaders = (isJson = true) => {
    const headers = {};
    if (isJson) headers['Content-Type'] = 'application/json';
    const auth = authService.getAuthHeader();
    return { ...headers, ...auth };
};

// Create a new blog
export const createBlog = async (blogData) => {
    try {
        const response = await fetch(`${API_URL}/blogs`, {
            method: 'POST',
            headers: defaultHeaders(),
            body: JSON.stringify(blogData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create blog');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
};

// Update a blog
export const updateBlog = async (id, blogData) => {
    try {
        const response = await fetch(`${API_URL}/blogs/${id}`, {
            method: 'PUT',
            headers: defaultHeaders(),
            body: JSON.stringify(blogData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update blog');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
};

// Delete a blog
export const deleteBlog = async (id) => {
    try {
        const response = await fetch(`${API_URL}/blogs/${id}`, {
            method: 'DELETE',
            headers: defaultHeaders(false),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete blog');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
};
