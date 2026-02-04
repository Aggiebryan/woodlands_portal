
import React, { useState } from 'react';
import { Widget, LinkItem, WidgetLayout, IconSize } from '../types';

interface EditModalProps {
  widget: Widget;
  onClose: () => void;
  onSave: (updated: Widget) => void;
}

const EditModal: React.FC<EditModalProps> = ({ widget, onClose, onSave }) => {
  const [editedWidget, setEditedWidget] = useState<Widget>({ ...widget, column: widget.column || 1, order: widget.order || 1 });
  const [activeLinkId, setActiveLinkId] = useState<string | null>(null);
  const [newLink, setNewLink] = useState<Partial<LinkItem>>({ title: '', url: '', subtext: '', iconSize: 'md' });

  const getAutoIcon = (urlStr: string) => {
    try {
      const cleanUrl = urlStr.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
      return `https://www.google.com/s2/favicons?domain=${cleanUrl}&sz=128`;
    } catch(e) {
      return '';
    }
  };

  const handleAddLink = () => {
    if (!newLink.title || !newLink.url) return;
    const finalUrl = newLink.url.startsWith('http') ? newLink.url : `https://${newLink.url}`;
    const link: LinkItem = {
      id: `link-${Date.now()}`,
      title: newLink.title,
      url: finalUrl,
      subtext: newLink.subtext,
      iconUrl: newLink.iconUrl || getAutoIcon(finalUrl),
      iconSize: newLink.iconSize as IconSize || 'md'
    };
    setEditedWidget(prev => ({ ...prev, items: [...prev.items, link] }));
    setNewLink({ title: '', url: '', subtext: '', iconSize: 'md' });
  };

  const updateLinkDetail = (id: string, updates: Partial<LinkItem>) => {
    setEditedWidget(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id !== id) return item;
        const next = { ...item, ...updates };
        if (updates.url && !updates.iconUrl) {
           next.iconUrl = getAutoIcon(updates.url);
        }
        return next;
      })
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <div className="bg-gray-900 w-full max-w-6xl rounded-[2.5rem] border border-gray-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="px-10 py-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-[0.2em]">Module Architect</h2>
            <p className="text-[10px] text-yellow-600 font-black uppercase tracking-[0.3em] mt-1">Configure Environment Node</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-gray-800 rounded-full text-gray-400 transition-colors">✕</button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          <div className="flex-1 overflow-y-auto p-10 space-y-12 border-r border-gray-800 no-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Section Heading</label>
                <input 
                  className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-all text-sm text-white"
                  value={editedWidget.title}
                  onChange={(e) => setEditedWidget({ ...editedWidget, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Display Mode</label>
                <select 
                  className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 focus:outline-none text-sm appearance-none text-white cursor-pointer"
                  value={editedWidget.layout}
                  onChange={(e) => setEditedWidget({ ...editedWidget, layout: e.target.value as WidgetLayout })}
                >
                  <optgroup label="Grid Layouts">
                    <option value="icons-grid">Standard Grid</option>
                    <option value="icons-grid-large">Large Icons (2x)</option>
                  </optgroup>
                  <optgroup label="List Layouts">
                    <option value="icons-list">Standard List</option>
                    <option value="icons-list-compact">Compact List</option>
                    <option value="text-list">Text List (No Icons)</option>
                  </optgroup>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Grid Column (1-4)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(c => (
                    <button
                      key={c}
                      onClick={() => setEditedWidget({...editedWidget, column: c})}
                      className={`flex-1 py-3 rounded-xl text-xs font-black transition-all border ${
                        editedWidget.column === c 
                          ? 'bg-yellow-600 border-yellow-600 text-white shadow-lg shadow-yellow-900/20' 
                          : 'bg-gray-950 border-gray-800 text-gray-600 hover:border-gray-600'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Stack Order (1=Top)</label>
                <input 
                  type="number"
                  min="1"
                  className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-all text-sm text-white"
                  value={editedWidget.order}
                  onChange={(e) => setEditedWidget({ ...editedWidget, order: parseInt(e.target.value) || 1 })}
                />
              </div>
               <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Accent Accent</label>
                <input 
                  type="color"
                  className="w-full h-11 bg-transparent border-0 cursor-pointer p-0"
                  value={editedWidget.backgroundColor || '#000000'}
                  onChange={(e) => setEditedWidget({ ...editedWidget, backgroundColor: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block ml-1">Add Link Instance</label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input 
                  placeholder="Link Title"
                  className="bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 text-sm text-white outline-none"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                />
                <input 
                  placeholder="Target URL"
                  className="bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 text-sm font-mono text-white outline-none"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                />
                <input 
                  placeholder="Subtext / Description"
                  className="bg-gray-950 border border-gray-800 rounded-2xl px-5 py-4 text-sm text-white outline-none"
                  value={newLink.subtext}
                  onChange={(e) => setNewLink({ ...newLink, subtext: e.target.value })}
                />
                <button 
                  onClick={handleAddLink}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
                >
                  Confirm Link
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block ml-1">Active Content</label>
              <div className="grid grid-cols-1 gap-2">
                {editedWidget.items.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => setActiveLinkId(item.id)}
                    className={`flex items-center justify-between p-4 rounded-3xl border transition-all cursor-pointer group ${
                      activeLinkId === item.id ? 'bg-yellow-600/10 border-yellow-600/50' : 'bg-gray-950 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-5 overflow-hidden text-left">
                      <div className="w-12 h-12 rounded-2xl bg-black/60 flex items-center justify-center border border-white/5 overflow-hidden flex-shrink-0">
                        <img src={item.iconUrl || getAutoIcon(item.url)} className="w-full h-full object-contain" alt="" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-black text-gray-100 truncate">{item.title}</span>
                        {item.subtext && <span className="text-[10px] text-gray-600 truncate mt-0.5">{item.subtext}</span>}
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setEditedWidget(p => ({ ...p, items: p.items.filter(i => i.id !== item.id) })); }} 
                      className="text-gray-700 hover:text-red-500 p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-[28rem] bg-gray-950/60 p-10 overflow-y-auto border-t md:border-t-0 md:border-l border-gray-800 no-scrollbar">
            {activeLinkId ? (
              <div className="space-y-10 text-left">
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 rounded-3xl bg-black/80 border border-white/10 flex items-center justify-center overflow-hidden">
                      <img src={editedWidget.items.find(i => i.id === activeLinkId)?.iconUrl || getAutoIcon(editedWidget.items.find(i => i.id === activeLinkId)?.url || '')} className="w-full h-full object-contain p-2" alt="" />
                   </div>
                   <div>
                      <h4 className="font-black text-white uppercase tracking-widest text-lg">Entry Detail</h4>
                      <p className="text-[10px] text-yellow-600 uppercase tracking-widest font-black">Link ID: {activeLinkId.slice(-4)}</p>
                   </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Label</label>
                    <input 
                      className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 text-sm text-white focus:border-yellow-600 outline-none"
                      value={editedWidget.items.find(i => i.id === activeLinkId)?.title || ''}
                      onChange={(e) => updateLinkDetail(activeLinkId, { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Subtext / Caption</label>
                    <input 
                      className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 text-sm text-white focus:border-yellow-600 outline-none"
                      value={editedWidget.items.find(i => i.id === activeLinkId)?.subtext || ''}
                      onChange={(e) => updateLinkDetail(activeLinkId, { subtext: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Target Address</label>
                    <input 
                      className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 text-sm font-mono text-white focus:border-yellow-600 outline-none"
                      value={editedWidget.items.find(i => i.id === activeLinkId)?.url || ''}
                      onChange={(e) => updateLinkDetail(activeLinkId, { url: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30">
                <span className="text-4xl mb-6">⚙️</span>
                <h4 className="text-sm font-black uppercase tracking-widest text-white">Select Entry</h4>
                <p className="text-[11px] mt-4 leading-relaxed font-black uppercase tracking-widest text-gray-500">Pick a link from the inventory to configure its specific visual properties.</p>
              </div>
            )}
          </div>
        </div>

        <div className="px-10 py-8 border-t border-gray-800 flex justify-end gap-5 bg-gray-900/50">
          <button onClick={onClose} className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Discard</button>
          <button 
            onClick={() => onSave(editedWidget)}
            className="px-16 py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
