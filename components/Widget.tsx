
import React from 'react';
import { Widget, LinkItem, IconSize, Theme } from '../types';

interface WidgetProps {
  widget: Widget;
  theme: Theme;
  onEdit: () => void;
  onDelete: () => void;
}

const Widget: React.FC<WidgetProps> = ({ widget, theme, onEdit, onDelete }) => {
  const getIcon = (item: LinkItem) => {
    if (item.iconUrl) return item.iconUrl;
    try {
      const domain = new URL(item.url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      return `https://www.google.com/s2/favicons?domain=example.com&sz=128`;
    }
  };

  const renderItems = () => {
    switch (widget.layout) {
      case 'icons-grid':
      case 'icons-grid-large': {
        const isLarge = widget.layout === 'icons-grid-large';
        const boxSize = isLarge ? 'w-24 h-24 p-5' : 'w-12 h-12 p-2';
        return (
          <div className="flex flex-wrap gap-4 items-start justify-center">
            {widget.items.map((item) => (
              <a 
                key={item.id} 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex flex-col items-center gap-1 group transition-transform hover:scale-105"
                title={item.title}
              >
                <div className={`${boxSize} bg-black/40 rounded-2xl flex items-center justify-center group-hover:bg-black/60 transition-colors shadow-sm overflow-hidden border border-white/10`}>
                  <img src={getIcon(item)} alt="" className="w-full h-full object-contain rounded-sm" />
                </div>
                <div className="flex flex-col items-center min-w-0 max-w-[100px]">
                   <span className="text-[10px] text-center text-gray-200 group-hover:text-white truncate w-full font-bold px-1">{item.title}</span>
                   {item.subtext && <span className="text-[8px] text-center text-gray-500 truncate w-full px-1">{item.subtext}</span>}
                </div>
              </a>
            ))}
          </div>
        );
      }
      case 'icons-list':
      case 'icons-list-compact': {
        const isCompact = widget.layout === 'icons-list-compact';
        const iconBoxSize = isCompact ? 'w-5 h-5' : 'w-8 h-8 p-1';
        return (
          <div className="space-y-1.5">
            {widget.items.map((item) => (
              <a 
                key={item.id} 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-1.5 hover:bg-white/5 rounded-xl transition-colors group"
              >
                <div className={`${iconBoxSize} bg-black/40 rounded flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/10`}>
                  <img src={getIcon(item)} className="w-full h-full object-contain" alt="" />
                </div>
                <div className="flex flex-col min-w-0">
                   <span className="text-sm text-gray-300 group-hover:text-white truncate font-medium">{item.title}</span>
                   {item.subtext && <span className="text-[10px] text-gray-500 truncate">{item.subtext}</span>}
                </div>
              </a>
            ))}
          </div>
        );
      }
      case 'text-list':
        return (
          <div className="space-y-1">
            {widget.items.map((item) => (
              <a 
                key={item.id} 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                className="block py-2 border-b border-white/5 last:border-0 hover:text-white transition-colors group"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 group-hover:text-white">{item.title}</span>
                  {item.subtext && <span className="text-[10px] text-gray-600">{item.subtext}</span>}
                </div>
              </a>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="rounded-3xl overflow-hidden widget-shadow relative group/widget border border-white/10 transition-all hover:border-white/20 h-full"
      style={{ 
        backgroundColor: `rgba(31, 41, 55, ${theme.glassOpacity})`,
        backdropFilter: 'blur(12px)',
        borderTopColor: widget.backgroundColor || 'transparent',
        borderTopWidth: widget.backgroundColor ? '4px' : '1px'
      }}
    >
      <div className="px-5 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md border-b border-white/5 relative overflow-hidden group/header">
        {/* Glassy high-shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        
        <h3 className="font-black text-[11px] uppercase tracking-[0.15em] truncate max-w-[70%] relative z-10" style={{ color: widget.titleColor || 'rgba(156, 163, 175, 1)' }}>
          {widget.title}
        </h3>
        
        <div className="flex items-center gap-1 opacity-0 group-hover/widget:opacity-100 transition-opacity relative z-10">
          <button onClick={onEdit} className="p-1.5 hover:bg-white/20 rounded-lg text-gray-400 hover:text-white transition-colors text-xs" title="Edit Section">⚙️</button>
          <button onClick={onDelete} className="p-1.5 hover:bg-red-500/30 rounded-lg text-gray-400 hover:text-red-400 transition-colors text-xs" title="Delete Section">🗑️</button>
        </div>
      </div>
      
      <div className="p-5 overflow-y-auto no-scrollbar min-h-[80px]">
        {widget.items.length === 0 ? (
          <div className="text-center py-6 flex flex-col items-center gap-2 opacity-20">
            <span className="text-2xl">🔗</span>
            <p className="text-[10px] uppercase font-bold tracking-widest">No Links</p>
          </div>
        ) : renderItems()}
      </div>
    </div>
  );
};

export default Widget;
