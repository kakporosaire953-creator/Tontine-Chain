import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Search, Users, Check, CheckCheck } from 'lucide-react';

const Messagerie = ({ onBack, user, groups = [] }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    let interval;
    if (activeChat) {
      fetchMessages();
      interval = setInterval(fetchMessages, 5000); // Poll every 5s
    }
    return () => clearInterval(interval);
  }, [activeChat]);

  const fetchMessages = async () => {
    if (!activeChat) return;
    try {
      const { getMessages } = await import('../services/api');
      const res = await getMessages(activeChat.id);
      setMessages(res.data);
    } catch (err) {
      console.error("Erreur messages:", err);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChat]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !activeChat) return;

    const text = input;
    setInput('');
    
    try {
      const { sendMessage } = await import('../services/api');
      const res = await sendMessage(activeChat.id, { message: text });
      setMessages([...messages, res.data]);
    } catch (err) {
      console.error("Erreur envoi:", err);
    }
  };

  const filteredConversations = groups.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Chat list view
  if (!activeChat) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        {/* Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 16, background: 'var(--bg-secondary)' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex' }}>
            <ArrowLeft size={22} />
          </button>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Messagerie</h2>
          <span className="badge badge-info" style={{ marginLeft: 'auto' }}>
            {conversations.reduce((sum, c) => sum + c.unread, 0)} non lus
          </span>
        </div>

        {/* Search */}
        <div style={{ padding: '16px 24px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher une conversation..."
              className="input-field"
              style={{ paddingLeft: 42 }}
            />
          </div>
        </div>

        {/* Conversations list */}
        <div style={{ padding: '0 24px' }}>
          {filteredConversations.map((conv, i) => (
            <motion.div key={conv.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => { setActiveChat(conv); }}
              className="card" style={{ marginBottom: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px' }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--bg-card-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                🏦
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{conv.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{conv.frequency}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                    {conv.current_members} membres • {conv.contribution_amount} FCFA
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Chat detail view
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-primary)' }}>
      {/* Chat header */}
      <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 14, background: 'var(--bg-secondary)' }}>
        <button onClick={() => setActiveChat(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex' }}>
          <ArrowLeft size={22} />
        </button>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--bg-card-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
          🏦
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{activeChat.name}</h3>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>
            <Users size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
            {activeChat.current_members} membres
          </p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((msg, i) => {
          const isMe = msg.user_id === user?.id;
          return (
            <motion.div key={msg.id || i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
              {!isMe && (
                <span style={{ fontSize: 11, color: '#f39c12', fontWeight: 600, marginBottom: 2, marginLeft: 4 }}>{msg.user?.full_name}</span>
              )}
              <div className={isMe ? 'chat-bubble chat-bubble-user' : 'chat-bubble chat-bubble-ai'}>
                <p style={{ margin: 0 }}>{msg.message}</p>
              </div>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4, padding: '0 4px' }}>
                {new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                {isMe && <CheckCheck size={12} color="#10b981" />}
              </span>
            </motion.div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: 12 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Écrire un message..."
            className="input-field"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '12px 16px', borderRadius: 12 }}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messagerie;
