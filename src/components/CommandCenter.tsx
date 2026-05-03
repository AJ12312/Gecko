"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { openDB } from "idb";
import { Search, ShieldAlert, Trash2, Send, Cpu, Activity } from "lucide-react";

interface SessionMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: number;
}

const DB_NAME = 'gecko_command_db';
const STORE_NAME = 'session_memory';

export function CommandCenter() {
  const [messages, setMessages] = useState<SessionMessage[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  // Initialize DB and Worker
  useEffect(() => {
    const initDB = async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          }
        },
      });
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const savedMessages = await store.getAll();
      setMessages(savedMessages.sort((a, b) => a.timestamp - b.timestamp));
    };

    initDB();

    // Init Orchestrator Worker
    workerRef.current = new Worker(new URL('../workers/agenticOrchestrator.ts', import.meta.url));
    workerRef.current.onmessage = async (e) => {
      if (e.data.status === 'SUCCESS') {
        const reply: SessionMessage = {
          id: Date.now().toString(),
          text: e.data.result.finalAnswer,
          sender: 'agent',
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, reply]);
        await saveMessageToIDB(reply);
        setIsProcessing(false);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  async function saveMessageToIDB(msg: SessionMessage) {
    const db = await openDB(DB_NAME, 1);
    await db.put(STORE_NAME, msg);
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMsg: SessionMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsProcessing(true);
    await saveMessageToIDB(userMsg);

    // Dispatch to Agentic Worker
    workerRef.current?.postMessage({
      id: userMsg.id,
      type: 'EXECUTE_TASK',
      payload: { intent: userMsg.text }
    });
  };

  const purgeSessionData = async () => {
    const db = await openDB(DB_NAME, 1);
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.objectStore(STORE_NAME).clear();
    setMessages([]);
    setShowPrivacySettings(false);
  };

  return (
    <div className="flex flex-col h-full bg-surface border-l border-surface-border glass-panel">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-surface-border">
        <div className="flex items-center space-x-2">
          <Activity className="text-gecko-neon w-5 h-5" />
          <h2 className="font-bold tracking-wider text-sm gecko-text-glow text-white">GECKO COMMAND</h2>
        </div>
        <button 
          onClick={() => setShowPrivacySettings(!showPrivacySettings)}
          className="p-2 rounded-full hover:bg-surface-border transition-colors text-foreground hover:text-white"
        >
          <ShieldAlert className="w-4 h-4" />
        </button>
      </div>

      {/* Privacy Dashboard Modal */}
      <AnimatePresence>
        {showPrivacySettings && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 right-4 left-4 bg-background border border-surface-border p-4 rounded-lg z-10 shadow-2xl"
          >
            <h3 className="font-semibold text-white mb-2 flex items-center">
              <ShieldAlert className="w-4 h-4 mr-2 text-danger" /> Privacy Dashboard
            </h3>
            <p className="text-xs text-foreground mb-4">
              Gecko processes data locally. You can purge your entire session memory from IndexedDB with one click.
            </p>
            <button 
              onClick={purgeSessionData}
              className="w-full flex items-center justify-center space-x-2 bg-danger/20 text-danger hover:bg-danger/40 border border-danger/50 p-2 rounded transition-colors text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              <span>Purge Session Data</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-3 rounded-lg text-sm ${
                msg.sender === 'user' 
                  ? 'bg-gecko-muted/20 border border-gecko-muted/50 text-white rounded-tr-none' 
                  : 'bg-surface-border border border-surface-border/50 text-foreground rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-gecko-neon text-xs font-mono"
          >
            <Cpu className="w-4 h-4 animate-pulse" />
            <span>Agent reasoning in progress...</span>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-surface-border bg-background/50">
        <div className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Find properties, check RERA, estimate EMI..."
            className="w-full bg-surface border border-surface-border text-white placeholder-foreground/50 rounded-full py-3 pl-10 pr-12 focus:outline-none focus:border-gecko-neon transition-colors text-sm"
          />
          <Search className="absolute left-3 w-4 h-4 text-foreground/50" />
          <button 
            onClick={handleSend}
            disabled={isProcessing || !input.trim()}
            className="absolute right-2 p-1.5 bg-gecko-muted text-background rounded-full hover:bg-gecko-neon transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
