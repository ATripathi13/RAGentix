import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Key, Database, Globe, CheckCircle } from 'lucide-react';
import useStore from '../store/useStore';

const Settings = () => {
    const { settings, setSettings } = useStore();
    const [formData, setFormData] = useState(settings);
    const [saved, setSaved] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSettings(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
                <p className="text-slate-400">Configure your personal API keys and database credentials. These are stored locally in your browser.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="card">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Key size={18} className="text-accent" /> LLM Configuration
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">OpenAI API Key</label>
                            <input
                                type="password"
                                value={formData.openai_api_key}
                                onChange={(e) => setFormData({ ...formData, openai_api_key: e.target.value })}
                                placeholder="sk-..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-accent focus:border-accent"
                            />
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Database size={18} className="text-accent" /> Vector Database (Qdrant)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Qdrant URL</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-3 text-slate-500" size={16} />
                                <input
                                    type="text"
                                    value={formData.qdrant_url}
                                    onChange={(e) => setFormData({ ...formData, qdrant_url: e.target.value })}
                                    placeholder="https://your-qdrant-cluster.com"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-accent focus:border-accent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Qdrant API Key</label>
                            <input
                                type="password"
                                value={formData.qdrant_api_key}
                                onChange={(e) => setFormData({ ...formData, qdrant_api_key: e.target.value })}
                                placeholder="Optional for local development"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-accent focus:border-accent"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button type="submit" className="btn-primary flex items-center gap-2 px-8">
                        <Save size={18} /> Save Configuration
                    </button>
                    {saved && (
                        <div className="flex items-center gap-2 text-success animate-in fade-in duration-300">
                            <CheckCircle size={18} />
                            <span className="text-sm font-medium">Settings saved successfully!</span>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Settings;
