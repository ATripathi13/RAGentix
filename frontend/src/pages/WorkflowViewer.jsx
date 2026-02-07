import React from 'react';
import { GitBranch, User, Search, MessageSquare, ArrowRight, Activity } from 'lucide-react';

const Step = ({ agent, action, status, isLast }) => (
    <div className="flex gap-6 relative">
        {!isLast && <div className="absolute left-[27px] top-[50px] bottom-0 w-0.5 bg-slate-700/50"></div>}

        <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 shrink-0 z-10 ${status === 'complete' ? 'bg-accent/10 border-accent text-accent' : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}>
            {agent === 'Retriever' ? <Search size={24} /> :
                agent === 'Analyzer' ? <Activity size={24} /> :
                    agent === 'Answer Agent' ? <MessageSquare size={24} /> : <User size={24} />}
        </div>

        <div className="py-2 flex-1">
            <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-white">{agent}</h4>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${status === 'complete' ? 'bg-success/5 border-success/20 text-success' : 'bg-white/5 border-slate-700 text-slate-500'
                    }`}>
                    {status}
                </span>
            </div>
            <p className="text-sm text-slate-400">{action}</p>
        </div>
    </div>
);

const WorkflowViewer = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <header className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">Agent Workflow Viewer</h2>
                <p className="text-slate-400">Step-by-step trace of the orchestrator's reasoning process.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-12">
                    <div className="card">
                        <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                            <GitBranch size={18} /> Execution Trace
                        </h3>

                        <div className="space-y-0">
                            <Step
                                agent="Retriever"
                                action="Scanning vector store for relevant knowledge based on user query."
                                status="complete"
                            />
                            <Step
                                agent="Analyzer"
                                action="Verifying if retrieved context is sufficient for an accurate answer."
                                status="complete"
                            />
                            <Step
                                agent="Answer Agent"
                                action="Synthesizing final response based on validated context."
                                status="complete"
                                isLast
                            />
                        </div>
                    </div>

                    <div className="card border-accent/20 bg-accent/5">
                        <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                            Logic Control
                        </h3>
                        <p className="text-slate-300 text-sm italic">
                            "The orchestrator used a conditional edge to decide between re-retrieval or generation. Initial analysis suggested enough context was found."
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card">
                        <h3 className="text-lg font-bold text-white mb-4">Graph Topology</h3>
                        <div className="aspect-square bg-slate-900/50 rounded-xl border border-slate-700/30 p-6 flex items-center justify-center">
                            {/* Simple Mermaid-like visualization with CSS */}
                            <div className="flex flex-col items-center gap-6">
                                <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded shadow-lg text-sm text-slate-200">Start</div>
                                <ArrowRight className="rotate-90 text-slate-700" size={16} />
                                <div className="px-4 py-2 bg-accent/20 border border-accent/50 rounded shadow-lg text-sm text-accent font-bold">Retriever</div>
                                <ArrowRight className="rotate-90 text-slate-700" size={16} />
                                <div className="px-4 py-2 bg-accent/20 border border-accent/50 rounded shadow-lg text-sm text-accent font-bold">Analyzer</div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-0.5 bg-slate-700"></div>
                                    <div className="text-[10px] text-slate-500 font-mono">Loop if needed</div>
                                    <div className="w-10 h-0.5 bg-slate-700"></div>
                                </div>
                                <ArrowRight className="rotate-90 text-slate-700" size={16} />
                                <div className="px-4 py-2 bg-accent/20 border border-accent/50 rounded shadow-lg text-sm text-accent font-bold">Answer Agent</div>
                                <ArrowRight className="rotate-90 text-slate-700" size={16} />
                                <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded shadow-lg text-sm text-slate-200">End</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkflowViewer;
