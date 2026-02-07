import React, { useState } from 'react';
import { Upload, FileText, Search, Database, ChevronRight, Check } from 'lucide-react';
import { uploadDoc } from '../api/client';

const RAGViewer = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const resp = await uploadDoc(formData);
            setResult(resp.data);
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">RAG Retrieval Viewer</h2>
                <p className="text-slate-400">Manage knowledge ingestion and visualize data retrieval.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Ingestion Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="card">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Upload size={18} /> Ingest Knowledge
                        </h3>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-accent transition-colors cursor-pointer group">
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <label htmlFor="file-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                                    <FileText className="text-slate-500 group-hover:text-accent mb-4 transition-colors" size={40} />
                                    <p className="text-sm text-slate-400">{file ? file.name : "Select PDF or Text file"}</p>
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={!file || uploading}
                                className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                                {uploading ? "Ingesting..." : "Process Document"}
                            </button>
                        </form>

                        {result && (
                            <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center gap-3 text-success">
                                <Check size={18} />
                                <span className="text-sm font-medium">Successfully added {result.chunks_added} chunks.</span>
                            </div>
                        )}
                    </div>

                    <div className="card">
                        <h3 className="text-lg font-bold text-white mb-2">Vector DB Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">Provider</span>
                                <span className="text-slate-200">Qdrant</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">Embedding Model</span>
                                <span className="text-slate-200">text-embedding-3-large</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 font-medium">Collection</span>
                                <span className="text-slate-200">genai_docs</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Retrieval Visualization Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card min-h-[400px]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Database size={18} /> Retrieval Playground
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono bg-white/5 px-2 py-1 rounded">
                                k=5 | MMR enabled
                            </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-xl border border-slate-700/30 p-12 flex flex-col items-center justify-center text-center italic text-slate-500">
                            <Search size={48} className="mb-4 opacity-20" />
                            <p>Run a query in "Ask Agent" to see retrieved contexts and their relevance scores here.</p>
                            <p className="text-xs mt-2 not-italic">(In production, this would track real-time retrieval logs)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RAGViewer;
