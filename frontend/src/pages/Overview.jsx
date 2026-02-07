import React from 'react';
import { Server, Cpu, Search, Activity, Cloud } from 'lucide-react';

const Card = ({ icon, title, description, tags }) => (
    <div className="card h-full flex flex-col">
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 mb-6 flex-1">{description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-white/5 rounded text-xs text-slate-300 border border-white/5">{tag}</span>
            ))}
        </div>
    </div>
);

const Overview = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">System Architecture</h2>
                <p className="text-slate-400">RAGentix: High-performance retrieval-augmented generation with multi-agent orchestration.</p>
            </header>

            {/* Visual Flow */}
            <div className="bg-primary/30 border border-slate-700/50 rounded-2xl p-8 mb-12 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none"></div>

                <div className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-accent group-hover:text-accent transition-all">
                        <Server size={32} />
                    </div>
                    <span className="text-sm font-medium">User API</span>
                </div>

                <div className="h-0.5 w-12 bg-slate-700 hidden md:block"></div>

                <div className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-accent group-hover:text-accent transition-all">
                        <Search size={32} />
                    </div>
                    <span className="text-sm font-medium">RAG Pipeline</span>
                </div>

                <div className="h-0.5 w-12 bg-slate-700 hidden md:block"></div>

                <div className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-accent group-hover:text-accent transition-all">
                        <Cpu size={32} />
                    </div>
                    <span className="text-sm font-medium">LangGraph Agents</span>
                </div>

                <div className="h-0.5 w-12 bg-slate-700 hidden md:block"></div>

                <div className="flex flex-col items-center gap-2 group">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-accent group-hover:text-accent transition-all">
                        <Activity size={32} />
                    </div>
                    <span className="text-sm font-medium">Evaluation</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card
                    icon={<Search size={24} />}
                    title="RAG Pipeline"
                    description="Vector-based knowledge retrieval with semantic chunks and MMR re-ranking."
                    tags={['Qdrant', 'OpenAI', 'LangChain']}
                />
                <Card
                    icon={<Cpu size={24} />}
                    title="Agent System"
                    description="Stateful multi-agent orchestration for complex reasoning and tool usage."
                    tags={['LangGraph', 'Python']}
                />
                <Card
                    icon={<Activity size={24} />}
                    title="Evaluation"
                    description="Automated scoring of relevance, faithfulness, and system confidence."
                    tags={['Numpy', 'NLP Metrics']}
                />
                <Card
                    icon={<Cloud size={24} />}
                    title="Cloud Ready"
                    description="Production-grade containerization ready for AWS/GCP deployments."
                    tags={['Docker', 'Redis', 'Postgres']}
                />
            </div>
        </div>
    );
};

export default Overview;
