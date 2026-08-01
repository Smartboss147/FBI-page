import React, { useState } from 'react';
import { Sparkles, Sliders, Copy, Check, Palette, Crop as AspectRatioIcon, Wand2, Terminal } from 'lucide-react';

interface GeneratedCard {
  id: string;
  prompt: string;
  style: string;
  aspectRatio: string;
  imageUrl: string;
  timestamp: string;
}

const VISUAL_STYLES = [
  { id: 'cinematic', label: 'CINEMATIC MATRIX', bg: 'from-cyan-900/40 to-slate-900' },
  { id: 'cyberpunk', label: 'CYBERPUNK NEON', bg: 'from-fuchsia-900/40 to-slate-900' },
  { id: 'minimalist', label: '3D ISOMETRIC VECTOR', bg: 'from-emerald-900/40 to-slate-900' },
  { id: 'photorealistic', label: 'PHOTOREALISTIC 4K', bg: 'from-blue-900/40 to-slate-900' },
];

const ASPECT_RATIOS = ['1:1', '16:9', '9:16', '4:3'];

export const CreativeStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('A sleek futuristic quantum supercomputer core glowing with soft blue fiber optics in a dark ambient laboratory');
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [cards, setCards] = useState<GeneratedCard[]>([
    {
      id: '1',
      prompt: 'A sleek futuristic quantum supercomputer core glowing with soft blue fiber optics in a dark ambient laboratory',
      style: 'CINEMATIC MATRIX',
      aspectRatio: '16:9',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
    },
    {
      id: '2',
      prompt: 'Isometric 3D model of a cloud server infrastructure node with neon cyan glow',
      style: '3D ISOMETRIC VECTOR',
      aspectRatio: '1:1',
      imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      timestamp: '10 mins ago',
    },
  ]);

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setTimeout(() => {
      const newCard: GeneratedCard = {
        id: Date.now().toString(),
        prompt: prompt,
        style: VISUAL_STYLES.find((s) => s.id === selectedStyle)?.label || 'CUSTOM',
        aspectRatio,
        imageUrl: `https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setCards((prev) => [newCard, ...prev]);
      setIsGenerating(false);
    }, 1200);
  };

  const copyPrompt = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Tactical Banner & Control Panel */}
      <div className="bg-slate-950 border border-slate-800 p-6 relative">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-2">
          <Terminal className="w-4 h-4 text-cyan-500" />
          <span>CYBER VISUAL SYNTHESIZER MATRIX</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 tracking-wider uppercase mb-2">
          Generative Visual Assets
        </h2>
        <p className="text-xs text-slate-400 font-mono leading-relaxed mb-6">
          Synthesize high-precision visual assets and parameter vectors using Gemini 3.1 Flash Image standards.
        </p>

        {/* Input & Options */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your visual concept vector..."
              className="flex-1 bg-slate-900 border border-slate-700 p-3 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="px-6 py-3 bg-slate-900 border border-cyan-500/80 hover:bg-cyan-950/60 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 disabled:opacity-50 shrink-0"
            >
              <Wand2 className={`w-4 h-4 text-cyan-400 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'SYNTHESIZING...' : 'GENERATE ASSET'}</span>
            </button>
          </div>

          {/* Style Modifiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {VISUAL_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3 border text-left font-mono transition-all ${
                  selectedStyle === style.id
                    ? 'border-cyan-500 bg-cyan-950/60 text-cyan-300 border-l-4 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                    : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2 text-xs font-semibold">
                  <Palette className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{style.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Aspect Ratios */}
          <div className="flex items-center space-x-4 pt-2 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 font-mono flex items-center space-x-1.5 uppercase">
              <AspectRatioIcon className="w-3.5 h-3.5 text-cyan-500" />
              <span>Aspect Ratio:</span>
            </span>
            <div className="flex items-center space-x-2 font-mono">
              {ASPECT_RATIOS.map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-3 py-1 text-xs transition-all ${
                    aspectRatio === ratio
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Asset Cards Gallery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-widest">
            SYNTHESIZED ASSET DOSSIERS ({cards.length})
          </h3>
          <span className="text-[10px] font-mono text-cyan-500">FEED_ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-slate-950 border border-slate-800 hover:border-cyan-500/60 transition-all flex flex-col"
            >
              <div className="relative aspect-video bg-slate-900 overflow-hidden border-b border-slate-800">
                <img
                  src={card.imageUrl}
                  alt={card.prompt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 flex items-center space-x-1.5">
                  <span className="bg-slate-950/90 text-cyan-400 border border-cyan-500/50 px-2 py-0.5 text-[9px] font-mono uppercase">
                    {card.style}
                  </span>
                  <span className="bg-slate-950/90 text-slate-300 border border-slate-800 px-2 py-0.5 text-[9px] font-mono">
                    {card.aspectRatio}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 font-mono">
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  "{card.prompt}"
                </p>

                <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
                  <span className="text-[9px] text-slate-500">{card.timestamp}</span>
                  <button
                    onClick={() => copyPrompt(card.prompt, card.id)}
                    className="flex items-center space-x-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {copiedId === card.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[10px]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">COPY PROMPT</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
