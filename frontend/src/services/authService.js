const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const TOKEN_KEY = 'mh_token';
const USER_KEY = 'mh_user';

export const setToken = (token) => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setUser = (user) => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
};

export const getUser = () => {
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
};

export const getAuthHeader = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const register = async ({ name, email, password }) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    setToken(data.data.token);
    setUser(data.data.user);
    return data.data;
};

export const login = async ({ email, password }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    setToken(data.data.token);
    setUser(data.data.user);
    return data.data;
};

export const logout = () => {
    setToken(null);
    setUser(null);
};

export default { register, login, logout, getToken, getUser, getAuthHeader };
