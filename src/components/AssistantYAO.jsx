import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, TrendingUp, CalendarClock, HelpCircle, ArrowLeft, Volume2, Loader2 } from 'lucide-react';
import AudioButton from './AudioButton';

const AssistantYAO = ({ onBack, user }) => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(`yao_chat_${user?.id || 'guest'}`);
    if (saved) {
      try { return JSON.parse(saved); } catch(e) { console.error(e); }
    }
    return [
      {
        role: 'ai',
        text: `👋 Bonjour ${user?.first_name || ''} ! Je suis **YAO**, votre assistant IA personnel.\n\nJe peux vous aider à :\n• 📊 Analyser vos habitudes d'épargne\n• 📅 Gérer vos échéances\n• 💡 Optimiser vos cotisations\n• ❓ Répondre à vos questions\n\nComment puis-je vous aider aujourd'hui ?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem(`yao_chat_${user?.id || 'guest'}`, JSON.stringify(messages));
  }, [messages, user]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const suggestions = [
    { icon: <TrendingUp size={14} />, label: "Mon solde", query: "Quel est mon solde actuel ?" },
    { icon: <CalendarClock size={14} />, label: "Prochaines échéances", query: "Quelles sont mes prochaines échéances ?" },
    { icon: <Sparkles size={14} />, label: "Améliorer mon score", query: "Comment puis-je améliorer mon score de confiance ?" },
    { icon: <HelpCircle size={14} />, label: "Fonctionnement", query: "Comment fonctionne le système d'enchères ?" },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', text: msg, time: timestamp }]);
    setInput('');
    setIsTyping(true);

    try {
      const { chatWithAi } = await import('../services/api');
      const res = await chatWithAi({ message: msg });
      
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: res.data.response || res.data.message || "Je n'ai pas pu générer de réponse.", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error("Erreur IA:", err);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "Désolé, j'ai rencontré une petite erreur technique. Pouvez-vous répéter ?", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderText = (text) => {
    return text.split('\n').map((line, i) => {
      const boldParsed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} className="mb-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: boldParsed }} />;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-tontine-darker text-white font-inter">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center gap-4 bg-tontine-darker/80 backdrop-blur-md sticky top-0 z-20">
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={22} className="text-gray-400" />
        </button>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Bot size={22} className="text-white" />
        </div>
        <div>
          <h3 className="text-sm font-bold">YAO Assistant</h3>
          <p className="text-[10px] text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            En ligne • IA Multilingue
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] relative ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-purple-600/20 flex items-center justify-center">
                      <Bot size={12} className="text-purple-400" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Assistant YAO</span>
                  </div>
                )}
                
                <div className={`p-4 rounded-2xl text-sm shadow-xl ${
                  msg.role === 'user' 
                    ? 'bg-tontine-orange text-tontine-darker font-medium rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none backdrop-blur-sm'
                }`}>
                  {renderText(msg.text)}
                  
                  {msg.role === 'ai' && (
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                        <AudioButton label="Écouter YAO" textToSpeak={msg.text.replace(/\*\*/g, '')} />
                        <span className="text-[8px] text-gray-500 font-mono">{msg.time}</span>
                    </div>
                  )}
                  {msg.role === 'user' && (
                    <span className="block mt-1 text-[8px] opacity-50 font-mono">{msg.time}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center">
              <Loader2 size={16} className="text-purple-400 animate-spin" />
            </div>
            <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10">
              <div className="flex gap-1">
                {[0, 1, 2].map(d => (
                  <span key={d} className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: `${d * 0.15}s` }}></span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestions Overlay */}
      <div className="px-6 py-2 flex gap-2 overflow-x-auto hide-scrollbar bg-tontine-darker/50 backdrop-blur-sm">
        {suggestions.map((s, i) => (
          <button 
            key={i} 
            onClick={() => handleSend(s.query)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 hover:text-tontine-orange hover:border-tontine-orange/50 transition-all whitespace-nowrap"
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-6 bg-tontine-darker border-t border-white/5">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Échangez avec YAO..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-tontine-orange outline-none transition-all"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="bg-tontine-orange text-tontine-darker p-3.5 rounded-xl shadow-lg shadow-tontine-orange/20 disabled:opacity-50 transition-all active:scale-95"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssistantYAO;
