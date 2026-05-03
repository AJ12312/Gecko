"use client";

import { useState } from "react";
import { AnimatedAIChat } from "./ui/animated-ai-chat";
import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function GeckoChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* FAB — pill shape, emerald */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-6 right-6 p-4 rounded-full z-40 flex items-center justify-center"
        style={{
          background: "#10B981",
          boxShadow: "0 8px 24px rgba(16,185,129,0.3), 0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        <MessageSquare className="w-5 h-5" style={{ color: "#0F1115" }} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}
          >
            <div className="w-full h-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl relative">
              <AnimatedAIChat onClose={() => setIsOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
