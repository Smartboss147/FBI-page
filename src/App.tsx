/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { PromptLab } from './components/PromptLab';
import { CreativeStudio } from './components/CreativeStudio';
import { NotesSnippets } from './components/NotesSnippets';
import { ModelConfig } from './components/ModelConfig';
import { ClientCaseManagement } from './components/ClientCaseManagement';

export default function App() {
  const [activeTab, setActiveTab] = useState<'cases' | 'lab' | 'creative' | 'notes' | 'config'>('cases');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Global Navigation Bar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Primary Workspace View */}
      <main className="flex-1">
        {activeTab === 'cases' && <ClientCaseManagement />}
        {activeTab === 'lab' && <PromptLab />}
        {activeTab === 'creative' && <CreativeStudio />}
        {activeTab === 'notes' && <NotesSnippets />}
        {activeTab === 'config' && <ModelConfig />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 font-mono">
          AI Studio Workspace • Powered by Gemini 3.6 Flash & @google/genai SDK
        </div>
      </footer>
    </div>
  );
}
