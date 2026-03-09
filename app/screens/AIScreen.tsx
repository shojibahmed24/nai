import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, ChevronLeft, User, Bot, Trash2, MessageSquare, ArrowRight, Loader2, Copy, Share2, Check } from 'lucide-react';
import { getAIResponse, Message } from '../services/aiService';

interface AIScreenProps {
  onBack: () => void;
}

const QUICK_ACTIONS = [
  "৪ রাকাত নামাজের বৈঠকে কি পড়তে হয়?",
  "Tell me a Hadith",
  "What is Zakat?",
  "Dua for anxiety",
  "How to pray Tahajjud?",
  "ওজুর ফরজ কয়টি?"
];

export default function AIScreen({ onBack }: AIScreenProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('noor_ai_chat');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }
    return [
      {
        id: '1',
        text: "Assalamu Alaikum! I am your Noor Islamic Assistant. How can I help you with your journey of faith today?",
        sender: 'ai',
        timestamp: new Date(),
      }
    ];
  });
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('noor_ai_chat', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await getAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = (text: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Noor AI Response',
        text: text,
      }).catch(console.error);
    } else {
      handleCopy(text, 'share-fallback');
    }
  };

  const clearChat = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      const initialMessage: Message = {
        id: '1',
        text: "Assalamu Alaikum! I am your Noor Islamic Assistant. How can I help you with your journey of faith today?",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
      localStorage.removeItem('noor_ai_chat');
    }
  };

  return (
    <div className="flex flex-col h-full bg-noor-green-dark relative">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-noor-green-dark/80 backdrop-blur-xl border-b border-noor-gold/10 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 text-noor-gold hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              Noor AI <Sparkles size={16} className="text-noor-gold animate-pulse" />
            </h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Online Assistant</span>
            </div>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
          title="Clear Chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 no-scrollbar">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${msg.sender === 'user' ? 'bg-noor-gold/20 border-noor-gold/30' : 'bg-noor-green border-noor-green-light/30'}`}>
                {msg.sender === 'user' ? <User size={14} className="text-noor-gold" /> : <Bot size={14} className="text-noor-gold" />}
              </div>
              <div className={`flex flex-col gap-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`group relative px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-noor-gold text-noor-green-dark font-medium rounded-tr-none' 
                    : 'bg-white/5 text-gray-100 border border-white/10 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  
                  {/* Message Actions */}
                  {msg.sender === 'ai' && (
                    <div className="absolute -bottom-8 left-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-noor-gold transition-colors"
                      >
                        {copiedId === msg.id ? <Check size={12} /> : <Copy size={12} />}
                      </button>
                      <button 
                        onClick={() => handleShare(msg.text)}
                        className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-noor-gold transition-colors"
                      >
                        <Share2 size={12} />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-500 px-1 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-noor-green border border-noor-green-light/30 flex items-center justify-center">
                <Bot size={14} className="text-noor-gold" />
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-noor-gold/60 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-noor-gold/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-noor-gold/60 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="pt-4">
            <p className="text-noor-gold/60 text-[10px] font-bold uppercase tracking-widest mb-3 px-1">Quick Actions</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(action)}
                  className="bg-white/5 border border-white/10 hover:border-noor-gold/30 hover:bg-noor-gold/5 text-gray-300 text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 group"
                >
                  {action}
                  <ArrowRight size={12} className="text-noor-gold opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-noor-green-dark/95 backdrop-blur-xl border-t border-noor-gold/10 pb-28">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about Islam..."
              className="w-full bg-black/40 border border-noor-gold/20 text-white rounded-2xl pl-4 pr-12 py-4 focus:outline-none focus:border-noor-gold/60 transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <MessageSquare size={18} className="text-noor-gold/30" />
            </div>
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className={`p-4 rounded-2xl transition-all shadow-lg ${
              !input.trim() || isTyping 
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                : 'bg-noor-gold text-noor-green-dark hover:scale-105 active:scale-95 shadow-noor-gold/20'
            }`}
          >
            {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-center text-[10px] text-gray-500 mt-3">
          AI can make mistakes. Please verify important rulings with a scholar.
        </p>
      </div>
    </div>
  );
}