import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  ShieldAlert, 
  CalendarDays, 
  Gavel, 
  RefreshCcw, 
  CheckCircle2,
  Clock,
  Wallet,
  Loader2,
  ArrowRightLeft,
  ShieldCheck,
  Plus,
  FileDown
} from 'lucide-react';
import { castVote, downloadContract, getGroupDetails, inviteMember, proposeSwap, startGroup, submitBid } from '../services/api';

const GroupDetails = ({ group, onBack, user }) => {
  const [activeTab, setActiveTab] = useState('membres'); 
  const [bidAmount, setBidAmount] = useState(0);
  const [loadingAction, setLoadingAction] = useState(false);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, [group.id]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await getGroupDetails(group.id);
      setDetails(res.data);
    } catch (err) {
      console.error("Erreur détails groupe:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProposeSwap = async (targetUserId) => {
    setLoadingAction(true);
    try {
      await proposeSwap(group.id, { target_user_id: targetUserId });
      alert("Proposition de permutation envoyée au vote !");
      fetchDetails();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la proposition de permutation.");
    } finally {
      setLoadingAction(false);
    }
  };



  const handleBid = async () => {
    if (bidAmount <= 0) return;
    setLoadingAction(true);
    try {
      await submitBid(group.id, { discount_amount: bidAmount });
      alert("Enchère soumise avec succès !");
      fetchDetails();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la soumission de l'enchère.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleVote = async (voteId, type) => {
    setLoadingAction(true);
    try {
      const choice = type === 'yes';
      await castVote(voteId, { choice });
      alert("Vote enregistré !");
      fetchDetails();
    } catch (err) {
      console.error(err);
      alert("Erreur lors du vote.");
    } finally {
      setLoadingAction(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-tontine-darker flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-tontine-orange" />
      </div>
    );
  }

  const members = details?.members || [];

  return (
    <div className="min-h-screen bg-tontine-darker text-white font-inter relative overflow-hidden pb-20">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-tontine-orange/20 to-transparent pointer-events-none" />

      {/* Header */}
      <nav className="glass-panel border-b border-white/5 px-6 py-4 sticky top-0 z-50 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-300" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-playfair font-bold text-xl">{details?.name || 'Détails du Groupe'}</h1>
            <span className="text-[10px] bg-tontine-orange/20 text-tontine-orange px-2 py-0.5 rounded-lg border border-tontine-orange/30 font-mono font-bold tracking-wider">
              CODE: {details?.code || 'TON-782'}
            </span>
          </div>
          <p className="text-xs text-tontine-orange">Cycle {details?.current_cycle}/{details?.max_members}</p>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-6 relative z-10">
        
        {/* Admin Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          {details?.creator_id === user?.id && details?.status === 'pending' && (
            <button 
              onClick={async () => {
                if (details.current_members < details.max_members) {
                  alert(`Le groupe n'est pas encore au complet (${details.current_members}/${details.max_members}).`);
                  return;
                }
                setLoadingAction(true);
                try {
                  const { startGroup } = await import('../services/api');
                  await startGroup(details.id);
                  alert("Tontine démarrée avec succès !");
                  fetchDetails();
                } catch (err) { alert("Erreur lors du démarrage."); }
                finally { setLoadingAction(false); }
              }}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" /> Démarrer la Tontine
            </button>
          )}

          {details?.creator_id === user?.id && details?.status === 'pending' && (
            <button 
              onClick={() => {
                const email = prompt("Adresse email de l'invité :");
                if (email) {
                  inviteMember(details.id, { email }).then(() => {
                    alert("Invitation envoyée !");
                    fetchDetails();
                  }).catch(() => alert("Erreur invitation."));
                }
              }}
              className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-5 h-5 text-tontine-orange" /> Inviter
            </button>
          )}

          {details?.status === 'active' && (
            <button 
              onClick={async () => {
                try {
                  const res = await downloadContract(details.id);
                  const url = window.URL.createObjectURL(new Blob([res.data]));
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', `Contrat_${details.name}.pdf`);
                  document.body.appendChild(link);
                  link.click();
                } catch (err) { alert("Erreur téléchargement contrat."); }
              }}
              className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <FileDown className="w-5 h-5 text-blue-400" /> Contrat PDF
            </button>
          )}
        </div>

        {/* Key Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-4 rounded-2xl border-l-4 border-tontine-orange">
            <Wallet className="w-5 h-5 text-gray-400 mb-2" />
            <p className="text-xs text-gray-400">Cotisation</p>
            <p className="font-bold">{(details?.contribution_amount || 0).toLocaleString()} F</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border-l-4 border-blue-500">
            <ShieldAlert className="w-5 h-5 text-gray-400 mb-2" />
            <p className="text-xs text-gray-400">Caisse Secours</p>
            <p className="font-bold">{details?.insurance_fund?.toLocaleString() || '0'} F</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border-l-4 border-green-500">
            <Users className="w-5 h-5 text-gray-400 mb-2" />
            <p className="text-xs text-gray-400">Membres</p>
            <p className="font-bold">{details?.current_members}/{details?.max_members}</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border-l-4 border-purple-500">
            <CalendarDays className="w-5 h-5 text-gray-400 mb-2" />
            <p className="text-xs text-gray-400">Fréquence</p>
            <p className="font-bold">{details?.frequency || 'Mensuel'}</p>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl mb-6 overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setActiveTab('membres')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'membres' ? 'bg-tontine-orange text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Membres & Statut
          </button>
          <button 
            onClick={() => setActiveTab('encheres')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'encheres' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <Gavel className="w-4 h-4" /> Enchères
          </button>
          <button 
            onClick={() => setActiveTab('votes')}
            className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'votes' ? 'bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <RefreshCcw className="w-4 h-4" /> Swaps
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'membres' && (
            <motion.div 
              key="membres"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {members.map((m) => {
                const isMe = m.user_id === user?.id;
                return (
                  <div key={m.id} className={`glass-panel p-4 rounded-xl flex items-center justify-between ${isMe ? 'border border-tontine-orange/50 bg-tontine-orange/5' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                        ${m.has_taken ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-300'}`}>
                        {m.position}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">{m.user?.full_name || 'Membre'} {isMe && '(Moi)'}</h4>
                          {!isMe && !m.has_taken && (
                            <button 
                              onClick={() => handleProposeSwap(m.user_id)}
                              className="p-1 bg-white/5 hover:bg-tontine-gold/20 rounded-md text-tontine-gold transition-colors"
                              title="Proposer une permutation"
                            >
                              <ArrowRightLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{m.status === 'invited' ? 'Invité' : 'Actif'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {m.payment_status === 'paid' && <span className="inline-flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full mb-1"><CheckCircle2 className="w-3 h-3"/> Payé</span>}
                      {m.payment_status === 'pending' && <span className="inline-flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full mb-1"><Clock className="w-3 h-3"/> En attente</span>}
                      {m.payment_status === 'late' && <span className="inline-flex items-center gap-1 text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded-full mb-1">Retard</span>}
                      
                      {m.has_taken && (
                        <div className="mt-1">
                          <a 
                            href={`https://polygonscan.com/tx/${m.blockchain_tx || '0x...'}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[9px] text-blue-400 hover:text-blue-300 underline flex items-center justify-end gap-1"
                          >
                            <ShieldCheck className="w-2.5 h-2.5" />
                            Preuve Blockchain
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'encheres' && (
            <motion.div 
              key="enchères"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="glass-panel p-6 rounded-2xl border border-tontine-gold/20">
                <h3 className="text-lg font-bold text-tontine-gold mb-4 flex items-center gap-2">
                  <Gavel className="w-5 h-5" /> Enchères sur le cycle actuel
                </h3>
                
                {/* Active Bids List */}
                <div className="space-y-3 mb-6">
                  {details?.active_bids?.length > 0 ? details.active_bids.map((bid, i) => (
                    <div key={bid.id} className={`flex justify-between items-center p-3 rounded-xl border ${bid.user_id === user?.id ? 'bg-tontine-gold/10 border-tontine-gold/20' : 'bg-white/5 border-white/5'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${bid.user_id === user?.id ? 'bg-tontine-gold text-tontine-darker' : 'bg-white/10 text-tontine-gold'}`}>
                          {i + 1}
                        </div>
                        <span className={`text-sm ${bid.user_id === user?.id ? 'font-bold' : ''}`}>
                          {bid.user?.full_name || 'Membre'} {bid.user_id === user?.id && '(Moi)'}
                        </span>
                      </div>
                      <span className="text-tontine-gold font-bold">{(bid.discount_amount || 0).toLocaleString()} F</span>
                    </div>
                  )) : (
                    <div className="p-4 text-center text-xs text-gray-500 italic">Aucune enchère pour le moment.</div>
                  )}
                </div>

                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  En proposant une décote, vous pouvez ramasser le pot immédiatement. La décote sera redistribuée aux autres membres.
                </p>
              
              {details?.status === 'active' && !details?.members?.find(m => m.user_id === user?.id)?.has_taken && (
                <div className="bg-white/5 p-4 rounded-xl mb-6 text-left">
                    <label className="block text-sm text-gray-400 mb-2">Proposer une décote (FCFA)</label>
                    <input 
                        type="range" 
                        min="0" 
                        max={Math.floor((details?.contribution_amount || 50000) * 0.2)} 
                        step="500" 
                        value={bidAmount}
                        onChange={(e) => setBidAmount(parseInt(e.target.value))}
                        className="w-full accent-tontine-gold mb-2" 
                    />
                    <div className="flex justify-between font-bold">
                        <span className="text-xs">Pot Net : {((details?.contribution_amount || 0) * (details?.max_members || 1) - bidAmount).toLocaleString()} F</span>
                        <span className="text-tontine-gold">-{bidAmount.toLocaleString()} F</span>
                    </div>
                </div>
              )}

              {details?.status === 'active' && (
                <button 
                    disabled={loadingAction || bidAmount === 0}
                    onClick={handleBid}
                    className="w-full bg-tontine-gold text-tontine-darker font-bold py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-tontine-gold/10"
                >
                    {loadingAction ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirmer mon offre"}
                </button>
              )}
              </div>
          </motion.div>
        )}

          {activeTab === 'votes' && (
            <motion.div 
              key="votes"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              {details?.pending_votes?.length > 0 ? details.pending_votes.map((vote) => (
                <div key={vote.id} className="glass-panel p-6 rounded-2xl border border-purple-500/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center">
                      <RefreshCcw className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">Demande de Permutation</h3>
                      <p className="text-xs text-gray-400">Initiée par {vote.creator?.full_name || 'un membre'}</p>
                    </div>
                  </div>

                  <div className="w-full bg-white/5 rounded-full h-2 mb-4">
                    <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${(vote.yes_votes / vote.required_votes) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mb-6">
                    {vote.yes_votes} votes favorables sur {vote.required_votes} requis.
                  </p>
                  
                  <div className="flex gap-2">
                    <button 
                      disabled={loadingAction}
                      onClick={() => handleVote(vote.id, 'yes')}
                      className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 py-3 rounded-xl text-xs font-bold transition-all border border-green-500/20"
                    >
                      {loadingAction ? <Loader2 className="w-4 h-4 animate-spin" /> : "Approuver"}
                    </button>
                    <button 
                      disabled={loadingAction}
                      onClick={() => handleVote(vote.id, 'no')}
                      className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-xl text-xs font-bold transition-all border border-red-500/20"
                    >
                      {loadingAction ? <Loader2 className="w-4 h-4 animate-spin" /> : "Rejeter"}
                    </button>
                  </div>
                </div>
              )) : (
                <div className="glass-panel p-10 rounded-2xl text-center border border-white/5">
                    <RefreshCcw className="w-10 h-10 text-gray-600 mx-auto mb-4 opacity-30" />
                    <p className="text-sm text-gray-500">Aucune demande de swap en cours dans ce groupe.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default GroupDetails;
