
import React, { useState, useEffect } from 'react';
import { Page, Widget, DashboardData, Theme } from './types';
import { INITIAL_DATA } from './constants';
import Navbar from './components/Navbar';
import WidgetGrid from './components/WidgetGrid';
import EditModal from './components/EditModal';
import ThemeEditor from './components/ThemeEditor';
import Auth from './components/Auth';
import { supabase } from './lib/supabase';

const DEFAULT_THEME: Theme = {
  backgroundColor: '#121212',
  headingColor: '#ffffff',
  accentColor: '#d4af37',
  glassOpacity: 0.7
};

const App: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showThemeEditor, setShowThemeEditor] = useState(false);
  const [data, setData] = useState<DashboardData>({
    pages: INITIAL_DATA.map(p => ({ ...p, theme: DEFAULT_THEME })),
    activePageId: INITIAL_DATA[0].id
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeWidget, setActiveWidget] = useState<Widget | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchDashboard(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchDashboard(session.user.id);
      else {
        setData({ pages: INITIAL_DATA, activePageId: INITIAL_DATA[0].id });
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchDashboard = async (userId: string) => {
    setLoading(true);
    try {
      const { data: dbData, error } = await supabase
        .from('dashboards')
        .select('data')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching dashboard:', error);
      } else if (dbData) {
        setData(dbData.data);
      } else {
        const initialDashboard = {
          pages: INITIAL_DATA.map(p => ({ ...p, theme: DEFAULT_THEME })),
          activePageId: INITIAL_DATA[0].id
        };
        setData(initialDashboard);
        await saveDashboard(initialDashboard, userId);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveDashboard = async (newData: DashboardData, userId?: string) => {
    const targetUserId = userId || session?.user?.id;
    if (!targetUserId) return;
    try {
      await supabase.from('dashboards').upsert({
        user_id: targetUserId,
        data: newData,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error saving dashboard:', err);
    }
  };

  const updateData = (updater: (prev: DashboardData) => DashboardData) => {
    setData(prev => {
      const next = updater(prev);
      saveDashboard(next);
      return next;
    });
  };

  if (!session) return <Auth />;
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#121212]">
        <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest animate-pulse">Synchronizing...</span>
      </div>
    );
  }

  const activePage = data.pages.find(p => p.id === data.activePageId) || data.pages[0];
  const theme = activePage.theme || DEFAULT_THEME;

  const handleUpdateTheme = (updatedTheme: Theme) => {
    updateData(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === prev.activePageId ? { ...p, theme: updatedTheme } : p)
    }));
  };

  return (
    <div 
      className="min-h-screen flex flex-col text-gray-200 transition-colors duration-500"
      style={{ 
        backgroundColor: theme.backgroundColor,
        backgroundImage: theme.backgroundImage ? `url(${theme.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navbar 
        activePageId={data.activePageId} 
        pages={data.pages} 
        onPageChange={(id) => setData(prev => ({ ...prev, activePageId: id }))}
        onAddPage={(name) => {
          const newPage: Page = { id: `page-${Date.now()}`, name: name.trim() || 'New Page', type: 'personal', widgets: [], theme: DEFAULT_THEME };
          updateData(prev => ({ ...prev, pages: [...prev.pages, newPage], activePageId: newPage.id }));
        }}
        onDeletePage={(id) => {
          const page = data.pages.find(p => p.id === id);
          if (!page || page.type === 'firm') return;
          updateData(prev => {
            const filtered = prev.pages.filter(p => p.id !== id);
            return { ...prev, pages: filtered, activePageId: filtered[0].id };
          });
        }}
        user={session.user}
        onToggleThemeEditor={() => setShowThemeEditor(!showThemeEditor)}
      />
      
      <main className="flex-1 container mx-auto p-4 md:p-10 max-w-7xl animate-fade-in relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3" style={{ color: theme.headingColor }}>
              {activePage.name}
              {activePage.type === 'firm' && <span className="text-[10px] bg-yellow-600/20 text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Firm</span>}
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-medium opacity-70">Dashboard / {activePage.name}</p>
          </div>
          <button 
            onClick={() => {
              const newWidget: Widget = { id: `widget-${Date.now()}`, title: 'New Section', layout: 'icons-grid', items: [] };
              updateData(prev => ({
                ...prev,
                pages: prev.pages.map(page => page.id === prev.activePageId ? { ...page, widgets: [...page.widgets, newWidget] } : page)
              }));
              setActiveWidget(newWidget);
              setIsEditing(true);
            }}
            className="group relative flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-2xl font-bold transition-all border border-white/10 shadow-xl overflow-hidden active:scale-95"
          >
            <span className="text-2xl" style={{ color: theme.accentColor }}>+</span> 
            <span>Add Section</span>
          </button>
        </div>

        <WidgetGrid 
          widgets={activePage.widgets} 
          theme={theme}
          onEditWidget={(w) => { setActiveWidget(w); setIsEditing(true); }}
          onDeleteWidget={(id) => {
            if (!window.confirm("Delete this section?")) return;
            updateData(prev => ({
              ...prev,
              pages: prev.pages.map(page => page.id === prev.activePageId ? { ...page, widgets: page.widgets.filter(w => w.id !== id) } : page)
            }));
          }}
        />
      </main>

      {isEditing && activeWidget && (
        <EditModal 
          widget={activeWidget} 
          onClose={() => { setIsEditing(false); setActiveWidget(null); }}
          onSave={(updatedWidget) => {
            updateData(prev => ({
              ...prev,
              pages: prev.pages.map(page => page.id === prev.activePageId ? { ...page, widgets: page.widgets.map(w => w.id === updatedWidget.id ? updatedWidget : w) } : page)
            }));
            setIsEditing(false);
            setActiveWidget(null);
          }}
        />
      )}

      {showThemeEditor && (
        <ThemeEditor 
          theme={theme} 
          onSave={handleUpdateTheme} 
          onClose={() => setShowThemeEditor(false)} 
        />
      )}

      <footer className="py-8 text-center border-t border-white/5 mt-12 bg-black/20">
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">
          The Woodlands Law Firm &bull; Internal Productivity Portal &bull; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;
