
export type WidgetLayout = 'icons-grid' | 'icons-list' | 'text-list';
export type IconSize = 'sm' | 'md' | 'lg';
export type PageType = 'firm' | 'personal';

export interface Theme {
  backgroundColor: string;
  backgroundImage?: string;
  headingColor: string;
  accentColor: string;
  glassOpacity: number;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  iconUrl?: string;
  iconSize?: IconSize;
}

export interface Widget {
  id: string;
  title: string;
  layout: WidgetLayout;
  items: LinkItem[];
  backgroundColor?: string;
  titleColor?: string;
  notes?: string;
  columnSpan?: number; // 1, 2, 3 or 4
}

export interface Page {
  id: string;
  name: string;
  type: PageType;
  widgets: Widget[];
  theme?: Theme;
}

export interface DashboardData {
  pages: Page[];
  activePageId: string;
}
