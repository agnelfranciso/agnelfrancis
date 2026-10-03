"use client";
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AIChatFAB() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'model', content: "Hi! I'm an AI assistant with knowledge about Agnel's projects. How can I help you today?" }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll only when the user sends a message
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (!mounted || pathname === '/links') return null;

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    scrollToBottom();
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'model', content: "Sorry, I encountered an error. Please try again later." }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', content: data.message }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "Network error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="ai-fab"
        aria-label="Open AI Chat"
        style={{ opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? 'none' : 'auto' }}
      >
        <span className="fab-text">Ask AI</span>
        <div className="fab-icon">
          <Bot size={20} />
        </div>
      </button>

      <div className={`ai-chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-title">
            <Bot size={18} />
            <span>AI Assistant</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="close-btn">
            <X size={18} />
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-content">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message model">
              <div className="message-content typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chat-input-area">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Agnel's projects..."
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={!input.trim() || isLoading} className="chat-send-btn" aria-label="Send Message">
            <Send size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .ai-fab {
          position: fixed;
          bottom: 90px;
          right: 30px;
          z-index: 99;
          display: flex;
          align-items: center;
          background: var(--bg-sidebar, #0F0F0F);
          color: white;
          border-radius: 30px;
          padding: 5px;
          text-decoration: none;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          overflow: hidden;
          width: 45px;
          height: 45px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
        }
        
        .fab-icon {
          width: 35px;
          height: 35px;
          min-width: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s ease;
          position: absolute;
          right: 4px;
        }
        
        .fab-text {
          font-family: 'PPSupplyMono', monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          white-space: nowrap;
          padding-left: 15px;
          padding-right: 40px;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.5s ease;
          color: white;
          font-weight: bold;
        }

        .ai-fab:hover {
          width: 140px;
          background: #3b82f6;
          box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
          border-color: rgba(255,255,255,0.2);
        }

        .ai-fab:hover .fab-text {
          opacity: 1;
          transform: translateX(0);
        }

        .ai-fab:hover .fab-icon {
          transform: rotate(-10deg);
        }
        
        .ai-chat-window {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 350px;
          height: 500px;
          max-height: calc(100vh - 60px);
          background: var(--bg-primary, #000);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          z-index: 100;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          transform: translateY(20px) scale(0.95);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .ai-chat-window.open {
          transform: translateY(0) scale(1);
          opacity: 1;
          pointer-events: auto;
        }
        
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: #111;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .chat-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'PPSupplyMono', monospace;
          font-weight: bold;
          font-size: 0.9rem;
          color: white;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          transition: color 0.2s;
          display: flex;
        }
        
        .close-btn:hover {
          color: white;
        }
        
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .message {
          display: flex;
          flex-direction: column;
        }
        
        .message.user {
          align-items: flex-end;
        }
        
        .message.model {
          align-items: flex-start;
        }
        
        .message-content {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 0.9rem;
          line-height: 1.4;
          white-space: pre-wrap;
        }
        
        .message.user .message-content {
          background: #3b82f6;
          color: white;
          border-bottom-right-radius: 4px;
        }
        
        .message.model .message-content {
          background: #222;
          color: #eee;
          border-bottom-left-radius: 4px;
        }

        .message-content :global(p) {
          margin: 0 0 8px 0;
        }

        .message-content :global(p:last-child) {
          margin-bottom: 0;
        }
        
        .message-content :global(li) {
          margin-bottom: 4px;
        }
        
        .message-content :global(li > p) {
          display: inline;
          margin-bottom: 0;
        }
        
        .message-content :global(strong) {
          font-weight: bold;
          color: white;
        }

        .message-content :global(ul), .message-content :global(ol) {
          margin-top: 4px;
          margin-bottom: 8px;
          padding-left: 20px;
        }
        
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 14px 18px !important;
          align-items: center;
        }
        
        .typing-indicator span {
          width: 6px;
          height: 6px;
          background-color: #888;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        
        .chat-input-area {
          padding: 15px;
          background: #111;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          gap: 10px;
          align-items: center;
        }
        
        .chat-input-area input {
          flex: 1;
          background: #000;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 10px 15px;
          color: white;
          font-family: 'Geist', sans-serif;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        
        .chat-input-area input:focus {
          border-color: #3b82f6;
        }
        
        .chat-send-btn {
          width: 40px;
          min-width: 40px;
          height: 40px;
          min-height: 40px;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.2s, background 0.2s;
          padding: 0;
          margin: 0;
        }
        
        .chat-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .chat-send-btn:hover:not(:disabled) {
          background: #2563eb;
        }
        

        @media (max-width: 768px) {
          .ai-fab {
            bottom: 85px;
            right: 25px;
          }
          .ai-fab:hover {
            width: 45px;
          }
          .fab-text {
            display: none;
          }
          
          .ai-chat-window {
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100dvh;
            max-height: none;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  );
}
