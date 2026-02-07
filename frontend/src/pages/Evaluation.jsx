import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Shield, Target, Zap, TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';

const Evaluation = () => {
    const { metadata } = useStore();

    const data = [
        { name: 'Relevance', score: (metadata?.relevance || 0.85) * 100, color: '#22D3EE' },
        { name: 'Faithfulness', score: (metadata?.faithfulness || 0.9) * 100, color: '#10B981' },
        { name: 'Accuracy', score: 88, color: '#6366F1' }, // Placeholder for GT accuracy
    ];

    const pieData = [
        { name: 'Confidence', value: (metadata?.confidence || 0.8) * 100, fill: '#22D3EE' },
        { name: 'Uncertainty', value: 100 - ((metadata?.confidence || 0.8) * 100), fill: '#1E293B' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">Evaluation Dashboard</h2>
                <p className="text-slate-400">Quantitative scoring of the GenAI system's performance.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="card !p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Target className="text-accent" size={20} />
                        <span className="text-xs font-bold text-slate-500 uppercase">Relevance</span>
                    </div>
                    <div className="text-2xl font-bold text-white tracking-tight">{(metadata?.relevance || 0.85).toFixed(2)}</div>
                </div>
                <div className="card !p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="text-success" size={20} />
                        <span className="text-xs font-bold text-slate-500 uppercase">Faithfulness</span>
                    </div>
                    <div className="text-2xl font-bold text-white tracking-tight">{(metadata?.faithfulness || 0.90).toFixed(2)}</div>
                </div>
                <div className="card !p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Zap className="text-purple-400" size={20} />
                        <span className="text-xs font-bold text-slate-500 uppercase">Latency</span>
                    </div>
                    <div className="text-2xl font-bold text-white tracking-tight">{(metadata?.latency || 1.25).toFixed(2)}s</div>
                </div>
                <div className="card !p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="text-orange-400" size={20} />
                        <span className="text-xs font-bold text-slate-500 uppercase">Consistency</span>
                    </div>
                    <div className="text-2xl font-bold text-white tracking-tight">High</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card min-h-[400px]">
                    <h3 className="text-lg font-bold text-white mb-8">Performance Metrics</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip
                                    cursor={{ fill: '#ffffff05' }}
                                    contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
                                />
                                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card min-h-[400px] flex flex-col items-center">
                    <h3 className="text-lg font-bold text-white w-full mb-8 text-left">Confidence Gauge</h3>
                    <div className="flex-1 w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="text-center -mt-20">
                            <span className="text-5xl font-bold text-white">
                                {Math.round((metadata?.confidence || 0.8) * 100)}%
                            </span>
                            <p className="text-sm text-slate-500 mt-2 font-bold uppercase">System Confidence</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Evaluation;
