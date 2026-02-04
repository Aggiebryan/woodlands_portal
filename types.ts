
export type WidgetLayout = 'icons-grid' | 'icons-grid-large' | 'icons-list' | 'icons-list-compact' | 'text-list';
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';
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
  subtext?: string;
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
  column: number; // 1, 2, 3, or 4
  order: number;  // 1 is top, 2 below, etc.
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
