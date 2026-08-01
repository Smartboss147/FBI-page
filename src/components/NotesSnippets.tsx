import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Copy, Check, Search, Tag, FileCode, Edit3, Bookmark } from 'lucide-react';

interface NoteItem {
  id: string;
  title: string;
  content: string;
  tag: 'Snippet' | 'Prompt' | 'Architecture' | 'General';
  updatedAt: string;
}

const DEFAULT_NOTES: NoteItem[] = [
  {
    id: 'note-1',
    title: '@google/genai Express Server Route',
    content: `import { GoogleGenAI } from '@google/genai';\n\nconst ai = new GoogleGenAI({\n  apiKey: process.env.GEMINI_API_KEY,\n  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }\n});\n\napp.post('/api/gemini/generate', async (req, res) => {\n  const response = await ai.models.generateContent({\n    model: 'gemini-3.6-flash',\n    contents: req.body.prompt\n  });\n  res.json({ text: response.text });\n});`,
    tag: 'Snippet',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'note-2',
    title: 'System Instruction for Code Auditing',
    content: `You are a Principal Security Auditor. Analyze code blocks for timing attacks, prototype pollution, memory leaks, and input sanitization vulnerabilities. Output findings in a structured Markdown table with severity levels (Critical, High, Medium, Low).`,
    tag: 'Prompt',
    updatedAt: new Date().toLocaleDateString(),
  },
];

export const NotesSnippets: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('ai_studio_notes');
    return saved ? JSON.parse(saved) : DEFAULT_NOTES;
  });

  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('ai_studio_notes', JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleCreateNote = () => {
    const newNote: NoteItem = {
      id: Date.now().toString(),
      title: 'Untitled Snippet',
      content: '// Enter note content or code snippet here...\n',
      tag: 'Snippet',
      updatedAt: new Date().toLocaleDateString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateActiveNote = (field: keyof NoteItem, value: string) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNoteId
          ? { ...n, [field]: value, updatedAt: new Date().toLocaleDateString() }
          : n
      )
    );
  };

  const handleDeleteNote = (id: string) => {
    const filtered = notes.filter((n) => n.id !== id);
    setNotes(filtered);
    if (activeNoteId === id && filtered.length > 0) {
      setActiveNoteId(filtered[0].id);
    }
  };

  const copyNoteContent = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left List Pane */}
      <div className="lg:col-span-1 bg-slate-950 border border-slate-800 p-4 flex flex-col h-[650px]">
        {/* Header & Search */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-widest flex items-center space-x-1.5">
              <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
              <span>SAVED CODE DOSSIERS</span>
            </h3>
            <button
              onClick={handleCreateNote}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/80 transition-all flex items-center space-x-1 text-xs font-mono font-bold uppercase"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>NEW</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dossier index..."
              className="w-full bg-slate-900 border border-slate-700 font-mono pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Note List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`p-3 border text-left cursor-pointer transition-all font-mono ${
                activeNoteId === note.id
                  ? 'bg-cyan-950/60 border-cyan-500 border-l-4 text-cyan-200'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-slate-200 line-clamp-1">
                  {note.title || 'Untitled Dossier'}
                </span>
                <span className="text-[9px] bg-slate-900 text-cyan-400 border border-slate-800 px-1.5 py-0.5">
                  {note.tag}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 line-clamp-2">
                {note.content}
              </p>
            </div>
          ))}
          {filteredNotes.length === 0 && (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">No dossiers match query vector.</div>
          )}
        </div>
      </div>

      {/* Editor Pane */}
      <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-6 flex flex-col h-[650px]">
        {activeNote ? (
          <div className="flex-1 flex flex-col space-y-4 font-mono">
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => handleUpdateActiveNote('title', e.target.value)}
                placeholder="Dossier Title..."
                className="bg-transparent text-sm sm:text-base font-bold text-slate-100 focus:outline-none focus:border-cyan-500 border-b border-transparent w-full max-w-md font-mono"
              />

              <div className="flex items-center space-x-2">
                <select
                  value={activeNote.tag}
                  onChange={(e) =>
                    handleUpdateActiveNote('tag', e.target.value as NoteItem['tag'])
                  }
                  className="bg-slate-900 border border-slate-700 text-cyan-400 text-xs px-2.5 py-1 focus:outline-none font-mono"
                >
                  <option value="Snippet">Snippet</option>
                  <option value="Prompt">Prompt</option>
                  <option value="Architecture">Architecture</option>
                  <option value="General">General</option>
                </select>

                <button
                  onClick={() => copyNoteContent(activeNote.content, activeNote.id)}
                  className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 border border-slate-800 transition-colors"
                  title="Copy content"
                >
                  {copiedId === activeNote.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => handleDeleteNote(activeNote.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-900 border border-slate-800 transition-colors"
                  title="Delete dossier"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <textarea
              value={activeNote.content}
              onChange={(e) => handleUpdateActiveNote('content', e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 p-4 text-xs sm:text-sm font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
              placeholder="Write markdown specs, TypeScript vectors, or prompt engineering directives..."
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 text-xs font-mono">
            Select or create a dossier to edit.
          </div>
        )}
      </div>
    </div>
  );
};
