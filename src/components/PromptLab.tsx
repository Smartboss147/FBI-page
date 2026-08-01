import React, { useState } from 'react';
import { Send, Copy, Check, Terminal, Code2, Bot, User, Sliders, RefreshCw, Zap, Lightbulb, ShieldAlert } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  tokens?: number;
  thinkingTime?: string;
}

const PRESET_TEMPLATES = [
  {
    title: 'Code Refactor',
    icon: Code2,
    prompt: 'Refactor this TypeScript function for optimal readability, performance, and explicit type safety.',
    system: 'You are an expert Principal Software Architect specializing in TypeScript, clean code principles, and performance optimization.',
  },
  {
    title: 'System Architect',
    icon: Terminal,
    prompt: 'Design a high-scalability backend schema and architecture diagram for a real-time collaborative workspace.',
    system: 'You are a Cloud Infrastructure Lead. Provide clean markdown, database choices, and system data flow.',
  },
  {
    title: 'Algorithm Solver',
    icon: Zap,
    prompt: 'Analyze the time and space complexity of this algorithm and suggest an optimized solution with line-by-line explanation.',
    system: 'You are a Data Structures & Algorithms professor. Focus on Big O analysis, edge cases, and elegant code.',
  },
  {
    title: 'Content Summarizer',
    icon: Lightbulb,
    prompt: 'Summarize the following technical specs into concise bullet points highlighting key parameters, security rules, and performance metrics.',
    system: 'You are a Technical Writer specializing in executive summaries and API documentation.',
  },
];

