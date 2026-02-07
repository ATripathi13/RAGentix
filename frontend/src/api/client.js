import axios from 'axios';
import useStore from '../store/useStore';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use((config) => {
    const settings = useStore.getState().settings;
    if (settings.openai_api_key) config.headers['X-OpenAI-API-Key'] = settings.openai_api_key;
    if (settings.qdrant_url) config.headers['X-Qdrant-URL'] = settings.qdrant_url;
    if (settings.qdrant_api_key) config.headers['X-Qdrant-API-Key'] = settings.qdrant_api_key;
    return config;
});

export const askAgent = (query) => client.post('/ask', { query });
export const uploadDoc = (formData) => client.post('/upload-doc', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export default client;
