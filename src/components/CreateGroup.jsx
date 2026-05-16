import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Wallet, Calendar, Shield, ArrowLeft, Loader2, Plus } from 'lucide-react';
import { createGroup } from '../services/api';

const CreateGroup = ({ onBack, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: 10000,
    frequency: 'monthly',
    max_members: 10,
    insurance_percent: 5
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        contribution_amount: Number(formData.amount),
        max_members: Number(formData.max_members),
        frequency: formData.frequency,
        payout_method: 'sequential', 
        start_date: new Date(Date.now() + 86400000 * 7).toISOString(), 
        insurance_opt_in: true
      };
      const response = await createGroup(payload);
      onCreate(response.data);
    } catch (err) {
      console.error("Erreur création groupe:", err);
      alert("Erreur lors de la création du groupe. Veuillez vérifier les informations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tontine-darker text-white font-inter p-6 relative overflow-hidden">
      <div className="max-w-md mx-auto relative z-10">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Retour
        </button>

        <h1 className="text-3xl font-playfair font-bold mb-8">Créer une nouvelle Tontine</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-5 border border-white/5">
            {/* Estimation Card (Dynamic) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-tontine-orange/20 to-tontine-gold/10 p-4 rounded-xl border border-tontine-orange/30 text-center"
            >
                <p className="text-[10px] text-tontine-orange font-bold uppercase tracking-widest mb-1">Estimation du Pot Final</p>
                <h2 className="text-2xl font-bold text-white">
                    {((formData.amount * formData.max_members) * (1 - formData.insurance_percent / 100)).toLocaleString()} <span className="text-sm">FCFA</span>
                </h2>
                <p className="text-[9px] text-gray-500 mt-1 italic">Calculé après déduction de {formData.insurance_percent}% de caisse de secours.</p>
            </motion.div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Nom de la Tontine</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-tontine-orange outline-none transition-all"
                placeholder="Ex: Tontine des Commerçants"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Cotisation (FCFA)</label>
                <div className="relative">
                    <Wallet className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-tontine-orange outline-none transition-all font-bold text-sm"
                    required
                    />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Membres max</label>
                <div className="relative">
                    <Users className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                    type="number"
                    value={formData.max_members}
                    onChange={(e) => setFormData({ ...formData, max_members: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-tontine-orange outline-none transition-all text-sm"
                    required
                    />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Fréquence</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-tontine-orange outline-none transition-all appearance-none text-sm"
                  >
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuelle</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Caisse Secours (%)</label>
                <div className="relative">
                    <Shield className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                    <input
                    type="number"
                    value={formData.insurance_percent}
                    onChange={(e) => setFormData({ ...formData, insurance_percent: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-tontine-orange outline-none transition-all text-sm"
                    required
                    />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-tontine-orange to-tontine-gold text-tontine-darker font-bold py-4 rounded-xl shadow-lg shadow-tontine-orange/30 flex items-center justify-center gap-2 text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <><Plus className="w-6 h-6" /> Lancer cette Tontine</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
