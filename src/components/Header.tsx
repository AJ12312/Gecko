"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Circle, X, Command } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ActionSearchBar } from './ui/action-search-bar';
import { cn } from "@/lib/utils";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  // Handle keyboard shortcut ⌘K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearchSubmit = (query: string) => {
    setIsSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}&sort=vibe`);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[60] flex justify-center w-full"
      style={{ fontFamily: "'Satoshi', sans-serif" }}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative"
        style={{
          background: "rgba(15,17,21,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Subtle emerald sweep on bottom border */}
        <div className="absolute bottom-0 left-0 h-[1px] w-full overflow-hidden">
          <motion.div
            className="h-full w-[15%]"
            style={{
              background: "linear-gradient(to right, transparent, rgba(16,185,129,0.35), transparent)",
            }}
            animate={{ x: ["-100%", "700%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
          />
        </div>

        {/* ── Logo ────────────────────────────────── */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#F8FAFC",
              }}
            >
              Gecko
            </span>
            <motion.span
              style={{
                display: "inline-block",
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "#10B981",
                marginBottom: "2px",
              }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </Link>
        </div>

        {/* ── Desktop Nav ─────────────────────────── */}
        <nav className="hidden lg:flex items-center space-x-8">
          <NavLink href="/regions">Region Grid</NavLink>

          <NavLink href="/search">
            <span className="flex items-center gap-2">
              Agentic Search
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ background: "#10B981" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#10B981" }} />
              </span>
            </span>
          </NavLink>

          <NavLink href="/deploy">
            <span className="flex items-center gap-1.5">
              Deploy
              <span
                className="px-2 py-0.5 rounded-full text-black"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: "8px",
                  letterSpacing: "0.08em",
                  background: "#10B981",
                }}
              >
                PRO
              </span>
            </span>
          </NavLink>

          <NavLink href="/estimate">Estimate™</NavLink>
          <NavLink href="/analytics">Intelligence</NavLink>
          <NavLink href="/compliance" highContrast>RERA</NavLink>
        </nav>

        {/* ── Right Controls ──────────────────────── */}
        <div className="flex items-center space-x-5">
          <Link href="/community" className="text-white/30 hover:text-white/70 transition-colors duration-200">
            <Circle className="w-4 h-4 stroke-[1.5]" />
          </Link>

          {/* Search Dropdown Toggle */}
          <div className="relative">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={cn(
                "transition-all duration-300 relative group flex items-center gap-3 px-3 py-1.5 rounded-full border",
                isSearchOpen 
                  ? "bg-white/10 border-gecko-emerald/30 text-white" 
                  : "bg-white/5 border-white/5 text-white/30 hover:text-white/70"
              )}
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
              <div className="hidden md:flex items-center space-x-1 text-white/20">
                <span className="text-[10px] font-data">⌘K</span>
              </div>
            </button>

            {/* ── Search Dropdown Panel ─────────────────── */}
            <AnimatePresence>
              {isSearchOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute right-0 mt-3 w-[400px] z-[100]"
                  >
                    <div className="luxury-card p-1 shadow-2xl overflow-hidden border border-white/10 bg-[#1A1D23]/95 backdrop-blur-2xl">
                      <ActionSearchBar 
                        onSearch={handleSearchSubmit} 
                        placeholder="Analyze markets, RERA..."
                      />
                    </div>
                  </motion.div>
                  {/* Backdrop to close when clicking outside */}
                  <div 
                    className="fixed inset-0 z-[-1] cursor-default"
                    onClick={() => setIsSearchOpen(false)}
                  />
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            className="pill-btn px-5 py-2 hidden sm:block"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              color: "rgba(248,250,252,0.75)",
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
  highContrast = false,
}: {
  href: string;
  children: React.ReactNode;
  highContrast?: boolean;
}) {
  return (
    <Link href={href}>
      <motion.div
        className="relative overflow-hidden flex items-center cursor-pointer group"
        initial="initial"
        whileHover="hover"
      >
        <motion.div
          variants={{
            initial: { y: 0, opacity: 1 },
            hover: { y: "-100%", opacity: 0 },
          }}
          transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: highContrast ? 600 : 400,
            fontSize: "13px",
            color: highContrast ? "rgba(248,250,252,0.9)" : "rgba(248,250,252,0.45)",
          }}
        >
          {children}
        </motion.div>
        <motion.div
          variants={{
            initial: { y: "100%", opacity: 0, position: "absolute", left: 0 },
            hover: { y: 0, opacity: 1, position: "absolute", left: 0 },
          }}
          transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: highContrast ? 600 : 500,
            fontSize: "13px",
            color: "#F8FAFC",
            whiteSpace: "nowrap",
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </Link>
  );
}
