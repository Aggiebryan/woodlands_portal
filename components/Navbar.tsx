
import React, { useState } from 'react';
import { Page } from '../types';
import { supabase } from '../lib/supabase';

interface NavbarProps {
  pages: Page[];
  activePageId: string;
  onPageChange: (id: string) => void;
  onAddPage: (name: string) => void;
  onDeletePage: (id: string) => void;
  user: any;
  onToggleThemeEditor: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ pages, activePageId, onPageChange, onAddPage, onDeletePage, user, onToggleThemeEditor }) => {
  const [showAddPage, setShowAddPage] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const firmPages = pages.filter(p => p.type === 'firm');
  const personalPages = pages.filter(p => p.type === 'personal');

  return (
    <nav className="glass-panel sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between border-b border-white/5 shadow-2xl">
      <div className="flex items-center gap-5">
        <div className="group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center font-black text-white shadow-lg shadow-yellow-900/20 group-hover:scale-105 transition-transform overflow-hidden p-2">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
              <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
              <path d="M12 3l10 9h-3v8h-6v-6h-2v6H5v-8H2l10-9z" fillOpacity="0.3"/>
            </svg>
          </div>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-black text-xl text-white uppercase tracking-tighter">The Woodlands Law Firm</span>
          <span className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.4em] opacity-80">Dashboard</span>
        </div>
      </div>

      <div className="flex-1 max-w-4xl px-8 flex items-center gap-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 border-r border-white/10 pr-4 mr-4">
          {firmPages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange(page.id)}
              className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                activePageId === page.id 
                  ? 'bg-yellow-600 border-yellow-600 text-white shadow-xl shadow-yellow-900/30' 
                  : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-400'
              }`}
            >
              🏢 {page.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {personalPages.map((page) => (
            <div key={page.id} className="group relative flex items-center">
              <button
                onClick={() => onPageChange(page.id)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activePageId === page.id 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-900/30' 
                    : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-500'
                }`}
              >
                {page.name}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDeletePage(page.id); }}
                className="absolute -top-1.5 -right-1.5 hidden group-hover:flex w-5 h-5 bg-red-600 hover:bg-red-700 rounded-full items-center justify-center text-[8px] font-bold text-white shadow-lg transition-colors"
              >
                ✕
              </button>
            </div>
          ))}

          {showAddPage ? (
            <div className="flex items-center animate-in slide-in-from-left-2 duration-200">
              <input 
                autoFocus
                className="bg-gray-900 border-2 border-yellow-600/50 px-4 py-1.5 rounded-xl text-[10px] font-black outline-none shadow-inner w-32"
                placeholder="Name..."
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onAddPage(newPageName);
                    setNewPageName('');
                    setShowAddPage(false);
                  }
                }}
                onBlur={() => setShowAddPage(false)}
              />
            </div>
          ) : (
            <button 
              onClick={() => setShowAddPage(true)}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-yellow-600 transition-all hover:scale-110 active:scale-95"
            >
              +
            </button>
          )}
        </div>
      </div>

      <div className="hidden xl:flex items-center gap-4 relative">
         <button 
           onClick={onToggleThemeEditor}
           className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
           title="Page Customization"
         >
           🎨
         </button>
         <div className="h-8 w-[1px] bg-white/10"></div>
         <div 
           className="flex items-center gap-3 cursor-pointer group"
           onClick={() => setShowUserMenu(!showUserMenu)}
         >
            <div className="flex flex-col text-right">
              <span className="text-xs font-black text-gray-200 truncate max-w-[120px] uppercase tracking-wider">{user?.email?.split('@')[0]}</span>
              <span className="text-[9px] text-yellow-600 font-bold uppercase tracking-widest opacity-70">Secured Node</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center font-black text-sm shadow-xl border border-white/10 group-hover:scale-105 transition-transform uppercase">
              {user?.email?.[0]}
            </div>
         </div>

         {showUserMenu && (
           <div className="absolute right-0 top-full mt-3 w-52 glass-panel border border-white/10 rounded-2xl shadow-2xl py-2 animate-fade-in overflow-hidden">
             <div className="px-4 py-3 border-b border-white/5 mb-2 bg-white/5">
               <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active Identity</p>
               <p className="text-xs text-white truncate font-medium">{user.email}</p>
             </div>
             <button 
               onClick={async () => await supabase.auth.signOut()}
               className="w-full text-left px-4 py-2.5 text-xs font-black text-red-400 hover:bg-red-500/10 transition-colors uppercase tracking-widest"
             >
               Sign Out
             </button>
           </div>
         )}
      </div>
    </nav>
  );
};

export default Navbar;
