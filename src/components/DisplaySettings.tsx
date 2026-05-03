"use client";

import { motion } from "framer-motion";
import { Monitor, Moon, Sun, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

type ThemeMode = "light" | "dark" | "system";

const options: { id: ThemeMode; label: string; icon: React.ElementType }[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "Sync with System", icon: Monitor },
];

export function DisplaySettings() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isActuallyDark = resolvedTheme === "dark";

  return (
    <section className="mb-12">
      <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-slate-500 mb-6">
        System Appearance
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Segmented Control */}
        <div
          className={`flex p-1.5 rounded-2xl border transition-colors duration-300 ${
            isActuallyDark ? "bg-[#0A0A0A] border-white/10" : "bg-gray-100 border-gray-200"
          }`}
        >
          {options.map((option) => {
            const isActive = theme === option.id;
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setTheme(option.id)}
                className={`relative px-6 py-3 rounded-xl flex items-center space-x-2 text-sm font-medium transition-colors z-10 ${
                  isActive
                    ? isActuallyDark ? "text-black" : "text-white"
                    : isActuallyDark ? "text-slate-500 hover:text-slate-300" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="theme-active-bg"
                    className={`absolute inset-0 rounded-xl -z-10 ${
                      isActuallyDark ? "bg-slate-200" : "bg-black"
                    }`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4" />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* Miniature Gecko Card Preview */}
        <div className="flex-1 w-full max-w-sm">
          <div
            className={`p-6 rounded-2xl border transition-all duration-300 ${
              isActuallyDark
                ? "bg-transparent border-white/10 hover:bg-white/[0.02]"
                : "bg-white border-gray-200 shadow-sm hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle2 className="w-4 h-4 text-[#39FF14]" />
              <span className={`text-[10px] font-mono uppercase tracking-widest ${isActuallyDark ? "text-slate-400" : "text-slate-500"}`}>
                Gecko-Verified • Preview
              </span>
            </div>
            <div className={`text-3xl font-extrabold mb-4 tracking-tighter ${isActuallyDark ? "text-slate-200" : "text-slate-900"}`}>
              ₹8,50,00,000
            </div>
            <div className="flex items-center text-xs font-mono w-full">
              <span className={isActuallyDark ? "text-slate-400" : "text-slate-500"}>Mumbai</span>
              <span className={`mx-2 ${isActuallyDark ? "text-slate-600" : "text-slate-300"}`}>•</span>
              <span className={isActuallyDark ? "text-slate-400" : "text-slate-500"}>3000 SQFT</span>
              <span className={`mx-2 ${isActuallyDark ? "text-slate-600" : "text-slate-300"}`}>•</span>
              <span className="text-[#39FF14] ml-auto font-bold tracking-widest">IDX: 92/100</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
