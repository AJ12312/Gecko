"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Cpu, BarChart2, Zap } from "lucide-react";

const PRICE_POINTS = [42, 48, 45, 55, 60, 58, 70, 75, 72, 80, 85, 92];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const COMPARABLES = [
  { name: "DLF Camellias", price: "₹46,666/sqft", delta: "+12.3%", grade: "A+" },
  { name: "Lodha World One", price: "₹38,200/sqft", delta: "+8.7%", grade: "A" },
  { name: "Prestige Leela Residences", price: "₹31,500/sqft", delta: "+5.2%", grade: "B+" },
  { name: "Sobha HRC Quintillion", price: "₹24,100/sqft", delta: "-1.1%", grade: "B" },
];

export default function EstimatePage() {
  const [sqft, setSqft] = useState("3000");
  const [location, setLocation] = useState("Worli, Mumbai");
  const [year, setYear] = useState("2021");
  const [computed, setComputed] = useState(false);

  const estimate = parseInt(sqft || "0") * 38500;
  const maxVal = Math.max(...PRICE_POINTS);

  return (
    <div className="min-h-screen px-6 pt-14 pb-24" style={{ background: "#0F1115" }}>
      <div className="max-w-6xl mx-auto">
        
        {/* ── Page Header ─────────────────────────────────────────────── */}
        <div className="mb-12">
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
            GeckoEstimate™ · Proprietary Valuation
          </p>
          <div className="flex items-center gap-4">
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
              Tactical Valuation
            </h1>
            <span
              className="px-3 py-1 rounded-full"
              style={{
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.2)",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "9px",
                letterSpacing: "0.1em",
                color: "#10B981",
              }}
            >
              WEBGPU ENABLED
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              color: "rgba(248,250,252,0.35)",
              marginTop: "8px",
            }}
          >
            On-device local inference. Private-by-design architectural intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ── Left: Input Panel ────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">
            <div 
              className="p-6"
              style={{ 
                background: "#1A1D23", 
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.03)"
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Cpu className="w-4 h-4" style={{ color: "#10B981" }} />
                <span 
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(248,250,252,0.4)",
                  }}
                >
                  Neural Inputs
                </span>
              </div>

              <div className="space-y-5">
                {[
                  { label: "Location / Asset Zone", value: location, set: setLocation, placeholder: "e.g. Worli, Mumbai" },
                  { label: "Built-up Area (sq.ft.)", value: sqft, set: setSqft, placeholder: "3000" },
                  { label: "Year of Handover", value: year, set: setYear, placeholder: "2021" },
                ].map((f) => (
                  <div key={f.label}>
                    <label 
                      style={{
                        display: "block",
                        fontFamily: "'Satoshi', sans-serif",
                        fontWeight: 400,
                        fontSize: "10px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "rgba(248,250,252,0.3)",
                        marginBottom: "8px",
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      type="text"
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "14px",
                        padding: "12px 16px",
                        fontFamily: "'Satoshi', sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "#F8FAFC",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "rgba(16,185,129,0.3)"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.06)"}
                    />
                  </div>
                ))}

                <button
                  onClick={() => setComputed(true)}
                  className="pill-btn w-full py-4 mt-2"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#F8FAFC",
                  }}
                >
                  Compute Value
                </button>
              </div>
            </div>

            {/* GPU Status Info */}
            <div 
              className="p-5"
              style={{ 
                background: "rgba(255,255,255,0.015)", 
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.04)"
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span 
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(248,250,252,0.25)",
                  }}
                >
                  Device Acceleration
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10B981" }} />
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", color: "#10B981", fontWeight: 600 }}>SYNCED</span>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Model Architecture", val: "GeckoVal-12B-Llama" },
                  { label: "Compute Backend", val: "Metal / WebGPU" },
                  { label: "Token Latency", val: "14ms" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "10px", color: "rgba(248,250,252,0.2)" }}>{item.label}</span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "rgba(248,250,252,0.5)" }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Results & Analytics ───────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">
            
            <AnimatePresence mode="wait">
              {computed ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8"
                  style={{ 
                    background: "linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(16,185,129,0.01) 100%)",
                    border: "1px solid rgba(16,185,129,0.15)",
                    borderRadius: "24px"
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p 
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 500,
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#10B981",
                      }}
                    >
                      Fair Market Valuation
                    </p>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3" style={{ color: "#10B981" }} />
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "#10B981", fontWeight: 600 }}>CONFIDENCE 98.2%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-4">
                    <h2 
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                        color: "#F8FAFC",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      ₹{(estimate / 10000000).toFixed(2)}Cr
                    </h2>
                    <span 
                      style={{
                        fontFamily: "'Satoshi', sans-serif",
                        fontSize: "14px",
                        color: "rgba(248,250,252,0.3)",
                      }}
                    >
                      (₹{estimate.toLocaleString("en-IN")})
                    </span>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-6">
                    {[
                      { label: "Price per sqft", val: "₹38,500", color: "#10B981" },
                      { label: "Market Sentiment", val: "UPWARD", color: "#10B981" },
                      { label: "Asset Liquidity", val: "HIGH", color: "#F8FAFC" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "9px", color: "rgba(248,250,252,0.3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{stat.label}</p>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "14px", color: stat.color }}>{stat.val}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div 
                  className="h-40 flex items-center justify-center border border-dashed border-white/10 rounded-3xl"
                  style={{ background: "rgba(255,255,255,0.01)" }}
                >
                  <p style={{ fontFamily: "'Satoshi', sans-serif", color: "rgba(248,250,252,0.2)", fontSize: "13px" }}>
                    Pending computation input...
                  </p>
                </div>
              )}
            </AnimatePresence>

            {/* Price Trend Chart */}
            <div 
              className="p-6"
              style={{ 
                background: "#1A1D23", 
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.03)"
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4" style={{ color: "#10B981" }} />
                  <span 
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 500,
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(248,250,252,0.4)",
                    }}
                  >
                    12-Month Tactical Trend
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#10B981]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", fontWeight: 600 }}>+34.2% YOY</span>
                </div>
              </div>

              <div className="relative h-48 flex items-end gap-1.5 px-2">
                {PRICE_POINTS.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / maxVal) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 relative group"
                  >
                    <div
                      className="w-full h-full rounded-t-lg transition-all duration-300"
                      style={{
                        background: i === PRICE_POINTS.length - 1
                          ? "#10B981"
                          : "rgba(16,185,129,0.15)",
                      }}
                    />
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      <div 
                        className="px-2 py-1 rounded text-[9px] whitespace-nowrap"
                        style={{ background: "#F8FAFC", color: "#0F1115", fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}
                      >
                        {MONTHS[i]}: ₹{val}k
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between mt-4 px-2">
                {MONTHS.map((m) => (
                  <span key={m} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", color: "rgba(248,250,252,0.15)", width: "100%", textAlign: "center" }}>{m}</span>
                ))}
              </div>
            </div>

            {/* Comparable Grid */}
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
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(248,250,252,0.3)",
                  marginBottom: "20px",
                }}
              >
                Benchmark Comparables
              </p>
              <div className="space-y-4">
                {COMPARABLES.map((c, i) => (
                  <div 
                    key={c.name} 
                    className="flex items-center justify-between p-4 rounded-xl transition-colors hover:bg-white/[0.02]"
                    style={{ border: "1px solid rgba(255,255,255,0.03)" }}
                  >
                    <div>
                      <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 500, fontSize: "14px", color: "#F8FAFC" }}>{c.name}</p>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "rgba(248,250,252,0.3)", marginTop: "2px" }}>{c.price}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p 
                          style={{ 
                            fontFamily: "'Outfit', sans-serif", 
                            fontSize: "12px", 
                            fontWeight: 600, 
                            color: c.delta.startsWith("+") ? "#10B981" : "#EF4444",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          {c.delta.startsWith("+") ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {c.delta}
                        </p>
                      </div>
                      <div 
                        className="px-2 py-1 rounded text-[9px]"
                        style={{ 
                          background: "rgba(255,255,255,0.03)", 
                          border: "1px solid rgba(255,255,255,0.08)",
                          fontFamily: "'Outfit', sans-serif",
                          color: "rgba(248,250,252,0.4)"
                        }}
                      >
                        {c.grade}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

