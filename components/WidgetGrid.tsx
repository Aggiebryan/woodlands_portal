
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
      {widgets.map((widget) => {
        // Map column span to grid-column classes
        const spanClass = widget.columnSpan 
          ? widget.columnSpan === 2 
            ? 'md:col-span-2' 
            : widget.columnSpan === 3 
              ? 'lg:col-span-3' 
              : widget.columnSpan === 4 
                ? 'xl:col-span-4 lg:col-span-3 md:col-span-2'
                : ''
          : '';

        return (
          <div key={widget.id} className={spanClass}>
            <WidgetComponent 
              widget={widget} 
              theme={theme}
              onEdit={() => onEditWidget(widget)}
              onDelete={() => onDeleteWidget(widget.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WidgetGrid;
