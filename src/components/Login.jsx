import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Phone, CheckCircle2, Loader2, Mail, User as UserIcon, UserCheck, Briefcase } from 'lucide-react';
import logoOfficial from '../assets/logo_official.png';
import { requestOtp, verifyOtp, updateMe } from '../services/api';
import AudioButton from './AudioButton';

const Login = ({ onLoginSuccess }) => {
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'profile'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [npi, setNpi] = useState('');
  const [profession, setProfession] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tempUser, setTempUser] = useState(null);

  const [locale, setLocale] = useState('fr');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Veuillez entrer un email valide.');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      await requestOtp({ email, locale });
      setStep('otp');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la demande OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) return;

    setLoading(true);
    setError('');
    try {
      const response = await verifyOtp({ email, code });
      const { access_token, user, needs_profile_completion } = response.data;
      
      localStorage.setItem('tontine_token', access_token);
      
      if (needs_profile_completion) {
        setTempUser(user);
        setStep('profile');
      } else {
        onLoginSuccess(user);
      }
    } catch (err) {
      console.error("Erreur OTP:", err);
      setError(err.response?.data?.error || 'Code invalide ou expiré.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await updateMe({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        profession: profession,
        npi: npi,
        full_name: `${firstName} ${lastName}`
      });
      onLoginSuccess(response.data.user || response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour du profil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tontine-darker relative overflow-hidden px-4">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-tontine-orange/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel p-8 sm:p-12 rounded-3xl max-w-md w-full relative z-10 shadow-2xl shadow-black/50 border border-white/5"
      >
        
        {/* Header Logo */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-tr from-tontine-orange to-tontine-gold rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-tontine-orange/30 mb-6"
          >
            <img src={logoOfficial} alt="Logo" className="w-12 h-12 rounded-xl" />
          </motion.div>
          <h1 className="text-3xl font-playfair font-bold text-white mb-2">TontineChain</h1>
          <p className="text-gray-400 text-sm font-inter">Accès sécurisé sans mot de passe</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'email' ? (
            <motion.form 
              key="email"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleRequestOtp}
            >
              <div className="space-y-6">
                {/* Language Selection Grid */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Choisir ma langue / Sùn gbè</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'fr', label: 'Français', flag: '🇫🇷' },
                      { id: 'fon', label: 'Fɔngbe', flag: '🇧🇯' },
                      { id: 'yo', label: 'Yorùbá', flag: '🇳🇬' }
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        type="button"
                        onClick={() => setLocale(lang.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                          locale === lang.id 
                            ? 'bg-tontine-orange/10 border-tontine-orange text-tontine-orange' 
                            : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xl mb-1">{lang.flag}</span>
                        <span className="text-[10px] font-bold">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-300">Adresse Email</label>
                    <AudioButton label="Xó xá mì (Fon)" />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-tontine-orange focus:border-transparent transition-all outline-none"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl text-md font-bold text-tontine-darker bg-gradient-to-r from-tontine-orange to-tontine-gold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tontine-orange transition-all shadow-lg shadow-tontine-orange/20 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                    <>
                      Continuer <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          ) : step === 'otp' ? (
            <motion.form 
              key="otp"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleVerifyOtp}
            >
              <div className="text-center mb-8">
                <p className="text-gray-300 mb-2">Code envoyé à</p>
                <p className="text-tontine-gold font-bold tracking-wider">{email}</p>
              </div>

              <div className="flex justify-between mb-8 gap-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={e => handleOtpChange(e.target, index)}
                    onFocus={e => e.target.select()}
                    className="w-12 h-14 text-center text-2xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-tontine-orange outline-none transition-all"
                  />
                ))}
              </div>

              {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

              <button
                type="submit"
                disabled={loading || otp.join('').length < 6}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl text-md font-bold text-tontine-darker bg-gradient-to-r from-tontine-orange to-tontine-gold hover:opacity-90 transition-all shadow-lg shadow-tontine-orange/20 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>
                    Vérifier <CheckCircle2 className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep('email')}
                className="w-full mt-4 text-gray-400 hover:text-white text-sm transition-colors"
              >
                Changer d'adresse email
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleCompleteProfile}
            >
              <div className="text-center mb-8">
                <p className="text-tontine-gold font-bold text-lg mb-1">Dernière étape !</p>
                <p className="text-gray-300 text-sm">Complétez votre profil pour finaliser l'inscription.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Prénom</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-4 w-4 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:ring-2 focus:ring-tontine-orange outline-none transition-all"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Nom</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-4 w-4 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:ring-2 focus:ring-tontine-orange outline-none transition-all"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Téléphone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-500" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:ring-2 focus:ring-tontine-orange outline-none transition-all"
                      placeholder="+229 97000000"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Profession</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:ring-2 focus:ring-tontine-orange outline-none transition-all"
                        placeholder="Ex: Commerçant"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">N° Identification (NPI)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ShieldCheck className="h-4 w-4 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        value={npi}
                        onChange={(e) => setNpi(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:ring-2 focus:ring-tontine-orange outline-none transition-all"
                        placeholder="123456789"
                        required
                      />
                    </div>
                  </div>
                </div>

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-4 px-4 mt-6 border border-transparent rounded-xl text-md font-bold text-tontine-darker bg-gradient-to-r from-tontine-orange to-tontine-gold hover:opacity-90 transition-all shadow-lg shadow-tontine-orange/20 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                    <>
                      Créer mon compte <UserCheck className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;
