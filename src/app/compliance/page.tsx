"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, Clock, AlertTriangle, FileCheck, ExternalLink } from "lucide-react";

type VerificationStatus = "Verified" | "Pending" | "Flagged";

interface RERARecord {
  id: string;
  project: string;
  developer: string;
  reraId: string;
  location: string;
  units: number;
  status: VerificationStatus;
  expiry: string;
}

const RECORDS: RERARecord[] = [
  { id: "1", project: "DLF Camellias Phase III", developer: "DLF Ltd.", reraId: "P12345678901", location: "Golf Course Rd, Gurgaon", units: 120, status: "Verified", expiry: "2027-03" },
  { id: "2", project: "Lodha Altamount Tower B", developer: "Lodha Group", reraId: "PR/12/34/2023/123456", location: "Altamount Rd, Mumbai", units: 48, status: "Verified", expiry: "2026-11" },
  { id: "3", project: "Prestige Kingfisher T2", developer: "Prestige Estates", reraId: "PR/01/02/2022/987654", location: "Ashok Nagar, Bangalore", units: 72, status: "Verified", expiry: "2026-08" },
  { id: "4", project: "Sobha HRC Quintillion", developer: "Sobha Ltd.", reraId: "PRM/KA/RERA/1251/308/PR", location: "Bellandur, Bangalore", units: 340, status: "Pending", expiry: "2025-12" },
  { id: "5", project: "Unitech Woodstock Greens", developer: "Unitech Ltd.", reraId: "UPIN-DEL-2024-091", location: "Sector 50, Noida", units: 680, status: "Flagged", expiry: "2024-06" },
  { id: "6", project: "Emaar Digi Homes", developer: "Emaar India", reraId: "P52100000001", location: "Sector 62, Gurgaon", units: 460, status: "Pending", expiry: "2026-03" },
  { id: "7", project: "Tata Primanti Phase II", developer: "Tata Housing", reraId: "TH/GGN/2023/1122", location: "Sector 72, Gurgaon", units: 208, status: "Verified", expiry: "2027-01" },
  { id: "8", project: "Supertech Capetown", developer: "Supertech Ltd.", reraId: "INVALID-FLAGGED", location: "Sector 74, Noida", units: 912, status: "Flagged", expiry: "2023-01" },
];

const statusConfig: Record<VerificationStatus, { icon: React.ElementType; color: string; bg: string }> = {
  Verified: { icon: CheckCircle2, color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  Pending:  { icon: Clock,        color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  Flagged:  { icon: AlertTriangle, color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
};

const ALL_FILTERS: Array<VerificationStatus | "All"> = ["All", "Verified", "Pending", "Flagged"];

export default function CompliancePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<VerificationStatus | "All">("All");

  const filtered = RECORDS.filter((r) => {
    const matchQuery =
      r.project.toLowerCase().includes(query.toLowerCase()) ||
      r.developer.toLowerCase().includes(query.toLowerCase()) ||
      r.reraId.toLowerCase().includes(query.toLowerCase()) ||
      r.location.toLowerCase().includes(query.toLowerCase());
    const matchFilter = filter === "All" || r.status === filter;
    return matchQuery && matchFilter;
  });

  return (
    <div className="min-h-screen px-6 pt-14 pb-24" style={{ background: "#0F1115" }}>
      <div className="max-w-6xl mx-auto">
        
        {/* ── Page Header ─────────────────────────────────────────────── */}
        <div className="mb-10 text-center sm:text-left">
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
            RERA Watch · Compliance Registry
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
            Integrity Watch
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
            Real-time verification of NCR property compliance and RERA status.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {(["Verified", "Pending", "Flagged"] as VerificationStatus[]).map((s) => {
            const count = RECORDS.filter((r) => r.status === s).length;
            const cfg = statusConfig[s];
            return (
              <div 
                key={s} 
                className="p-5 flex items-center gap-4"
                style={{ 
                  background: "#1A1D23", 
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.03)"
                }}
              >
                <div 
                  className="p-2.5 rounded-xl"
                  style={{ background: cfg.bg }}
                >
                  <cfg.icon className="w-5 h-5" style={{ color: cfg.color }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "24px", fontWeight: 600, color: "#F8FAFC", lineHeight: 1 }}>{count}</p>
                  <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "10px", fontWeight: 500, color: "rgba(248,250,252,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>{s}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 group">
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors" 
              style={{ color: "rgba(248,250,252,0.2)" }} 
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search registry by project, developer, or RERA ID..."
              className="w-full outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                padding: "12px 12px 12px 44px",
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#F8FAFC",
              }}
              onFocus={(e) => e.target.style.borderColor = "rgba(16,185,129,0.3)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.06)"}
            />
          </div>
          <div className="flex gap-2 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
            {ALL_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 transition-all duration-200"
                style={{
                  background: filter === f ? "rgba(248,250,252,0.05)" : "transparent",
                  borderRadius: "10px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: filter === f ? "#F8FAFC" : "rgba(248,250,252,0.35)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Registry Table */}
        <div 
          className="overflow-hidden"
          style={{ 
            background: "#1A1D23", 
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.03)"
          }}
        >
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-8 py-4" style={{ background: "rgba(255,255,255,0.015)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
            {["Project Detail", "Developer", "RERA ID", "Status"].map((h, i) => (
              <span 
                key={h} 
                className={i === 0 ? "col-span-5" : i === 1 ? "col-span-3" : i === 2 ? "col-span-2" : "col-span-2"}
                style={{ 
                  fontFamily: "'Outfit', sans-serif", 
                  fontSize: "10px", 
                  fontWeight: 600, 
                  color: "rgba(248,250,252,0.2)", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.15em" 
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/[0.03]">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <div className="py-20 text-center">
                  <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "14px", color: "rgba(248,250,252,0.2)" }}>No compliance records match your query.</p>
                </div>
              ) : (
                filtered.map((r, i) => {
                  const cfg = statusConfig[r.status];
                  const Icon = cfg.icon;
                  return (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-white/[0.01] transition-colors group"
                    >
                      <div className="sm:col-span-5">
                        <p style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: "15px", color: "#F8FAFC" }}>{r.project}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "11px", color: "rgba(248,250,252,0.3)" }}>{r.location}</span>
                          <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "rgba(248,250,252,0.2)", textTransform: "uppercase" }}>{r.units} Units</span>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "13px", color: "rgba(248,250,252,0.4)" }}>{r.developer}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", color: "rgba(248,250,252,0.3)", letterSpacing: "0.05em" }}>{r.reraId}</span>
                      </div>
                      <div className="sm:col-span-2 flex items-center justify-between sm:justify-start gap-3">
                        <div 
                          className="px-3 py-1.5 rounded-full flex items-center gap-2"
                          style={{ background: cfg.bg, border: `1px solid ${cfg.color}20` }}
                        >
                          <Icon className="w-3 h-3" style={{ color: cfg.color }} />
                          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "9px", fontWeight: 600, color: cfg.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{r.status}</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-30 transition-opacity cursor-pointer hover:opacity-100" style={{ color: "#F8FAFC" }} />
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "11px", color: "rgba(248,250,252,0.2)" }}>
            * Verified data synced with RERA Haryana, UP, and Maharashtra registries.
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(248,250,252,0.25)" }}>
            Showing {filtered.length} of {RECORDS.length} Assets
          </p>
        </div>
      </div>
    </div>
  );
}