export const PromptLab: React.FC = () => {
  const [systemPrompt, setSystemPrompt] = useState('You are a tactical AI assistant powered by Gemini 3.6 Flash.');
  const [inputPrompt, setInputPrompt] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: 'INTERACTIVE SURVEILLANCE MATRIX ACTIVE.\nSelect a quick preset or transmit a custom prompt vector to launch execution.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tokens: 24,
      thinkingTime: '0.08s',
    },
  ]);

  const handleSend = () => {
    if (!inputPrompt.trim() || isGenerating) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsGenerating(true);

    setTimeout(() => {
      let responseText = '';
      const promptLower = userMsg.content.toLowerCase();

      if (promptLower.includes('refactor') || promptLower.includes('code') || promptLower.includes('typescript')) {
        responseText = `[SYS_EXECUTION_COMPLETE]\n\n\`\`\`typescript\ninterface CacheOptions<T> {\n  ttlMs: number;\n  onEvict?: (key: string, value: T) => void;\n}\n\nexport class ConcurrentLRUCache<K extends string, V> {\n  private cache = new Map<K, { value: V; expiresAt: number }>();\n\n  constructor(private readonly options: CacheOptions<V>) {}\n\n  public get(key: K): V | undefined {\n    const entry = this.cache.get(key);\n    if (!entry) return undefined;\n    if (Date.now() > entry.expiresAt) {\n      this.cache.delete(key);\n      this.options.onEvict?.(key, entry.value);\n      return undefined;\n    }\n    return entry.value;\n  }\n}\n\`\`\`\n\n### ANALYSIS REPORT:\n- **O(1) Access**: Uses Map key ordering for LRU eviction.\n- **Strict Typing**: Generics ensure end-to-end type safety.\n- **TTL Expiry**: Prevents memory leaks automatically.`;
      } else if (promptLower.includes('architect') || promptLower.includes('system') || promptLower.includes('backend')) {
        responseText = `### RECOMMENDED ARCHITECTURE MATRIX\n\n1. **API Gateway**: Nginx Reverse Proxy with TLS termination.\n2. **Application Layer**: Node.js microservices running in Cloud Run container clusters.\n3. **Persistence Layer**: Firestore for real-time state sync + Cloud SQL PostgreSQL for relational integrity.\n4. **Caching Layer**: Redis cluster handling user sessions and rate-limiting counters.`;
      } else {
        responseText = `[PROCESSED UNDER INSTRUCTION: "${systemPrompt}"]\n\n- **Model Engine**: Gemini 3.6 Flash\n- **Latency**: 240ms\n- **Status**: Packet intercept layer established. Decryption verified.\n\nAll parameters validated across Node-01.`;
      }

      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tokens: Math.floor(responseText.length / 4),
        thinkingTime: '0.24s',
      };

      setMessages((prev) => [...prev, modelMsg]);
      setIsGenerating(false);
    }, 800);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const applyTemplate = (template: typeof PRESET_TEMPLATES[0]) => {
    setSystemPrompt(template.system);
    setInputPrompt(template.prompt);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Left Sidebar: Controls & Presets */}
      <div className="lg:col-span-1 space-y-6">
        {/* System Prompt Tuning */}
        <div className="bg-slate-950 border border-slate-800 p-4 relative">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
              <Sliders className="w-3.5 h-3.5" />
              <span>System Directive</span>
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase">SYS_INSTRUCT</span>
          </div>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full h-24 bg-slate-900/80 border border-slate-700/80 p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
            placeholder="Define system level parameters..."
          />
        </div>

        {/* Priority Issues & Presets */}
        <div className="bg-slate-950 border border-slate-800 p-4 space-y-3">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-between">
            <span>Tactical Presets</span>
            <span className="text-[9px] font-mono text-cyan-500">READY</span>
          </h3>

          <div className="space-y-2.5">
            {PRESET_TEMPLATES.map((tpl, i) => {
              const Icon = tpl.icon;
              return (
                <button
                  key={i}
                  onClick={() => applyTemplate(tpl)}
                  className="w-full text-left p-3 border-l-2 border-cyan-500 bg-slate-900/50 hover:bg-slate-900 hover:border-cyan-400 transition-all group"
                >
                  <div className="flex items-center space-x-2 text-slate-200 group-hover:text-cyan-400 font-mono text-xs font-semibold">
                    <Icon className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{tpl.title}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono line-clamp-1 mt-1">
                    {tpl.prompt}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Investigation Progress Card */}
        <div className="bg-slate-950 border border-slate-800 p-4 space-y-2">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Surveillance Capacity
          </h3>
          <div className="h-2 w-full bg-slate-900 border border-slate-800 relative">
            <div className="absolute h-full bg-cyan-500 w-[78%] shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] font-mono text-slate-500">PACKET BUFFER</span>
            <span className="text-[9px] font-mono text-cyan-400 font-bold">78% SYNCED</span>
          </div>
        </div>
      </div>

      {/* Main Terminal Chat Interface */}
      <div className="lg:col-span-3 flex flex-col h-[680px] bg-slate-950 border border-slate-800">
        {/* Terminal Header Bar */}
        <div className="h-10 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
              Real-Time Interactive Execution Matrix
            </span>
          </div>
          <button
            onClick={() => setMessages([])}
            className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <RefreshCw className="w-3 h-3 text-cyan-500" />
            <span>RESET STREAM</span>
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-mono">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              <div className="flex items-center space-x-2 text-[10px] text-slate-500">
                <span className="text-slate-600">[{msg.timestamp}]</span>
                <span className={msg.role === 'user' ? 'text-cyan-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {msg.role === 'user' ? 'OPERATOR_CMD:' : 'GEMINI_RESPONSE:'}
                </span>
                {msg.tokens && (
                  <span className="text-[9px] bg-slate-900 text-slate-400 border border-slate-800 px-1.5 py-0.2">
                    {msg.tokens} TOKENS ({msg.thinkingTime})
                  </span>
                )}
              </div>

              <div
                className={`p-3 text-xs leading-relaxed border ${
                  msg.role === 'user'
                    ? 'bg-slate-900/80 border-cyan-500/40 text-cyan-200 border-l-2 border-l-cyan-400'
                    : 'bg-slate-900/30 border-slate-800 text-slate-300 whitespace-pre-wrap'
                }`}
              >
                {msg.content}
              </div>

              {msg.role === 'model' && (
                <div className="flex justify-end pt-0.5">
                  <button
                    onClick={() => copyToClipboard(msg.content, msg.id)}
                    className="flex items-center space-x-1 text-[10px] text-slate-500 hover:text-cyan-400 transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">COPIED TO BUFFER</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY OUTPUT</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}

          {isGenerating && (
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 py-2">
              <div className="w-2 h-4 bg-cyan-500 animate-pulse" />
              <span className="animate-pulse">PROCESSING PACKET INTERCEPT...</span>
            </div>
          )}
        </div>

        {/* Tactical Input Footer */}
        <div className="border-t border-slate-800 p-3 bg-slate-950">
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-[10px] font-mono text-cyan-500 italic">root@aistudio-cmd:~#</span>
            <div className="w-1.5 h-3 bg-cyan-500" />
          </div>
          <div className="flex items-center space-x-2">
            <textarea
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={2}
              placeholder="Enter encrypted command vector... (Shift+Enter for newline)"
              className="flex-1 bg-slate-900 border border-slate-700 p-2.5 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
            />
            <button
              onClick={handleSend}
              disabled={isGenerating || !inputPrompt.trim()}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider border border-slate-600 hover:border-cyan-500 transition-all flex items-center space-x-1 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>EXEC</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

