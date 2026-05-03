"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Send,
    BarChart2,
    ShieldCheck,
    Home,
    MapPin,
    Zap,
} from "lucide-react";

function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export interface Action {
    id: string;
    label: string;
    icon: React.ReactNode;
    description?: string;
    short?: string;
    end?: string;
}

interface SearchResult {
    actions: Action[];
}

const geckoActions: Action[] = [
    {
        id: "1",
        label: "Find 3BHK in Gurgaon",
        icon: <Home className="h-4 w-4 text-gecko-emerald" />,
        description: "Agent",
        short: "↵",
        end: "Search",
    },
    {
        id: "2",
        label: "Analyze Market Yield",
        icon: <BarChart2 className="h-4 w-4 text-emerald-400" />,
        description: "Intelligence",
        short: "⌘Y",
        end: "Analytics",
    },
    {
        id: "3",
        label: "Verify RERA Status",
        icon: <ShieldCheck className="h-4 w-4 text-blue-400" />,
        description: "Compliance",
        short: "⌘V",
        end: "RERA",
    },
    {
        id: "4",
        label: "Nearby South Delhi",
        icon: <MapPin className="h-4 w-4 text-red-400" />,
        description: "Location",
        short: "⌘L",
        end: "Maps",
    },
    {
        id: "5",
        label: "Run GeckoEstimate™",
        icon: <Zap className="h-4 w-4 text-amber-400" />,
        description: "Valuation",
        short: "⌘E",
        end: "Agentic",
    },
];

function ActionSearchBar({ 
    actions = geckoActions, 
    onSearch,
    placeholder = "What are you looking for?"
}: { 
    actions?: Action[]; 
    onSearch?: (query: string) => void;
    placeholder?: string;
}) {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<SearchResult | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const debouncedQuery = useDebounce(query, 200);

    useEffect(() => {
        if (!isFocused) {
            setResult(null);
            return;
        }

        if (!debouncedQuery) {
            setResult({ actions: actions });
            return;
        }

        const normalizedQuery = debouncedQuery.toLowerCase().trim();
        const filteredActions = actions.filter((action) => {
            const searchableText = action.label.toLowerCase();
            return searchableText.includes(normalizedQuery);
        });

        setResult({ actions: filteredActions });
    }, [debouncedQuery, isFocused, actions]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && query.trim()) {
            onSearch?.(query);
        }
    };

    return (
        <div className="w-full">
            <div className="relative flex flex-col justify-start items-center">
                <div className="w-full z-10 px-3 pt-2 pb-1">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder={placeholder}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onKeyDown={handleKeyDown}
                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                            className="pl-3 pr-9 py-1.5 h-9 text-sm rounded-lg bg-white/[0.03] border-white/10 focus-visible:ring-gecko-emerald/30 font-sans"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
                            <AnimatePresence mode="popLayout">
                                {query.length > 0 ? (
                                    <motion.div
                                        key="send"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        onClick={() => onSearch?.(query)}
                                        className="cursor-pointer"
                                    >
                                        <Send className="w-4 h-4 text-gecko-emerald" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="search"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Search className="w-4 h-4 text-white/20" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <AnimatePresence>
                        {isFocused && result && (
                            <motion.div
                                className="w-full overflow-hidden mt-1"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <ul className="py-1">
                                    {result.actions.map((action) => (
                                        <motion.li
                                            key={action.id}
                                            className="px-3 py-2 flex items-center justify-between hover:bg-white/[0.04] cursor-pointer mx-1 rounded-md transition-colors group"
                                            onClick={() => {
                                                setQuery(action.label);
                                                onSearch?.(action.label);
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-white/40 group-hover:text-gecko-emerald transition-colors">
                                                    {action.icon}
                                                </span>
                                                <div className="flex flex-col text-left">
                                                    <span className="text-[12px] font-medium text-white/90">
                                                        {action.label}
                                                    </span>
                                                    <span className="text-[9px] text-white/30 uppercase tracking-wider font-data">
                                                        {action.description}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[9px] font-data text-white/20">
                                                    {action.short}
                                                </span>
                                                <span className="text-[8px] font-data text-white/40 bg-white/5 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                                    {action.end}
                                                </span>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                                <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01]">
                                    <div className="flex items-center justify-between text-[8px] text-white/20 uppercase tracking-[0.1em] font-data">
                                        <span>⌘K for global Search</span>
                                        <span>ESC to close</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export { ActionSearchBar };
