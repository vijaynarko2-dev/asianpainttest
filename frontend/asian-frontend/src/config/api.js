const base = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = base.endsWith('/') ? base.slice(0, -1) : base;

export default API_URL;
