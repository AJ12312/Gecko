"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ImagePlus, TrendingUp, X } from "lucide-react";

const HEATMAP_ZONES = [
  { id: "1", label: "Lutyens Delhi",  x: 30, y: 20, heat: 98, type: "ultra"   },
  { id: "2", label: "Golf Course Rd", x: 55, y: 40, heat: 91, type: "premium" },
  { id: "3", label: "BKC Mumbai",     x: 15, y: 65, heat: 87, type: "premium" },
  { id: "4", label: "Whitefield",     x: 75, y: 70, heat: 74, type: "growth"  },
  { id: "5", label: "Aerocity",       x: 45, y: 55, heat: 82, type: "premium" },
];

const heatConfig: Record<string, { color: string; label: string }> = {
  ultra:   { color: "#10B981", label: "Ultra" },
  premium: { color: "#6EE7B7", label: "Premium" },
  growth:  { color: "#94A3B8", label: "Growth" },
};

export default function DeployPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...dropped].slice(0, 12));
  }, []);

  return (
    <div className="min-h-screen px-6 pt-12 pb-20" style={{ background: "#0F1115" }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Page Header ──────────────────────────────────────────── */}
        <div className="mb-10">
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#10B981",
              marginBottom: "8px",
            }}
          >
            Deploy Listing
          </p>
          <div className="flex items-center gap-3">
            <h1
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#F8FAFC",
              }}
            >
              Seller Dashboard
            </h1>
            <span
              className="rounded-full px-3 py-1"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "9px",
                letterSpacing: "0.1em",
                background: "#10B981",
                color: "#0F1115",
              }}
            >
              PRO
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── Left: Upload + Form ──────────────────────────────── */}
          <div className="lg:col-span-3 space-y-5">

            {/* Upload Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className="relative p-8 text-center transition-all duration-300"
              style={{
                border: `2px dashed ${isDragging ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.08)"}`,
                background: isDragging ? "rgba(16,185,129,0.04)" : "rgba(255,255,255,0.015)",
                borderRadius: "20px",
              }}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) =>
                  setFiles((p) =>
                    [...p, ...Array.from(e.target.files || [])].slice(0, 12)
                  )
                }
              />
              <ImagePlus className="w-10 h-10 mx-auto mb-3" style={{ color: "rgba(248,250,252,0.2)" }} />
              <p
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 500,
                  color: "rgba(248,250,252,0.8)",
                  fontSize: "15px",
                }}
              >
                Photo Upload
              </p>
              <p
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 400,
                  color: "rgba(248,250,252,0.3)",
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                Drag & drop or click. Up to 12 images.
              </p>
            </div>

            {/* Image preview grid */}
            {files.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {files.map((f, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden group"
                    style={{ borderRadius: "12px", background: "rgba(255,255,255,0.04)" }}
                  >
                    <img
                      src={URL.createObjectURL(f)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setFiles((p) => p.filter((_, j) => j !== i))}
                      className="absolute top-1.5 right-1.5 p-1 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-2.5 h-2.5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              {["Property Title", "RERA Registration ID", "Location / Locality"].map((label) => (
                <div key={label}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Satoshi', sans-serif",
                      fontWeight: 400,
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(248,250,252,0.35)",
                      marginBottom: "8px",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type="text"
                    className="w-full outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "14px",
                      padding: "12px 16px",
                      fontFamily: "'Satoshi', sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#F8FAFC",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(16,185,129,0.3)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.07)";
                    }}
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                {["Ask Price (₹)", "Area (sq ft)"].map((label) => (
                  <div key={label}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'Satoshi', sans-serif",
                        fontWeight: 400,
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(248,250,252,0.35)",
                        marginBottom: "8px",
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type="text"
                      className="w-full outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "14px",
                        padding: "12px 16px",
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#F8FAFC",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(16,185,129,0.3)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.07)";
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* CTA — Pill Button */}
              <button
                className="pill-btn w-full py-4 transition-all duration-200"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#F8FAFC",
                }}
              >
                Deploy Listing →
              </button>
            </div>
          </div>

          {/* ── Right: Heatmap ────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            <div
              className="p-5"
              style={{ background: "#1A1D23", borderRadius: "20px" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 500,
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(248,250,252,0.4)",
                  }}
                >
                  Market Heatmap
                </span>
                <TrendingUp className="w-4 h-4" style={{ color: "#10B981" }} />
              </div>

              {/* Map area */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: "4/3",
                  background: "#0F1115",
                  borderRadius: "12px",
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                  backgroundSize: "20% 20%",
                }}
              >
                {HEATMAP_ZONES.map((zone) => (
                  <motion.button
                    key={zone.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                    onHoverStart={() => setHoveredZone(zone.id)}
                    onHoverEnd={() => setHoveredZone(null)}
                    whileHover={{ scale: 1.4 }}
                  >
                    <div
                      className="w-3 h-3 rounded-full relative"
                      style={{ backgroundColor: heatConfig[zone.type].color }}
                    >
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-30"
                        style={{ backgroundColor: heatConfig[zone.type].color }}
                      />
                    </div>
                    {hoveredZone === zone.id && (
                      <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 whitespace-nowrap z-10"
                        style={{
                          background: "#1A1D23",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "10px",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Satoshi', sans-serif",
                            fontWeight: 500,
                            fontSize: "11px",
                            color: "#F8FAFC",
                          }}
                        >
                          {zone.label}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 500,
                            fontSize: "10px",
                            color: heatConfig[zone.type].color,
                            marginTop: "2px",
                          }}
                        >
                          Score: {zone.heat}/100
                        </p>
                      </div>
                    )}
                  </motion.button>
                ))}

                <div
                  className="absolute bottom-3 left-3"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: "8px",
                    color: "rgba(255,255,255,0.15)",
                    letterSpacing: "0.06em",
                  }}
                >
                  India Market Map
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-3">
                {Object.entries(heatConfig).map(([type, cfg]) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cfg.color }}
                    />
                    <span
                      style={{
                        fontFamily: "'Satoshi', sans-serif",
                        fontWeight: 400,
                        fontSize: "9px",
                        color: "rgba(248,250,252,0.35)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Avg Days on Market", value: "11", trend: "+2% this week" },
                { label: "Demand Index",        value: "94", trend: "+7% this week" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-4"
                  style={{ background: "#1A1D23", borderRadius: "16px" }}
                >
                  <p
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontWeight: 400,
                      fontSize: "9px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(248,250,252,0.3)",
                      marginBottom: "8px",
                    }}
                  >
                    {s.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      fontSize: "28px",
                      color: "#F8FAFC",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 500,
                      fontSize: "10px",
                      color: "#10B981",
                      marginTop: "4px",
                    }}
                  >
                    {s.trend}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
