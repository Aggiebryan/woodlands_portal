
import React from 'react';
import { Widget, LinkItem, IconSize, Theme } from '../types';

interface WidgetProps {
  widget: Widget;
  theme: Theme;
  onEdit: () => void;
  onDelete: () => void;
}

const Widget: React.FC<WidgetProps> = ({ widget, theme, onEdit, onDelete }) => {
  const getIconSizeClass = (size?: IconSize) => {
    switch (size) {
      case 'lg': return 'w-16 h-16 p-3';
      case 'sm': return 'w-10 h-10 p-1.5';
      case 'md':
      default: return 'w-12 h-12 p-2';
    }
  };

  const renderItems = () => {
    switch (widget.layout) {
      case 'icons-grid':
        return (
          <div className="flex flex-wrap gap-4 items-start">
            {widget.items.map((item) => (
              <a 
                key={item.id} 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex flex-col items-center gap-1 group transition-transform hover:scale-105"
                title={item.title}
              >
                <div className={`${getIconSizeClass(item.iconSize)} bg-black/40 rounded-xl flex items-center justify-center group-hover:bg-black/60 transition-colors shadow-sm overflow-hidden border border-white/10`}>
                  {item.iconUrl ? (
                    <img src={item.iconUrl} alt="" className="w-full h-full object-contain rounded-sm" />
                  ) : (
                    <div className="text-xl font-bold uppercase" style={{ color: theme.accentColor }}>{item.title.charAt(0)}</div>
                  )}
                </div>
                <span className="text-[10px] text-center text-gray-400 group-hover:text-white truncate w-20 px-1">{item.title}</span>
              </a>
            ))}
          </div>
        );
      case 'icons-list':
        return (
          <div className="space-y-2">
            {widget.items.map((item) => (
              <a 
                key={item.id} 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors group"
              >
                <div className="w-6 h-6 bg-black/40 rounded flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/10">
                  {item.iconUrl ? <img src={item.iconUrl} className="w-full h-full object-contain" /> : <span className="text-[10px] font-bold text-white">{item.title[0]}</span>}
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white truncate">{item.title}</span>
              </a>
            ))}
          </div>
        );
      case 'text-list':
        return (
          <div className="space-y-1">
            {widget.items.map((item) => (
              <a 
                key={item.id} 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                className="block py-1.5 border-b border-white/5 last:border-0 hover:text-white transition-colors text-sm text-gray-300"
              >
                {item.title}
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
      className="rounded-2xl overflow-hidden widget-shadow relative group/widget border border-white/10 transition-all hover:border-white/20 h-full"
      style={{ 
        backgroundColor: `rgba(31, 41, 55, ${theme.glassOpacity})`,
        backdropFilter: 'blur(8px)',
        borderTopColor: widget.backgroundColor || 'transparent',
        borderTopWidth: widget.backgroundColor ? '4px' : '1px'
      }}
    >
      <div className="px-4 py-3 flex justify-between items-center bg-white/5 border-b border-white/5">
        <h3 className="font-bold text-xs uppercase tracking-widest truncate max-w-[70%]" style={{ color: widget.titleColor || 'rgba(156, 163, 175, 1)' }}>
          {widget.title}
        </h3>
        <div className="flex items-center gap-1 opacity-0 group-hover/widget:opacity-100 transition-opacity">
          <button 
            onClick={onEdit} 
            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors text-xs"
            title="Edit Section"
          >
            ⚙️
          </button>
          <button 
            onClick={onDelete} 
            className="p-1.5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors text-xs"
            title="Delete Section"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="p-4 overflow-y-auto no-scrollbar min-h-[100px]">
        {widget.items.length === 0 ? (
          <div className="text-center py-6 flex flex-col items-center gap-2">
            <span className="text-2xl opacity-20">🔗</span>
            <p className="text-xs text-gray-500 italic">No links in this section.</p>
          </div>
        ) : renderItems()}
      </div>
    </div>
  );
};

export default Widget;
