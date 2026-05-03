"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, FileCheck, Sparkles, Filter, ChevronDown, LayoutGrid, Info } from "lucide-react";
import { useAgentStore } from "@/store/agentStore";
import { useSearchParams, useRouter } from "next/navigation";
import { REGIONS } from "@/data/regions";
import { MiniatureRegionCard } from "@/components/MiniatureRegionCard";
import { Input } from "@/components/ui/input";

const ANALYSIS_STEPS = [
  "DECRYPTING NATURAL LANGUAGE QUERY...",
  "MAPPING GEOSPATIAL PARAMETERS...",
  "ANALYZING NCR MARKET DATA...",
  "CROSS-REFERENCING RERA REGISTRY...",
  "FILTERING BY INVESTMENT GRADE...",
  "CALCULATING TACTICAL SCORES...",
  "SYNTHESIS COMPLETE."
];

const MOCK_PROPERTIES = [
  { id: "1", title: "DLF Camellias", location: "Golf Course Rd, Gurgaon", price: "₹35,00,00,000", vibe: 98, rera: "P12345678901", type: "Ultra-Luxury" },
  { id: "2", title: "Lodha Altamount", location: "Altamount Rd, Mumbai", price: "₹8,50,00,000", vibe: 92, rera: "PR/12/34/2023/1234", type: "Premium" },
  { id: "3", title: "Prestige Kingfisher", location: "Ashok Nagar, Bangalore", price: "₹12,00,00,000", vibe: 96, rera: "PR/01/02/2022/9876", type: "Elite" },
];

function SearchPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialRegion = searchParams.get("region") || "";

  const [query, setQuery] = useState(initialQuery);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const { addTask, completeTask } = useAgentStore();

  // Initialization animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1200);
    if (initialQuery || initialRegion) {
        handleSearch(initialQuery || (initialRegion ? `Properties in ${initialRegion}` : ""));
    }
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim() || isAnalyzing) return;
    
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setResults([]);

    const taskId = addTask({ 
        label: `Analyzing: "${searchQuery}"`, 
        status: "running", 
        module: "Agentic Discovery" 
    });

    // Simulated "Agentic" reasoning
    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 450));
      setAnalysisStep(i);
    }

    await new Promise((r) => setTimeout(r, 300));
    
    // Simple NL parsing mock
    const isGurgaon = searchQuery.toLowerCase().includes("gurgaon");
    const filteredResults = isGurgaon 
        ? MOCK_PROPERTIES.filter(p => p.location.includes("Gurgaon"))
        : MOCK_PROPERTIES;

    setResults(filteredResults);
    setIsAnalyzing(false);
    completeTask(taskId);
  };

  return (
    <div className="min-h-screen bg-[#0F1115] relative overflow-hidden">
      {/* ── 1. Loading State: Scanning Line ─────────────────────────── */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ 
                boxShadow: "0 0 20px rgba(255,255,255,0.2)"
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative z-10">
        
        {/* ── 2. Header & Search Command ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-data font-medium tracking-[0.4em] text-gecko-emerald mb-4 uppercase"
            >
              Gecko Discovery Engine
            </motion.p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-wider">
              {query ? `Search: ${query}` : "Discovery"}
            </h1>
            <div className="flex items-center gap-4 mt-4">
               <span className="text-sm font-data font-medium text-white/60">
                 <span className="text-white">{results.length}</span> PROPERTIES FOUND
               </span>
               <div className="h-4 w-px bg-white/10" />
               <span className="text-[10px] font-data text-white/30 uppercase tracking-widest">
                 SORTED BY VIBE INDEX
               </span>
            </div>
          </div>

          <div className="w-full max-w-md">
             <div className="relative group">
                <Input 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
                  placeholder="Ask Gecko (e.g. 3BHK in Gurgaon under 2Cr...)"
                  className="bg-white/[0.02] border-white/5 h-12 rounded-xl pl-12 pr-4 font-sans text-sm placeholder:text-white/10 focus:bg-white/[0.04] transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gecko-emerald transition-colors" />
             </div>
             
             {/* ── Agent Feedback Status Line ────────────────────────── */}
             <AnimatePresence>
               {isAnalyzing && (
                 <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 flex items-center gap-3"
                 >
                    <span className="w-1 h-1 rounded-full bg-gecko-emerald animate-pulse" />
                    <p className="text-[10px] font-sans font-light tracking-[0.15em] text-white/40 uppercase">
                      [ {ANALYSIS_STEPS[analysisStep]} ]
                    </p>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>

        {/* ── 3. Results Grid / Empty State ─────────────────────────── */}
        <div className="min-h-[400px]">
          {isInitializing || isAnalyzing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-20 pointer-events-none grayscale">
               {[1, 2, 3].map(i => <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse" />)}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {results.map((r, i) => (
                 <motion.div 
                    key={r.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="luxury-card p-6 flex flex-col group hover:shadow-2xl hover:shadow-gecko-emerald/5 transition-all cursor-pointer"
                 >
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[9px] font-data font-semibold bg-gecko-emerald/10 text-gecko-emerald px-2 py-0.5 rounded-full uppercase">
                         {r.type}
                       </span>
                       <div className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-gecko-emerald" />
                          <span className="text-xs font-data font-bold text-white">{r.vibe}/100</span>
                       </div>
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-gecko-emerald transition-colors">{r.title}</h3>
                    <p className="text-sm text-white/40 mb-6 flex items-center gap-1.5 font-sans">
                      <MapPin className="w-3 h-3" /> {r.location}
                    </p>
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                       <p className="text-2xl font-data font-bold text-white">{r.price}</p>
                       <p className="text-[9px] font-data text-white/20">RERA: {r.rera}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
          ) : (
            /* ── Empty State: Top Performing Regions ────────────────── */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
               <div className="mb-12">
                  <h2 className="text-2xl font-display font-bold text-white uppercase tracking-widest mb-3">No direct matches found</h2>
                  <p className="text-white/30 font-sans text-sm max-w-md mx-auto">
                    Gecko analysis found no listings for &quot;{query}&quot;. <br />
                    Explore these high-appreciation micro-markets instead.
                  </p>
               </div>
               
               <div className="flex flex-wrap justify-center gap-6">
                  {REGIONS.slice(0, 3).map((region, i) => (
                    <MiniatureRegionCard key={region.slug} region={region} index={i} />
                  ))}
               </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="fixed top-1/4 -right-24 w-96 h-96 bg-gecko-emerald/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-1/4 -left-24 w-80 h-80 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageInner />
    </Suspense>
  );
}
