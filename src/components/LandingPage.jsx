import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Zap, Bot, Globe, Smartphone, MessageSquare, Mail,
  Link, Share2, Rss, Users, CheckCircle, ArrowRight, 
  Moon, Sun, AlertTriangle, BookOpen, UserCheck, Eye, 
  Lock, RefreshCw, Bell, CreditCard, Brain, ChevronDown,
  Star, TrendingUp, Shield, Activity, MousePointer2,
  Menu, X, Play, Github
} from 'lucide-react';
import BeninMoneyAnimation from './BeninMoneyAnimation';
import logoOfficial from '../assets/logo_official.png';

const LandingPage = ({ onNavigateLogin, theme, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('tontine');
  const [openFaq, setOpenFaq] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0b1120] text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* BACKGROUND DECORATIONS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full blur-[120px] opacity-20 ${theme === 'dark' ? 'bg-green-700' : 'bg-green-400'}`} />
        <div className={`absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] rounded-full blur-[120px] opacity-10 ${theme === 'dark' ? 'bg-yellow-600' : 'bg-yellow-400'}`} />
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 glass-morphism-dark !bg-opacity-80 shadow-xl' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-md opacity-40 group-hover:opacity-80 transition-opacity" />
              <img src={logoOfficial} alt="TontineChain" className="w-24 h-24 rounded-xl relative z-10 transform group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-black text-2xl tracking-tighter">Tontine<span className="text-yellow-500">Chain</span></span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-10 text-sm font-bold tracking-wide uppercase">
            {['Solutions', 'Sécurité', 'IA Yao', 'À Propos'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-yellow-500 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            >
              {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
            </button>
            <button 
              onClick={onNavigateLogin}
              className="hidden md:block font-bold hover:text-yellow-500 transition-colors"
            >
              Connexion
            </button>
            <button 
              onClick={onNavigateLogin}
              className="hidden md:flex bg-green-700 hover:bg-blue-500 text-white font-black px-6 py-3 rounded-2xl shadow-lg shadow-green-900/30 transform hover:-translate-y-1 active:scale-95 transition-all items-center gap-2"
            >
              Démarrer <ArrowRight size={18} />
            </button>
            <button
              className="md:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-40 md:hidden pt-24 px-6 flex flex-col gap-6 ${theme === 'dark' ? 'bg-[#0b1120]/95 backdrop-blur-xl' : 'bg-slate-50/95 backdrop-blur-xl'}`}
          >
            {['Solutions', 'Sécurité', 'IA Yao', 'À Propos'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-black hover:text-yellow-500 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-4 mt-8">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onNavigateLogin(); }}
                className={`w-full font-bold py-4 border rounded-2xl ${theme === 'dark' ? 'text-white border-white/10' : 'text-slate-900 border-slate-200'}`}
              >
                Connexion
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onNavigateLogin(); }}
                className="w-full bg-green-700 hover:bg-blue-500 text-white font-black px-6 py-4 rounded-2xl shadow-lg shadow-green-900/30 flex justify-center items-center gap-2"
              >
                Démarrer <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 text-center lg:text-left pt-10 lg:pt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-yellow-500 text-xs font-black uppercase tracking-[0.2em] mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              L'excellence de la Tontine 2.0
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tighter">
              Épargnez avec <br />
              <span className="text-gradient-premium">Confiance.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-base md:text-xl text-slate-400 max-w-xl mb-8 lg:mb-10 leading-relaxed mx-auto lg:mx-0 px-4 lg:px-0">
              <span className="text-white font-bold block mb-2 text-lg lg:text-2xl">Vos tontines perdent de l'argent à cause des fraudes ?</span>
              TontineChain les sécurise sur la <span className="text-yellow-500 font-bold">Blockchain</span>. Fini les risques, place à la sérénité.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 lg:gap-5 px-6 lg:px-0">
              <button 
                onClick={onNavigateLogin}
                className="group bg-green-700 text-white font-black px-8 py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-xl shadow-green-900/30 w-full sm:w-auto"
              >
                Voir la démo <Play className="group-hover:translate-x-1 transition-transform" size={20} fill="currentColor" />
              </button>
              <a 
                href="https://github.com/votre-repo" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all w-full sm:w-auto font-bold"
              >
                <Github size={20} />
                GitHub
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md text-xs">
                  <Star size={12} className="text-yellow-400" fill="currentColor" /> 128
                </div>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto lg:mx-0 text-left">
              <img src="https://i.pravatar.cc/150?img=11" alt="Sessi" className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover" />
              <div>
                <div className="flex text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-xs text-slate-300 italic mb-1">"Depuis que mon groupe utilise TontineChain, plus personne ne fuit avec la caisse. C'est transparent."</p>
                <p className="text-xs font-bold text-white">— Sessi, Commerçante à Dantokpa</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Sécurité', icon: Shield, color: 'text-green-500' },
                { label: 'Rapidité', icon: Zap, color: 'text-yellow-500' },
                { label: 'Blockchain', icon: Globe, color: 'text-yellow-500' }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <feature.icon className={feature.color} size={24} />
                  <span className="font-bold text-sm uppercase tracking-wider">{feature.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* DYNAMIC VISUAL ELEMENT: BENIN MAP + MONEY RAIN (VISIBLE ON MOBILE) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative order-1 lg:order-2 w-full max-w-[280px] sm:max-w-[400px] lg:max-w-full mx-auto"
          >
            <BeninMoneyAnimation />
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 relative overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {[
            { value: 250, label: 'Volume Transigé', suffix: 'M+', unit: 'FCFA' },
            { value: 99.9, label: 'Sécurité Blockchain', suffix: '%', unit: '' },
            { value: 15, label: 'Tontines Créées', suffix: 'k', unit: '+' },
            { value: 0, label: 'Détournements', suffix: '', unit: 'Plaintes' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <h3 className="text-3xl lg:text-5xl font-black text-gradient-premium mb-2 group-hover:scale-110 transition-transform duration-500">
                {stat.value}{stat.suffix}
              </h3>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] lg:text-xs">{stat.label}</p>
              {stat.unit && <p className="text-[10px] text-yellow-500/60 font-black mt-1">{stat.unit}</p>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* POURQUOI LA BLOCKCHAIN / DEMO */}
      <section className="py-24 px-4 bg-blue-900/10 border-b border-white/5" id="pourquoi-blockchain">
        <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-[0.2em] mb-6">
              <AlertTriangle size={16} /> Le Problème
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
              <span className="text-red-500">47%</span> des tontines informelles au Bénin <br/> connaissent des fraudes.
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              La confiance ne suffit plus. Les détournements de fonds et les retards de paiement détruisent des projets de vie. La blockchain élimine le besoin de faire confiance à un humain pour garder l'argent.
            </p>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="text-yellow-500" size={24} />
                <h4 className="font-black text-lg">Contrat Déployé (Polygon Testnet)</h4>
              </div>
              <p className="text-xs text-slate-500 mb-3 font-mono break-all">0x7a59...4F9b</p>
              <a href="https://mumbai.polygonscan.com/" target="_blank" rel="noreferrer" className="text-sm font-bold text-yellow-500 hover:text-blue-400 flex items-center gap-2">
                Voir sur Polygonscan <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="relative pt-[56.25%] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Demo thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                <button className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/50 hover:scale-110 transition-transform relative z-10">
                  <Play size={32} fill="currentColor" className="text-white ml-2" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-bold text-white z-10">
                  <span>Démo Produit (1:24)</span>
                  <span>Tontine → Smart Contract → Paiement</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE SOLUTIONS */}
      <section className="py-32 px-4" id="solutions">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl text-center lg:text-left"
            >
              <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">Une solution pour chaque <br /><span className="text-yellow-500">vision d'épargne.</span></h2>
              <p className="text-slate-400 text-lg">Nous avons réinventé la tontine traditionnelle pour la rendre inviolable, transparente et accessible à tous.</p>
            </motion.div>
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md overflow-x-auto no-scrollbar max-w-full">
              {['tontine', 'securite', 'ia'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-green-700 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {activeTab === 'tontine' && (
                <>
                  {[
                    { title: 'Tontine Adogbè', desc: 'Épargne quotidienne flexible pour vos projets court terme.', icon: Star },
                    { title: 'Tontine Confiance', desc: 'Groupes privés restreints pour investissements majeurs.', icon: Users },
                    { title: 'Tontine Mobile', desc: 'Paiements directs via MTN & Moov Money sans intermédiaire.', icon: Smartphone }
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-green-700/10 hover:border-blue-500/30 transition-all overflow-hidden"
                    >
                      <div className="absolute -right-8 -top-8 w-32 h-32 bg-green-700/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
                      <div className="w-16 h-16 rounded-2xl bg-green-700/20 flex items-center justify-center text-yellow-500 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <card.icon size={32} />
                      </div>
                      <h4 className="text-2xl font-black mb-4">{card.title}</h4>
                      <p className="text-slate-400 mb-8 leading-relaxed">{card.desc}</p>
                      <button className="flex items-center gap-2 text-sm font-black text-yellow-500 uppercase tracking-widest group-hover:gap-4 transition-all">
                        En savoir plus <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  ))}
                </>
              )}
              {activeTab === 'securite' && (
                <>
                  {[
                    { title: 'Smart Contracts', desc: 'Logique immuable sur Polygon pour une transparence totale.', icon: ShieldCheck },
                    { title: 'Multi-Sig Wallet', desc: 'Protection avancée des fonds contre les accès non autorisés.', icon: Lock },
                    { title: 'Audit Continu', icon: Eye, desc: 'Surveillance en temps réel des flux financiers du groupe.' }
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-green-700/10 hover:border-blue-500/30 transition-all overflow-hidden"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-green-700/20 flex items-center justify-center text-yellow-500 mb-8">
                        <card.icon size={32} />
                      </div>
                      <h4 className="text-2xl font-black mb-4">{card.title}</h4>
                      <p className="text-slate-400 mb-8 leading-relaxed">{card.desc}</p>
                    </motion.div>
                  ))}
                </>
              )}
              {activeTab === 'ia' && (
                <>
                  {[
                    { title: 'Prédiction de Risque', desc: 'L\'IA analyse les comportements pour prévenir les défauts.', icon: Brain },
                    { title: 'Rappels Intelligents', desc: 'Notifications personnalisées basées sur vos habitudes.', icon: Bell },
                    { title: 'Conseils Epargne', icon: Zap, desc: 'Optimisation de vos tours pour maximiser vos intérêts.' }
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-green-700/10 hover:border-blue-500/30 transition-all overflow-hidden"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-green-700/20 flex items-center justify-center text-yellow-500 mb-8">
                        <card.icon size={32} />
                      </div>
                      <h4 className="text-2xl font-black mb-4">{card.title}</h4>
                      <p className="text-slate-400 mb-8 leading-relaxed">{card.desc}</p>
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* YAO AI SECTION */}
      <section className="py-32 px-4 relative overflow-hidden" id="yao">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-700/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-700/10 border border-yellow-500/30 text-yellow-500 text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Bot size={16} /> Intelligence Artificielle
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">Rencontrez <br /> <span className="text-yellow-500 italic">YAO.</span></h2>
            <div className="space-y-6">
              {[
                { title: 'Conseils Personnalisés', desc: 'Yao analyse votre capacité d\'épargne et vous propose les meilleurs groupes.', icon: Brain },
                { title: 'Prévention des Risques', desc: 'Détection automatique des comportements suspects pour protéger le groupe.', icon: ShieldCheck },
                { title: 'Support 24/7', desc: 'Posez vos questions à Yao en langue locale (Fon, Yoruba, Français).', icon: MessageSquare }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-4 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-yellow-500 shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-black mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full animate-pulse" />
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-tr from-green-600/20 to-yellow-900/20 rounded-full flex items-center justify-center border border-yellow-500/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                {/* Logo Officiel Animé */}
                <motion.div 
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-full flex items-center justify-center overflow-hidden group"
                >
                  <img src={logoOfficial} alt="TontineChain Logo" className="w-full h-full object-contain" />
                  {/* Gloss effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                </motion.div>
                
                {/* Orbital icons */}
                {[Shield, Lock, Bell, MessageSquare].map((Icon, i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ rotate: `${i * 90}deg` }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                      style={{ transform: `translateY(-140px) rotate(-${i * 90}deg)` }}
                    >
                      <Icon size={20} />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECURITY GRID */}
      <section className="py-32 px-4" id="securite">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-black mb-6">Zéro compromis sur la <span className="text-yellow-500">Sécurité.</span></h2>
            <p className="text-slate-400 text-lg">Nous utilisons les technologies les plus avancées pour protéger chaque franc que vous épargnez.</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4 lg:gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 bg-white/5 border border-white/10 p-8 lg:p-12 rounded-[2.5rem] hover:bg-green-700/5 transition-colors group relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-700/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
              <ShieldCheck className="text-yellow-500 mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" size={64} />
              <h3 className="text-3xl font-black mb-4">Contrats Intelligents</h3>
              <p className="text-slate-400 leading-relaxed mb-8">Chaque tontine est un Smart Contract autonome sur Polygon. Personne, pas même TontineChain, ne peut détourner les fonds.</p>
              <div className="flex flex-wrap gap-2">
                {['Immuable', 'Open Source', 'Audité'].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-xl bg-white/10 text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </motion.div>
            
            {[
              { title: 'KYC Strict', icon: UserCheck, desc: 'Identité vérifiée via NPI.' },
              { title: 'OTP Email', icon: Mail, desc: 'Connexion sécurisée par email.' },
              { title: 'Dépôt Garanti', icon: Lock, desc: 'Fonds sécurisés par Mobile Money.' },
              { title: 'Score Confiance', icon: Star, desc: 'Algorithme anti-fraude.' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-all group">
                <item.icon className="text-yellow-500 mb-6 group-hover:-translate-y-1 transition-transform" size={32} />
                <h4 className="text-xl font-black mb-2">{item.title}</h4>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARCHE ET BUSINESS MODEL */}
      <section className="py-24 px-4 bg-[#0b1120]" id="business">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">Un marché gigantesque. <br/><span className="text-yellow-500">Un modèle pérenne.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Marche */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10"
            >
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3"><TrendingUp className="text-green-500" /> Le Marché (Bénin)</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-slate-400">Taille du marché tontine</span>
                  <span className="font-black text-xl">~1.2 Milliards $</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-slate-400">Population non-bancarisée</span>
                  <span className="font-black text-xl text-red-400">72%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Volume estimé (TAM)</span>
                  <span className="font-black text-xl text-blue-400">500M+ FCFA/mois</span>
                </div>
              </div>
            </motion.div>

            {/* Business Model */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10"
            >
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3"><CreditCard className="text-yellow-500" /> Modèle Économique</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-green-700/10 border border-yellow-500/30">
                  <h4 className="font-black text-yellow-500 mb-2">0.5%</h4>
                  <p className="text-sm text-slate-400">Frais de transaction par cycle sur les gros montants.</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                  <h4 className="font-black text-purple-500 mb-2">B2B SaaS</h4>
                  <p className="text-sm text-slate-400">Abonnement pour les SFD et institutions de microfinance.</p>
                </div>
                <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 sm:col-span-2">
                  <h4 className="font-black text-green-500 mb-2">Yield Farming (DeFi)</h4>
                  <p className="text-sm text-slate-400">Génération d'intérêts sur la liquidité bloquée via Aave/Compound (optionnel).</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Roadmap */}
          <div className="relative pt-12">
            <h3 className="text-2xl font-black mb-12 text-center">Roadmap Q3 2026 - Q1 2027</h3>
            <div className="flex flex-col md:flex-row justify-between gap-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 hidden md:block" />
              {[
                { q: "Q3 2026", title: "Lancement MVP", desc: "Mainnet Polygon, Intégration MTN MoMo, 50 groupes pilotes." },
                { q: "Q4 2026", title: "Scale & Partenariats", desc: "Partenariat SFD locaux, KYC automatisé, Application mobile native." },
                { q: "Q1 2027", title: "DeFi & Crédit", desc: "Micro-crédit basé sur l'historique tontine, expansion Togo/Côte d'Ivoire." }
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center md:w-1/3">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-black flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30 border-4 border-[#0b1120]">
                    {i + 1}
                  </div>
                  <h4 className="font-black text-blue-400 mb-2">{step.q} : {step.title}</h4>
                  <p className="text-sm text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 lg:p-20 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
            
            <h2 className="text-6xl md:text-8xl font-black mb-10 leading-none tracking-tighter relative z-10">
              Rejoignez la <br /> <span className="text-gradient-premium">Révolution.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto relative z-10">
              Rejoignez des milliers de béninois qui épargnent déjà sereinement. Votre avenir financier commence avec un clic.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNavigateLogin}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black px-12 py-6 rounded-[2rem] text-xl shadow-2xl shadow-blue-600/40 transition-all"
              >
                Créer mon compte gratuitement
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Background blobs for CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-32 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Questions Fréquentes</h2>
            <p className="text-slate-400">Tout ce que vous devez savoir sur TontineChain.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "Comment TontineChain sécurise-t-il mon argent ?", a: "Vos fonds sont bloqués dans des Smart Contracts audités sur la blockchain Polygon. Aucun intermédiaire ne peut y toucher." },
              { q: "Qui est Yao ?", a: "Yao est votre assistant personnel propulsé par l'IA qui analyse les risques et vous conseille sur vos épargnes." },
              { q: "Quels sont les frais ?", a: "L'utilisation de TontineChain est gratuite pour les utilisateurs. Les frais de blockchain sont pris en charge par notre technologie Gasless." }
            ].map((faq, i) => (
              <div key={i} className="glass-morphism-dark rounded-2xl border border-white/10 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold"
                >
                  {faq.q}
                  <ChevronDown className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} size={20} />
                </button>
                {openFaq === i && (
                  <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-4 border-t border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <img src={logoOfficial} alt="TontineChain" className="w-10 h-10 rounded-xl" />
              <span className="font-black text-2xl tracking-tighter">Tontine<span className="text-yellow-500">Chain</span></span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-6">
              La tontine 2.0 pour l'Afrique. Épargne, crédit et confiance unifiés dans une application mobile révolutionnaire.
            </p>
            <a href="mailto:contact@tontinechain.com" className="text-blue-500 font-bold mb-8 block hover:underline">contact@tontinechain.com</a>
            <div className="flex gap-4">
              {[Share2, Link, Rss, Globe].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-black uppercase tracking-[0.2em] text-xs text-blue-500 mb-8">Produit</h5>
            <ul className="space-y-4 text-slate-400 font-bold text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Tontines Adogbè</li>
              <li className="hover:text-white cursor-pointer transition-colors">Groupes de Confiance</li>
              <li className="hover:text-white cursor-pointer transition-colors">IA Yao Advisor</li>
              <li className="hover:text-white cursor-pointer transition-colors">Blockchain Explorer</li>
            </ul>
          </div>

          <div>
            <h5 className="font-black uppercase tracking-[0.2em] text-xs text-blue-500 mb-8">Entreprise</h5>
            <ul className="space-y-4 text-slate-400 font-bold text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">À Propos</li>
              <li className="hover:text-white cursor-pointer transition-colors">Partenaires (MTN/Moov)</li>
              <li className="hover:text-white cursor-pointer transition-colors">SFD & Microfinance</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          <div>
            <h5 className="font-black uppercase tracking-[0.2em] text-xs text-blue-500 mb-8">Téléchargement</h5>
            <div className="space-y-3">
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl flex items-center gap-3 transition-all">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white"><Smartphone size={24}/></div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 font-black uppercase">Disponible sur</p>
                  <p className="font-black">App Store</p>
                </div>
              </button>
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl flex items-center gap-3 transition-all">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white"><Globe size={24}/></div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 font-black uppercase">Disponible sur</p>
                  <p className="font-black">Play Store</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-bold">© 2026 TontineChain. Fait avec ❤️ à Cotonou pour l'Afrique.</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <span className="hover:text-blue-500 cursor-pointer">Confidentialité</span>
            <span className="hover:text-blue-500 cursor-pointer">CGU</span>
            <span className="hover:text-blue-500 cursor-pointer">Sécurité</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
