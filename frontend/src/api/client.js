import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const askAgent = (query) => client.post('/ask', { query });
export const uploadDoc = (formData) => client.post('/upload-doc', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export default client;
