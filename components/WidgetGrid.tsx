
import React from 'react';
import { Widget, Theme } from '../types';
import WidgetComponent from './Widget';

interface WidgetGridProps {
  widgets: Widget[];
  theme: Theme;
  onEditWidget: (w: Widget) => void;
  onDeleteWidget: (id: string) => void;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ widgets, theme, onEditWidget, onDeleteWidget }) => {
  // Group widgets by column index (1-4) and sort by order within each column
  const columns = [1, 2, 3, 4].map(colIdx => 
    widgets
      .filter(w => (w.column || 1) === colIdx)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
      {columns.map((columnWidgets, idx) => (
        <div key={idx} className="flex flex-col gap-6">
          {columnWidgets.map(widget => (
            <WidgetComponent 
              key={widget.id}
              widget={widget} 
              theme={theme}
              onEdit={() => onEditWidget(widget)}
              onDelete={() => onDeleteWidget(widget.id)}
            />
          ))}
          {columnWidgets.length === 0 && (
            <div className="h-32 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center opacity-20">
              <span className="text-[10px] uppercase font-bold tracking-widest">Column {idx + 1} Empty</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WidgetGrid;
