import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import GroupDetails from './components/GroupDetails';
import Profile from './components/Profile';
import CreateGroup from './components/CreateGroup';
import Notifications from './components/Notifications';
import Leaderboard from './components/Leaderboard';
import AssistantYAO from './components/AssistantYAO';
import Messagerie from './components/Messagerie';
import MesTontines from './components/MesTontines';
import JoindreGroupe from './components/JoindreGroupe';
import { createGroup, getGroups, getNotificationsList, joinGroup } from './services/api';
import { Menu } from 'lucide-react';
import logoOfficial from './assets/logo_official.png';

function App() {
  const [page, setPage] = useState('landing'); // 'landing' | 'login' | 'app'
  const [theme, setTheme] = useState(() => localStorage.getItem('tontine_theme') || 'dark');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ 
    first_name: "", 
    last_name: "", 
    npi: "",
    score_confiance: 85, 
    preferred_language: 'fr' 
  });
  const [view, setView] = useState('dashboard');
  const [currentGroup, setCurrentGroup] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Theme management
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tontine_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Auth check - validate token against API
  useEffect(() => {
    const token = localStorage.getItem('tontine_token');
    if (token) {
      import('./services/api').then(({ getMe }) => {
        getMe()
          .then(res => {
            setUser(prev => ({ ...prev, ...res.data }));
            setIsAuthenticated(true);
            setPage('app');
          })
          .catch(() => {
            // Token expired or invalid — clear it and show landing page
            localStorage.removeItem('tontine_token');
            setPage('landing');
          });
      });
    }
  }, []);

  const fetchInitialData = async () => {
    try {
      const [groupsRes, notificationsRes] = await Promise.all([
        getGroups().catch(() => ({ data: groups })),
        getNotificationsList().catch(() => ({ data: notifications }))
      ]);
      setGroups(groupsRes.data);
      setNotifications(notificationsRes.data);
    } catch (err) {
      console.error("Erreur de chargement des données", err);
    }
  };

  const handleCreateGroup = async (groupData) => {
    try {
      await createGroup(groupData);
    } catch (err) {
      console.error("Erreur création groupe:", err);
    } finally {
      await fetchInitialData();
      setPage('app');
    }
  };

  const handleJoinGroup = async (code) => {
    try {
      await joinGroup(code);
    } catch (err) {
      console.error("Erreur rejoindre groupe:", err);
    } finally {
      await fetchInitialData();
      setPage('app');
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setPage('app');
    fetchInitialData();
  };

  const handleLogout = () => {
    localStorage.removeItem('tontine_token');
    setIsAuthenticated(false);
    setPage('landing');
    setView('dashboard');
  };

  // ===== LANDING PAGE =====
  if (page === 'landing' && !isAuthenticated) {
    return <LandingPage onNavigateLogin={() => setPage('login')} theme={theme} toggleTheme={toggleTheme} />;
  }

  // ===== LOGIN =====
  if (page === 'login' && !isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // ===== FULL-SCREEN VIEWS (no sidebar) =====
  if (view === 'assistant_yao') {
    return <AssistantYAO onBack={() => setView('dashboard')} user={user} />;
  }

  if (view === 'messagerie') {
    return <Messagerie onBack={() => setView('dashboard')} user={user} groups={groups} />;
  }

  // Removed KYC barrier to allow direct access to dashboard after login
  const effectiveView = view;

  if (effectiveView === 'group' && currentGroup) {
    return <GroupDetails group={currentGroup} user={user} onBack={() => setView('dashboard')} />;
  }

  if (effectiveView === 'profile') {
    return (
      <Profile 
        user={user} 
        onBack={() => (user?.npi && user.npi.length > 5) ? setView('dashboard') : alert("Veuillez d'abord renseigner votre NPI pour accéder à vos tontines.")} 
        onUpdate={(updatedUser) => { setUser(updatedUser); if (updatedUser.npi) setView('dashboard'); }}
      />
    );
  }

  if (effectiveView === 'notifications') {
    return <Notifications notifications={notifications} onBack={() => setView('dashboard')} />;
  }

  if (view === 'leaderboard') {
    return <Leaderboard onBack={() => setView('dashboard')} />;
  }

  if (view === 'create_group') {
    return (
      <CreateGroup 
        onBack={() => setView('dashboard')} 
        onCreate={(groupData) => { handleCreateGroup(groupData); setView('mes_tontines'); }}
      />
    );
  }

  if (view === 'mes_tontines') {
    return (
      <MesTontines
        groups={groups}
        onSelectGroup={(group) => { setCurrentGroup(group); setView('group'); }}
        onNewGroup={() => setView('create_group')}
        onBack={() => setView('dashboard')}
      />
    );
  }

  if (view === 'join') {
    return (
      <JoindreGroupe
        onBack={() => setView('dashboard')}
        onJoin={(code) => { handleJoinGroup(code); setView('mes_tontines'); }}
      />
    );
  }

  // ===== MAIN APP WITH SIDEBAR =====
  return (
    <div>
      <Sidebar 
        currentView={view}
        onNavigate={setView}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
        mobileOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
      />

      {/* Mobile top bar */}
      <div className="md:hidden" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30, background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
          <Menu size={22} />
        </button>
        <img src={logoOfficial} alt="Logo" style={{ width: 32, height: 32, borderRadius: '6px' }} />
        <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16 }}>TontineChain</span>
      </div>

      <div className="main-content" style={{ paddingTop: typeof window !== 'undefined' && window.innerWidth < 768 ? 72 : 24 }}>
        <Dashboard 
          user={user} 
          groups={groups}
          onLogout={handleLogout} 
          onSelectGroup={(group) => { setCurrentGroup(group); setView('group'); }}
          onOpenProfile={() => setView('profile')}
          onNewGroup={() => setView('create_group')}
          onOpenNotifications={() => setView('notifications')}
          onOpenLeaderboard={() => setView('leaderboard')}
          onJoinGroup={handleJoinGroup}
          onNavigate={setView}
        />
      </div>
    </div>
  );
}

export default App;
