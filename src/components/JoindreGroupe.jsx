import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, UserPlus, ShieldCheck, Users, Clock, ChevronRight, Check, Loader2 } from 'lucide-react';
import { getGroups, joinGroup } from '../services/api';

const JoindreGroupe = ({ onBack, onJoin }) => {
  const [availableGroups, setAvailableGroups] = useState([]);
  const [code, setCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [joining, setJoining] = useState(null);
  const [joined, setJoined] = useState([]);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('discover'); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tab === 'discover') {
      fetchGroups();
    }
  }, [tab]);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await getGroups();
      // Filtrer pour ne montrer que les groupes "ouverts" (par exemple ceux avec de la place)
      setAvailableGroups(res.data.filter(g => (g.members_count || 0) < (g.max_members || 10)));
    } catch (err) {
      console.error("Erreur chargement groupes:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGroups = availableGroups.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (g.code && g.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleJoinById = async (group) => {
    if (joined.includes(group.id)) return;
    setJoining(group.id);
    try {
      await joinGroup(group.code || group.id);
      setJoined(prev => [...prev, group.id]);
      onJoin(group.code || group.id);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la jonction au groupe.");
    } finally {
      setJoining(null);
    }
  };

  const handleJoinByCode = async (e) => {
    e.preventDefault();
    setError('');
    if (!code.trim()) { setError('Veuillez saisir un code d\'invitation.'); return; }
    
    setJoining('code');
    try {
      await joinGroup(code.trim());
      onJoin(code.trim());
      setCode('');
    } catch (err) {
      console.error(err);
      setError("Code invalide ou groupe inaccessible.");
    } finally {
      setJoining(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex' }}>
          <ArrowLeft size={22} />
        </button>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>Rejoindre un Groupe</h2>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>Trouvez une tontine qui vous correspond</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '16px 24px 0', display: 'flex', gap: 8, borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
        {[
          { key: 'discover', label: '🔍 Découvrir' },
          { key: 'code', label: '🔑 Code d\'invitation' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, color: tab === t.key ? '#f39c12' : 'var(--text-muted)', borderBottom: tab === t.key ? '2px solid #f39c12' : '2px solid transparent', marginBottom: -1 }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '24px' }}>
        <AnimatePresence mode="wait">
          {tab === 'code' ? (
            <motion.div key="code" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="card" style={{ maxWidth: 500, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(243,156,18,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <UserPlus size={26} color="#f39c12" />
                  </div>
                  <h3 style={{ fontWeight: 700, marginBottom: 6 }}>Entrer un code d'invitation</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Demandez le code à l'administrateur du groupe</p>
                </div>
                <form onSubmit={handleJoinByCode} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <input
                    value={code}
                    onChange={e => { setCode(e.target.value.toUpperCase()); setError(''); }}
                    placeholder="Ex: MIABE-26"
                    className="input-field"
                    style={{ fontFamily: 'monospace', fontSize: 16, textAlign: 'center', letterSpacing: 2 }}
                  />
                  {error && (
                    <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', fontSize: 13 }}>
                      ⚠️ {error}
                    </div>
                  )}
                  <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }} disabled={joining === 'code'}>
                    {joining === 'code' ? <><Loader2 size={16} className="animate-spin" /> Vérification...</> : <>Rejoindre <ChevronRight size={16} /></>}
                  </button>
                </form>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 16 }}>
                  Saisissez le code d'invitation fourni par l'administrateur de votre tontine.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="discover" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {/* Search */}
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un groupe..."
                  className="input-field"
                  style={{ paddingLeft: 44 }}
                />
              </div>

              {/* Groups */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {filteredGroups.map((group, i) => {
                  const isJoined = joined.includes(group.id);
                  const isOpen = (group.current_members || 0) < (group.max_members || 10);
                  return (
                    <motion.div key={group.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                      className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                        <div style={{ width: 46, height: 46, borderRadius: 14, background: isOpen ? 'rgba(16,185,129,0.1)' : 'rgba(107,114,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Users size={22} color={isOpen ? '#10b981' : '#6b7280'} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                            <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{group.name}</h4>
                            {!isOpen && <span className="badge badge-warning" style={{ fontSize: 10, flexShrink: 0 }}>Complet</span>}
                          </div>
                          <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>
                            {group.current_members}/{group.max_members} membres • {(group.contribution_amount || 0).toLocaleString()} FCFA/{group.frequency} • Code: <strong>{group.code}</strong>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleJoinById(group)}
                        disabled={!isOpen || isJoined || isJoining}
                        style={{
                          flexShrink: 0, padding: '9px 18px', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: (!isOpen || isJoined) ? 'not-allowed' : 'pointer',
                          background: isJoined ? 'rgba(16,185,129,0.12)' : !isOpen ? 'var(--bg-card-hover)' : 'linear-gradient(135deg, #f39c12, #f1c40f)',
                          color: isJoined ? '#10b981' : !isOpen ? 'var(--text-muted)' : '#0b1120',
                          border: 'none', display: 'flex', alignItems: 'center', gap: 6, opacity: (!isOpen && !isJoined) ? 0.6 : 1
                        }}>
                        {isJoining ? <Loader2 size={14} className="animate-spin" /> : isJoined ? <><Check size={14} /> Rejoint</> : 'Rejoindre'}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JoindreGroupe;
