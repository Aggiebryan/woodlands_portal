
import React, { useState } from 'react';
import { Theme } from '../types';

interface ThemeEditorProps {
  theme: Theme;
  onSave: (theme: Theme) => void;
  onClose: () => void;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({ theme, onSave, onClose }) => {
  const [edited, setEdited] = useState<Theme>({ ...theme });

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-gray-900 border-l border-gray-800 shadow-2xl z-[100] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 backdrop-blur-md">
        <div>
          <h2 className="text-lg font-black text-white uppercase tracking-wider">Page Styles</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Customization Engine</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">✕</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Background Color</label>
          <div className="flex gap-3 items-center">
            <input 
              type="color" 
              className="w-12 h-12 rounded-lg bg-transparent border-0 cursor-pointer"
              value={edited.backgroundColor}
              onChange={(e) => setEdited({ ...edited, backgroundColor: e.target.value })}
            />
            <input 
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-xs font-mono"
              value={edited.backgroundColor}
              onChange={(e) => setEdited({ ...edited, backgroundColor: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Background Image URL</label>
          <input 
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-xs"
            value={edited.backgroundImage || ''}
            onChange={(e) => setEdited({ ...edited, backgroundImage: e.target.value })}
          />
          <p className="text-[9px] text-gray-600 italic">Leave empty for solid color background.</p>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Heading Text Color</label>
          <div className="flex gap-3 items-center">
            <input 
              type="color" 
              className="w-12 h-12 rounded-lg bg-transparent border-0 cursor-pointer"
              value={edited.headingColor}
              onChange={(e) => setEdited({ ...edited, headingColor: e.target.value })}
            />
            <input 
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-xs font-mono"
              value={edited.headingColor}
              onChange={(e) => setEdited({ ...edited, headingColor: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Accent Color (Gold/Action)</label>
          <div className="flex gap-3 items-center">
            <input 
              type="color" 
              className="w-12 h-12 rounded-lg bg-transparent border-0 cursor-pointer"
              value={edited.accentColor}
              onChange={(e) => setEdited({ ...edited, accentColor: e.target.value })}
            />
            <input 
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-xs font-mono"
              value={edited.accentColor}
              onChange={(e) => setEdited({ ...edited, accentColor: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Glass Panel Opacity ({Math.round(edited.glassOpacity * 100)}%)</label>
          <input 
            type="range" min="0" max="1" step="0.05"
            className="w-full accent-yellow-600"
            value={edited.glassOpacity}
            onChange={(e) => setEdited({ ...edited, glassOpacity: parseFloat(e.target.value) })}
          />
        </div>
      </div>

      <div className="p-6 border-t border-gray-800 space-y-3">
        <button 
          onClick={() => onSave(edited)}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-black py-3 rounded-xl shadow-xl shadow-yellow-900/20 active:scale-95 transition-all text-xs uppercase tracking-widest"
        >
          Apply Theme
        </button>
        <button 
          onClick={onClose}
          className="w-full text-gray-500 hover:text-white py-2 text-xs font-bold uppercase tracking-widest transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ThemeEditor;
