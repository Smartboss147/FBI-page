import React from 'react';
import { Terminal, MessageSquare, Image as ImageIcon, FileText, Settings, ShieldCheck, UserCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'lab' | 'cases' | 'creative' | 'notes' | 'config';
  setActiveTab: (tab: 'lab' | 'cases' | 'creative' | 'notes' | 'config') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Diamond Emblem */}
        <div className="flex items-center space-x-4">
          <div className="w-9 h-9 bg-slate-900 border border-cyan-500/50 flex items-center justify-center rotate-45 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
            <div className="-rotate-45 text-cyan-400 font-black text-sm">AI</div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs tracking-[0.25em] text-slate-400 uppercase font-bold">
                CYBER INTELLIGENCE COMMAND
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-800/60 uppercase">
                NODE-01
              </span>
            </div>
            <p className="text-xs tracking-widest text-cyan-500 font-semibold font-mono">
              AI STUDIO WORKSPACE
            </p>
          </div>
        </div>

        {/* Tactical Navigation Tabs */}
        <nav className="flex items-center space-x-1 sm:space-x-2 bg-slate-900/60 p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('cases')}
            className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-mono transition-all ${
              activeTab === 'cases'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.2)] font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline uppercase tracking-wider">Client Cases</span>
          </button>

          <button
            onClick={() => setActiveTab('lab')}
            className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-mono transition-all ${
              activeTab === 'lab'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.2)] font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline uppercase tracking-wider">Prompt Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('creative')}
            className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-mono transition-all ${
              activeTab === 'creative'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.2)] font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline uppercase tracking-wider">Creative Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-mono transition-all ${
              activeTab === 'notes'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.2)] font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline uppercase tracking-wider">Notes & Snippets</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-mono transition-all ${
              activeTab === 'config'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.2)] font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline uppercase tracking-wider">Settings</span>
          </button>
        </nav>

        {/* Encrypted Status Indicator */}
        <div className="hidden lg:flex items-center space-x-2 bg-slate-900 border border-slate-700 px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] font-mono text-emerald-400 tracking-wider">
            ENCRYPTION: AES-256 ACTIVE
          </span>
        </div>
      </div>
    </header>
  );
};

