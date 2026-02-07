import { create } from 'zustand';

const useStore = create((set) => ({
    query: '',
    answer: '',
    metadata: null,
    loading: false,
    error: null,
    history: [],

    setQuery: (query) => set({ query }),
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
