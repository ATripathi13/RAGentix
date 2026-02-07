import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, BookOpen, GitBranch, BarChart3, Binary } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { to: "/", icon: <LayoutDashboard size={20} />, label: "Overview" },
        { to: "/ask", icon: <MessageSquare size={20} />, label: "Ask Agent" },
        { to: "/rag", icon: <BookOpen size={20} />, label: "RAG Retrieval" },
        { to: "/workflow", icon: <GitBranch size={20} />, label: "Workflow" },
        { to: "/evaluation", icon: <BarChart3 size={20} />, label: "Evaluation" },
    ];

    return (
        <aside className="w-64 bg-primary border-r border-slate-700/50 flex flex-col h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
                <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-primary font-bold">R</div>
                <h1 className="text-xl font-bold text-white tracking-tight">RAGentix</h1>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-accent/10 text-accent"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                            }`
                        }
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-700/50">
                <div className="flex items-center gap-3 text-sm text-slate-500 px-4 py-2">
                    <Binary size={16} />
                    <span>v1.0.0-prod</span>
                </div>
            </div>
        </aside>
    );
};

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-dark-bg">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
