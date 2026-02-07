import React, { useState } from 'react';
import { Send, Loader2, Info, Clock, CheckCircle } from 'lucide-react';
import useStore from '../store/useStore';
import { askAgent } from '../api/client';

const AskAgent = () => {
    const { query, setQuery, loading, setLoading, setResult, setError, answer, metadata } = useStore();
    const [input, setInput] = useState(query);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        setQuery(input);
        setLoading(true);
        try {
            const response = await askAgent(input);
            setResult(response.data.answer, response.data.metadata);
        } catch (err) {
            setError(err.message || "Failed to get answer from agent.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Ask the Agent</h2>
                <p className="text-slate-400">Interact with the multi-agent system and observe reasoning.</p>
            </header>

            <form onSubmit={handleSubmit} className="mb-8 p-1 glass rounded-2xl flex items-center pr-3 focus-within:ring-2 ring-accent/30 transition-all">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question about your knowledge base..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-lg px-6 py-4 text-white"
                />
                <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="btn-primary flex items-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    {loading ? "Processing..." : "Submit"}
                </button>
            </form>

            {answer && !loading && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="card">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Info size={14} /> Agent Response
                        </h3>
                        <div className="text-xl text-slate-100 leading-relaxed whitespace-pre-wrap">
                            {answer}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="card !p-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent text-xl font-bold">
                                {Math.round((metadata?.confidence || 0) * 100)}%
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Confidence</p>
                                <p className="text-sm text-slate-200">System reliability</p>
                            </div>
                        </div>

                        <div className="card !p-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                                <Clock size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Latency</p>
                                <p className="text-sm text-slate-200">{metadata?.latency?.toFixed(2)}s total time</p>
                            </div>
                        </div>

                        <div className="card !p-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center text-success">
                                <CheckCircle size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-bold uppercase">Status</p>
                                <p className="text-sm text-slate-200">Analysis complete</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AskAgent;
