import { create } from 'zustand';

const useStore = create((set) => ({
    query: '',
    answer: '',
    metadata: null,
    loading: false,
    error: null,
    history: [],
    settings: {
        openai_api_key: '',
        qdrant_url: '',
        qdrant_api_key: '',
    },

    setQuery: (query) => set({ query }),
    setSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
    setResult: (answer, metadata) => set({
        answer,
        metadata,
        loading: false,
        history: (state) => [{ query: state.query, answer, metadata, timestamp: new Date() }, ...state.history]
    }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error, loading: false }),
}));

export default useStore;
