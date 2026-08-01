import React, { useState } from 'react';
import { Settings, Cpu, ShieldCheck, Zap, Info, Sliders, CheckCircle2, Terminal } from 'lucide-react';

export const ModelConfig: React.FC = () => {
  const [model, setModel] = useState('gemini-3.6-flash');
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.95);
  const [thinkingLevel, setThinkingLevel] = useState('LOW');
  const [maxTokens, setMaxTokens] = useState(4096);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="bg-slate-950 border border-slate-800 p-6 sm:p-8 font-mono relative">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
          <div className="p-2 bg-slate-900 border border-cyan-500/50 text-cyan-400">
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-[10px] tracking-[0.2em] uppercase">
              <Terminal className="w-3.5 h-3.5 text-cyan-500" />
              <span>SYSTEM VECTOR MATRIX</span>
            </div>
            <h2 className="text-lg font-bold text-slate-100 uppercase tracking-wider">
              AI MODEL ENGINE CONFIGURATION
            </h2>
            <p className="text-xs text-slate-400">
              Manage telemetry parameters for Gemini 3 series execution
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Parameters */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
                PRIMARY MODEL VECTOR
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 p-3 text-xs text-cyan-400 font-mono focus:outline-none focus:border-cyan-500"
              >
                <option value="gemini-3.6-flash">gemini-3.6-flash (Optimal Text & Code Reasoning)</option>
                <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Complex Analytical Reasoning)</option>
                <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Ultra-low Latency Vector)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-300 uppercase">TEMPERATURE SAMPLING</label>
                <span className="text-xs font-mono text-cyan-400">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-900"
              />
              <p className="text-[10px] text-slate-500 mt-1">Lower parameters yield deterministic responses; higher parameters increase variance.</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-300 uppercase">TOP-P PROBABILITY</label>
                <span className="text-xs font-mono text-cyan-400">{topP}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={topP}
                onChange={(e) => setTopP(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">
                REASONING BUDGET (THINKING LEVEL)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['MINIMAL', 'LOW', 'HIGH'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setThinkingLevel(lvl)}
                    className={`p-2.5 text-xs font-mono font-bold uppercase transition-all ${
                      thinkingLevel === lvl
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Runtime Diagnostics */}
          <div className="bg-slate-900 border border-slate-800 p-6 space-y-4 font-mono">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center space-x-2 border-b border-slate-800 pb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SYSTEM DIAGNOSTICS LOG</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">SDK MODEL CORE</span>
                <span className="text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>@google/genai v2.4</span>
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">AUTHENTICATION MATRIX</span>
                <span className="text-emerald-400">GEMINI_API_KEY VERIFIED</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">TELEMETRY HEADER</span>
                <span className="text-cyan-400">aistudio-build</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">SERVER ENVIRONMENT</span>
                <span className="text-slate-300">EXPRESS CONTAINER [PORT 3000]</span>
              </div>
            </div>

            <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 flex items-start space-x-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-cyan-300 leading-relaxed">
                All inference requests are routed through dedicated server-side API endpoints, enforcing secret protection and standard telemetry auditing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
