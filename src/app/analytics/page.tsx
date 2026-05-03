"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Wind, Layers, TrendingUp, MapPin, Zap, BarChart2 } from "lucide-react";

const ZONES = [
  { id: "1", label: "Connaught Place", x: 38, y: 32, grade: "A+", aqi: 68, cagr: 11.2 },
  { id: "2", label: "Aerocity", x: 28, y: 55, grade: "A", aqi: 54, cagr: 9.8 },
  { id: "3", label: "Golf Course Rd", x: 60, y: 48, grade: "A+", aqi: 42, cagr: 13.4 },
  { id: "4", label: "Noida Sector 62", x: 72, y: 30, grade: "B+", aqi: 89, cagr: 7.1 },
  { id: "5", label: "Dwarka Expressway", x: 20, y: 70, grade: "B", aqi: 105, cagr: 6.3 },
  { id: "6", label: "Sohna Rd", x: 55, y: 75, grade: "A", aqi: 38, cagr: 10.5 },
];

const OVERLAYS = ["Investment Grade", "AQI", "CAGR Trend", "Connectivity"];
const gradeColor: Record<string, string> = { 
  "A+": "#10B981", 
  "A": "#34D399", 
  "B+": "#94A3B8", 
  "B": "#64748B" 
};

const aqiColor = (v: number) => v < 50 ? "#10B981" : v < 100 ? "#F59E0B" : "#EF4444";

export default function AnalyticsPage() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [activeOverlays, setActiveOverlays] = useState<string[]>(["Investment Grade"]);

  const toggleOverlay = (o: string) =>
    setActiveOverlays((p) => p.includes(o) ? p.filter((x) => x !== o) : [...p, o]);

  const selected = ZONES.find((z) => z.id === activeZone);

  return (
    <div className="min-h-screen px-6 pt-14 pb-24" style={{ background: "#0F1115" }}>
      <div className="max-w-6xl mx-auto">
        
        {/* ── Page Header ─────────────────────────────────────────────── */}
        <div className="mb-10">
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#10B981",
              marginBottom: "12px",
            }}
          >
            NCR Intelligence · Tactical Mapping
          </p>
          <h1
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#F8FAFC",
            }}
          >
            Market Overlays
          </h1>
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              color: "rgba(248,250,252,0.35)",
              marginTop: "8px",
            }}
          >
            Real-time micro-market analytics across the National Capital Region.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ── Left: Market Map ─────────────────────────────────────── */}
          <div className="lg:col-span-8">
            
            {/* Overlay Toggles */}
            <div className="flex gap-2 flex-wrap mb-6">
              {OVERLAYS.map((o) => (
                <button
                  key={o}
                  onClick={() => toggleOverlay(o)}
                  className="px-4 py-2 transition-all duration-200"
                  style={{
                    background: activeOverlays.includes(o) ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${activeOverlays.includes(o) ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: "12px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: activeOverlays.includes(o) ? "#10B981" : "rgba(248,250,252,0.4)",
                  }}
                >
                  {o}
                </button>
              ))}
            </div>

            {/* Map Canvas */}
            <div 
              className="relative w-full aspect-[16/9] overflow-hidden"
              style={{ 
                background: "#1A1D23", 
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.04)"
              }}
            >
              {/* Grid overlay */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }}
              />

              {/* Decorative road lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
                <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#F8FAFC" strokeWidth="1" />
                <line x1="45%" y1="0%" x2="45%" y2="100%" stroke="#F8FAFC" strokeWidth="1" />
                <line x1="10%" y1="0%" x2="90%" y2="100%" stroke="#F8FAFC" strokeWidth="0.5" />
              </svg>

              {/* Zone Nodes */}
              {ZONES.map((zone) => (
                <motion.button
                  key={zone.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                  onClick={() => setActiveZone(zone.id === activeZone ? null : zone.id)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* AQI ring if active */}
                  {activeOverlays.includes("AQI") && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-[-10px] rounded-full border-2 opacity-30"
                      style={{ borderColor: aqiColor(zone.aqi) }}
                    />
                  )}
                  
                  <div
                    className="w-4 h-4 rounded-full transition-all duration-300 relative"
                    style={{
                      background: gradeColor[zone.grade],
                      boxShadow: activeZone === zone.id
                        ? `0 0 20px ${gradeColor[zone.grade]}80`
                        : `0 2px 8px rgba(0,0,0,0.4)`,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-20"
                      style={{ backgroundColor: gradeColor[zone.grade] }}
                    />
                  </div>

                  {/* Label — Satoshi */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                    <span 
                      style={{ 
                        fontFamily: "'Satoshi', sans-serif", 
                        fontSize: "10px", 
                        fontWeight: 500,
                        color: activeZone === zone.id ? "#F8FAFC" : "rgba(248,250,252,0.3)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}
                    >
                      {zone.label}
                    </span>
                  </div>
                </motion.button>
              ))}

              {/* Legend */}
              <div className="absolute bottom-6 left-6 flex items-center gap-5">
                {Object.entries(gradeColor).map(([g, c]) => (
                  <div key={g} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", color: "rgba(248,250,252,0.3)", fontWeight: 500 }}>{g}</span>
                  </div>
                ))}
              </div>

              <div 
                className="absolute top-6 right-6"
                style={{ 
                  fontFamily: "'Outfit', sans-serif", 
                  fontSize: "8px", 
                  color: "rgba(248,250,252,0.15)", 
                  letterSpacing: "0.2em",
                  textTransform: "uppercase"
                }}
              >
                Tactical Grid v4.0.1
              </div>
            </div>
          </div>

          {/* ── Right: Sidebar Analytics ─────────────────────────────── */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              className="p-6"
              style={{ 
                background: "#1A1D23", 
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.03)"
              }}
            >
              <p 
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(248,250,252,0.25)",
                  marginBottom: "20px",
                }}
              >
                Zone Intelligence
              </p>
              
              {selected ? (
                <div className="space-y-6">
                  <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: "20px", color: "#F8FAFC", fontWeight: 600 }}>{selected.label}</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Market Grade", value: selected.grade, color: gradeColor[selected.grade] },
                      { label: "Air Quality Idx", value: selected.aqi, color: aqiColor(selected.aqi) },
                      { label: "12M CAGR", value: `+${selected.cagr}%`, color: "#10B981" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                        <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "12px", color: "rgba(248,250,252,0.3)" }}>{stat.label}</span>
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 600, color: stat.color }}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                  <button className="pill-btn w-full py-3" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#F8FAFC" }}>
                    Request Full Report
                  </button>
                </div>
              ) : (
                <div className="py-10 text-center">
                  <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "13px", color: "rgba(248,250,252,0.2)" }}>
                    Select a zone on the map for detailed micro-market analysis.
                  </p>
                </div>
              )}
            </div>

            {/* Global KPIs */}
            {[
              { label: "Avg Region CAGR", value: "+10.4%", icon: TrendingUp, color: "#10B981" },
              { label: "Peak Vibe Zone", value: "Golf Course Rd", icon: Zap, color: "#10B981" },
              { label: "Live Data Nodes", value: "1,247", icon: MapPin, color: "#F8FAFC" },
            ].map((kpi) => (
              <div 
                key={kpi.label} 
                className="p-5 flex items-center gap-4 transition-all hover:bg-white/[0.02]"
                style={{ 
                  background: "#1A1D23", 
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.03)"
                }}
              >
                <div className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", color: "rgba(248,250,252,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{kpi.label}</p>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "14px", fontWeight: 600, color: "#F8FAFC", marginTop: "2px" }}>{kpi.value}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

