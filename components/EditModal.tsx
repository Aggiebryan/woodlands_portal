
import React, { useState } from 'react';
import { Widget, LinkItem, WidgetLayout, IconSize } from '../types';

interface EditModalProps {
  widget: Widget;
  onClose: () => void;
  onSave: (updated: Widget) => void;
}

const EditModal: React.FC<EditModalProps> = ({ widget, onClose, onSave }) => {
  const [editedWidget, setEditedWidget] = useState<Widget>({ ...widget, columnSpan: widget.columnSpan || 1 });
  const [activeLinkId, setActiveLinkId] = useState<string | null>(null);
  const [newLink, setNewLink] = useState<Partial<LinkItem>>({ title: '', url: '', iconSize: 'md' });

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
      iconUrl: newLink.iconUrl || getAutoIcon(finalUrl),
      iconSize: newLink.iconSize as IconSize || 'md'
    };
    setEditedWidget(prev => ({ ...prev, items: [...prev.items, link] }));
    setNewLink({ title: '', url: '', iconSize: 'md' });
  };

  const updateLinkDetail = (id: string, updates: Partial<LinkItem>) => {
    setEditedWidget(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id !== id) return item;
        const next = { ...item, ...updates };
        // Trigger auto-icon update if URL changes and no manual icon exists
        if (updates.url && !updates.iconUrl) {
           next.iconUrl = getAutoIcon(updates.url);
        }
        return next;
      })
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
      <div className="bg-gray-900 w-full max-w-5xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-8 py-5 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Section Editor</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Customize Content & Grid Width</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">✕</button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          <div className="flex-1 overflow-y-auto p-8 space-y-10 border-r border-gray-800 no-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Section Title</label>
                <input 
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-all text-sm text-white"
                  value={editedWidget.title}
                  onChange={(e) => setEditedWidget({ ...editedWidget, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Layout</label>
                <select 
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none text-sm appearance-none text-white"
                  value={editedWidget.layout}
                  onChange={(e) => setEditedWidget({ ...editedWidget, layout: e.target.value as WidgetLayout })}
                >
                  <option value="icons-grid">Grid (Large Icons)</option>
                  <option value="icons-list">List w/ Small Icons</option>
                  <option value="text-list">Links Only</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Width (Columns)</label>
                <select 
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none text-sm appearance-none text-white"
                  value={editedWidget.columnSpan || 1}
                  onChange={(e) => setEditedWidget({ ...editedWidget, columnSpan: parseInt(e.target.value) })}
                >
                  <option value={1}>1 Column (Standard)</option>
                  <option value={2}>2 Columns (Medium)</option>
                  <option value={3}>3 Columns (Large)</option>
                  <option value={4}>4 Columns (Full Page)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Quick Add Link</label>
              <div className="flex gap-3">
                <input 
                  placeholder="Link Title"
                  className="flex-[2] bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-xs text-white"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                />
                <input 
                  placeholder="URL (e.g. google.com)"
                  className="flex-[3] bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-xs font-mono text-white"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                />
                <button 
                  onClick={handleAddLink}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-yellow-900/20 active:scale-95 transition-all"
                >
                  Add Link
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Current Content ({editedWidget.items.length})</label>
              <div className="grid grid-cols-1 gap-2">
                {editedWidget.items.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => setActiveLinkId(item.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                      activeLinkId === item.id ? 'bg-yellow-600/10 border-yellow-600/50' : 'bg-gray-800/40 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-4 overflow-hidden text-left">
                      <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center border border-white/5 overflow-hidden flex-shrink-0">
                        {item.iconUrl ? <img src={item.iconUrl} className="w-full h-full object-contain" /> : <span className="text-xs text-white">{item.title[0]}</span>}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-black text-gray-200 truncate">{item.title}</span>
                        <span className="text-[10px] text-gray-600 truncate font-mono">{item.url}</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setEditedWidget(p => ({ ...p, items: p.items.filter(i => i.id !== item.id) })); if (activeLinkId === item.id) setActiveLinkId(null); }} 
                      className="text-gray-600 hover:text-red-400 p-2 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-96 bg-gray-950/40 p-8 overflow-y-auto border-t md:border-t-0 md:border-l border-gray-800 no-scrollbar">
            {activeLinkId ? (
              <div className="space-y-8 text-left">
                <div className="flex items-center gap-5">
                   <div className="w-20 h-20 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                      {editedWidget.items.find(i => i.id === activeLinkId)?.iconUrl ? (
                         <img src={editedWidget.items.find(i => i.id === activeLinkId)?.iconUrl} className="w-full h-full object-contain" />
                      ) : (
                         <span className="text-3xl">🔗</span>
                      )}
                   </div>
                   <div>
                      <h4 className="font-black text-white uppercase tracking-wider text-sm">Appearance</h4>
                      <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-bold">Custom Icons & Sizes</p>
                   </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Icon Scaling</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['sm', 'md', 'lg'] as IconSize[]).map(size => (
                        <button
                          key={size}
                          onClick={() => updateLinkDetail(activeLinkId, { iconSize: size })}
                          className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                            editedWidget.items.find(i => i.id === activeLinkId)?.iconSize === size
                              ? 'bg-yellow-600 border-yellow-600 text-white shadow-lg shadow-yellow-900/20'
                              : 'bg-gray-800 border-gray-700 text-gray-500 hover:border-gray-500'
                          }`}
                        >
                          {size === 'sm' ? 'Tiny' : size === 'md' ? 'Normal' : 'Large'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Display Name</label>
                    <input 
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-xs text-white focus:ring-1 focus:ring-yellow-600 outline-none"
                      value={editedWidget.items.find(i => i.id === activeLinkId)?.title || ''}
                      onChange={(e) => updateLinkDetail(activeLinkId, { title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Link URL</label>
                    <input 
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-xs font-mono text-white focus:ring-1 focus:ring-yellow-600 outline-none"
                      value={editedWidget.items.find(i => i.id === activeLinkId)?.url || ''}
                      onChange={(e) => updateLinkDetail(activeLinkId, { url: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Custom Image/Icon URL</label>
                    <input 
                      placeholder="https://..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-[10px] font-mono text-white focus:ring-1 focus:ring-yellow-600 outline-none"
                      value={editedWidget.items.find(i => i.id === activeLinkId)?.iconUrl || ''}
                      onChange={(e) => updateLinkDetail(activeLinkId, { iconUrl: e.target.value })}
                    />
                    <p className="text-[9px] text-gray-600 italic">Overrides Google Favicon. Paste an image link here to change the icon.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-2xl border border-dashed border-white/20">👆</div>
                <h4 className="text-xs font-black uppercase tracking-widest text-white">Customization</h4>
                <p className="text-[9px] mt-2 px-6 leading-relaxed font-bold uppercase tracking-widest text-gray-500">Select a link from the left to edit its icon, name, and URL</p>
              </div>
            )}
          </div>
        </div>

        <div className="px-8 py-5 border-t border-gray-800 flex justify-end gap-3 bg-gray-900/50">
          <button onClick={onClose} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Discard</button>
          <button 
            onClick={() => onSave(editedWidget)}
            className="px-12 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-yellow-900/40 transition-all active:scale-95"
          >
            Update Section
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
