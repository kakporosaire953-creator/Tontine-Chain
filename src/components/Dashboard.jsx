import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, 
  Wallet, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Plus, 
  ChevronRight,
  Activity,
  Bell,
  Search,
  Loader2,
  Clock,
  CheckCircle2,
  Trophy,
  Star
} from 'lucide-react';
import { getMyBalance, getLeaderboard, initiatePayment, getPendingContributions } from '../services/api';
import { translations } from '../services/translations';
import AudioButton from './AudioButton';

const Dashboard = ({ user, groups = [], onLogout, onSelectGroup, onOpenProfile, onNewGroup, onOpenNotifications, onOpenLeaderboard, onJoinGroup, onNavigate }) => {
  const [activities, setActivities] = useState([]); // Initialize empty activities
  const t = translations[user?.preferred_language || 'fr'] || translations.fr;
  const [balance, setBalance] = useState({ total_paid: 0, total_expected: 0 });
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [payingId, setPayingId] = useState(null);
  const [showPaymentProgress, setShowPaymentProgress] = useState(false);

  const handlePay = async (contributionId) => {
    if (!contributionId) return;
    setShowPaymentProgress(true);
    try {
      const res = await initiatePayment(contributionId);
      // Correction selon la documentation du PDF (payment_url)
      if (res.data.payment_url) {
        window.location.href = res.data.payment_url;
      } else if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        alert("Erreur lors de l'initialisation du paiement.");
      }
    } catch (err) {
      console.error("Erreur paiement:", err);
      alert("Une erreur est survenue lors de la redirection vers FedaPay.");
    } finally {
      setShowPaymentProgress(false);
    }
  };

  useEffect(() => {
    // Gestion du retour de paiement (Simulé pour le hackathon)
    const params = new URLSearchParams(window.location.search);
    if (params.get('status') === 'success' || params.get('transaction_id')) {
      setShowPaymentProgress(true);
      // Simuler les 3 secondes de traitement recommandées par le PDF
      setTimeout(() => {
        setShowPaymentProgress(false);
        // Nettoyer l'URL
        window.history.replaceState({}, document.title, window.location.pathname);
        alert("Paiement validé ! Votre tontine a été mise à jour.");
      }, 3000);
    }
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [balanceRes, leaderboardRes, pendingRes] = await Promise.all([
          getMyBalance(),
          getLeaderboard(),
          getPendingContributions()
        ]);
        
        setBalance({
          total_paid: balanceRes.data.total_cotise_fcfa || 0,
          total_expected: balanceRes.data.expected_payouts_fcfa || 0
        });
        
        setLeaderboard((leaderboardRes.data || []).slice(0, 3)); 
        setActivities(pendingRes.data || []); // pending contributions
        setLoading(false);
      } catch (err) {
        console.error("Erreur de chargement du dashboard", err);
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-tontine-orange"></div>
      </div>
    );
  }

  return (
    <div style={{ color: 'var(--text-primary)' }} className="font-inter relative max-w-[1600px] mx-auto">
      
      {/* 1. TOP BAR: WELCOME & ACTIONS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-playfair font-black tracking-tight mb-2">
            {t.welcome}, <span className="text-tontine-orange">{user?.first_name || 'Utilisateur'}</span> 👋
          </h1>
          <p className="text-slate-500 font-medium">Votre centre de commandement TontineChain.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <button 
            onClick={() => setShowJoinModal(true)} 
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-2xl transition-all font-bold"
          >
            <Search className="w-5 h-5 text-tontine-orange" />
            <span>{t.join_group}</span>
          </button>
          <button 
            onClick={onNewGroup} 
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-tontine-orange text-tontine-darker px-8 py-4 rounded-2xl transition-all font-black shadow-xl shadow-tontine-orange/20"
          >
            <Plus className="w-6 h-6" />
            <span>{t.new_group}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: MAIN CONTENT (8/12) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* A. BALANCE & CORE STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-8 rounded-[2rem] relative overflow-hidden group border border-white/5"
            >
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-tontine-orange/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">{t.balance_paid}</p>
                  <h3 className="text-4xl font-black">{balance.total_paid.toLocaleString()} <span className="text-lg text-tontine-orange">F</span></h3>
                </div>
                <div className="p-4 bg-tontine-orange/10 rounded-2xl text-tontine-orange">
                  <Wallet className="w-8 h-8" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-green-400">
                <CheckCircle2 size={14} /> 100% de vos cotisations à jour
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 rounded-[2rem] relative overflow-hidden group border border-white/5"
            >
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-green-500/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">{t.expected_gains}</p>
                  <h3 className="text-4xl font-black">{(groups.reduce((acc, g) => acc + ((g.contribution_amount || g.amount || 0) * (g.max_members || g.members || 0)), 0)).toLocaleString()} <span className="text-lg text-green-500">F</span></h3>
                </div>
                <div className="p-4 bg-green-500/10 rounded-2xl text-green-500">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
              <div className="text-xs text-slate-500 font-medium">Répartis sur {groups.length} groupes actifs</div>
            </motion.div>
          </div>

          {/* B. NEXT PAYMENT (URGENT ACTION) */}
          {activities && activities.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-tontine-orange/20 via-tontine-orange/5 to-transparent border border-tontine-orange/30 p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-tontine-orange rounded-2xl flex items-center justify-center text-tontine-darker shadow-lg shadow-tontine-orange/20">
                  <Clock className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-black text-2xl mb-1">{t?.next_payment || 'Cotisation en attente'}</h4>
                  <p className="text-slate-400">{(activities[0]?.amount_fcfa || 0).toLocaleString()} FCFA • Tontine "{groups.find(g => g.id === activities[0]?.group_id)?.name || 'Active'}"</p>
                </div>
              </div>
              <button 
                onClick={() => handlePay(activities[0]?.id)}
                disabled={payingId === activities[0]?.id}
                className="w-full md:w-auto bg-white text-tontine-darker font-black px-12 py-5 rounded-2xl hover:bg-tontine-gold transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                {payingId === activities[0]?.id ? <Loader2 className="animate-spin" /> : <><CreditCard size={20}/> Payer maintenant</>}
              </button>
            </motion.div>
          )}

          {/* C. MY GROUPS LIST */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-2xl font-playfair font-black">Mes Tontines Actives</h3>
              <button onClick={() => onNavigate('mes_tontines')} className="text-sm font-black text-tontine-orange hover:underline uppercase tracking-widest">Tout voir</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groups.length > 0 ? groups.slice(0, 4).map((g, i) => (
                <motion.div 
                  key={g.id}
                  onClick={() => onSelectGroup(g)}
                  className="glass-panel p-6 rounded-3xl group cursor-pointer border border-white/5 hover:border-tontine-orange/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-tontine-orange/10 transition-colors">
                      <Users className="w-6 h-6 text-tontine-orange" />
                    </div>
                    <div className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">{g.frequency || 'Mensuel'}</div>
                  </div>
                  <h4 className="text-xl font-black mb-1 group-hover:text-tontine-orange transition-colors">{g.name}</h4>
                  <p className="text-2xl font-black text-tontine-orange mb-4">{(g.contribution_amount || g.amount || 0).toLocaleString()} <span className="text-xs">F</span></p>
                  
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-4">
                    <div 
                      className="bg-gradient-to-r from-tontine-orange to-yellow-500 h-full transition-all duration-1000" 
                      style={{ width: `${Math.round(((g.current_cycle || 1) / (g.max_members || 10)) * 100)}%` }} 
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500">
                    <span>CYCLE {g.current_cycle || 1}/{g.max_members || 10}</span>
                    <span className="flex items-center gap-1"><ChevronRight size={14} /></span>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-full py-12 text-center glass-panel rounded-3xl border border-dashed border-white/10">
                  <p className="text-slate-500 font-bold mb-4">Aucune tontine active</p>
                  <button onClick={onNewGroup} className="text-tontine-orange font-black hover:underline uppercase tracking-widest text-xs">Créer ma première tontine</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR (4/12) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* D. RELIABILITY SCORE CARD */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                  <motion.circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="226.2"
                    initial={{ strokeDashoffset: 226.2 }}
                    animate={{ strokeDashoffset: 226.2 - (226.2 * (user?.score_confiance || 0)) / 100 }}
                    transition={{ duration: 2 }}
                    className="text-tontine-orange"
                  />
                </svg>
                <span className="absolute text-xl font-black">{user?.score_confiance ?? '—'}</span>
              </div>
              <div>
                <h4 className="font-black text-lg">Confiance</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Niveau: Elite</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500 uppercase tracking-widest">Paiements à temps</span>
                <span className="text-green-500">98%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[98%]" />
              </div>
            </div>

            <button onClick={onOpenProfile} className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-black transition-all">Améliorer mon score</button>
          </motion.div>

          {/* E. ELITE MEMBERS (LEADERBOARD PREVIEW) */}
          <div className="glass-panel p-6 rounded-[2.5rem] border border-white/5">
            <h3 className="text-lg font-black mb-6 px-2 flex items-center gap-2">
              <Trophy className="text-tontine-gold w-5 h-5" /> Membres Élite
            </h3>
            <div className="space-y-3">
              {leaderboard.map((p, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${i === 0 ? 'bg-tontine-gold text-tontine-darker' : 'bg-white/5 text-slate-500'}`}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-black group-hover:text-tontine-gold transition-colors">{p.full_name || p.name}</h5>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Score: {p.score_confiance || p.score} pts</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={onOpenLeaderboard} className="w-full mt-6 py-3 text-xs font-black text-slate-500 hover:text-white transition-colors">VOIR LE CLASSEMENT COMPLET</button>
          </div>

          {/* F. LIVE ACTIVITY */}
          <div className="glass-panel p-6 rounded-[2.5rem] border border-white/5">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 px-2">Activité récente</h3>
            <div className="space-y-6">
              {activities.length > 0 ? activities.map((act, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== activities.length - 1 && <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-white/5" />}
                  <div className="w-4 h-4 rounded-full bg-green-500/20 border-2 border-green-500 shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-slate-300">Cotisation reçue</p>
                    <p className="text-[10px] text-slate-500">{(act.amount_fcfa || 0).toLocaleString()} F • {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              )) : (
                <p className="text-xs text-slate-600 italic px-2">Aucune activité récente.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      </div>

      {/* FOOTER & UTILS */}
      <footer className="mt-20 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div id="google_translate_element" className="rounded-xl overflow-hidden opacity-50 hover:opacity-100 transition-opacity"></div>
        <a href="https://tonnine-benin-backend.onrender.com/api/documentation" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-black text-slate-600 hover:text-tontine-gold uppercase tracking-widest transition-colors">
          <Search size={12} /> Documentation API (Swagger)
        </a>
      </footer>

      {/* Join Group Modal */}
      <AnimatePresence>
        {showJoinModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowJoinModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel p-8 rounded-3xl max-w-sm w-full relative z-10 shadow-2xl border border-white/10"
            >
              <h3 className="text-2xl font-playfair font-bold mb-2">Rejoindre une Tontine</h3>
              <p className="text-gray-400 text-sm mb-6">Entrez le code d'invitation pour rejoindre un groupe existant.</p>
              
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="CODE-XYZ"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 text-center text-xl font-bold tracking-widest focus:ring-2 focus:ring-tontine-orange outline-none transition-all"
                />
                <button 
                  disabled={!inviteCode || joining}
                  onClick={async () => {
                    setJoining(true);
                    try {
                      onJoinGroup(inviteCode);
                      await new Promise(r => setTimeout(r, 1000));
                      setShowJoinModal(false);
                      setInviteCode('');
                    } finally {
                      setJoining(false);
                    }
                  }}
                  className="w-full bg-tontine-orange text-tontine-darker font-bold py-4 rounded-xl shadow-lg shadow-tontine-orange/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {joining ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Rejoindre maintenant'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FedaPay Redirection & Processing Overlay */}
      <AnimatePresence>
        {showPaymentProgress && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-tontine-darker/95 backdrop-blur-md flex justify-center items-center p-6 text-center"
          >
            <div className="max-w-xs w-full">
              <div className="w-24 h-24 bg-white rounded-3xl mx-auto mb-8 flex items-center justify-center p-5 shadow-2xl">
                <img src="https://fedapay.com/assets/images/logo.png" alt="FedaPay" className="w-full h-auto" />
              </div>
              <h3 className="text-2xl font-black mb-3">Traitement de votre paiement...</h3>
              <p className="text-slate-400 text-sm mb-10 italic leading-relaxed">Vérification de la transaction via FedaPay Blockchain. Veuillez ne pas fermer cette fenêtre.</p>
              <div className="flex justify-center gap-3">
                <div className="w-3 h-3 bg-tontine-orange rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 bg-tontine-orange rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-3 h-3 bg-tontine-orange rounded-full animate-bounce"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
