"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { REGIONS } from "@/data/regions";
import { MiniatureRegionCard } from "@/components/MiniatureRegionCard";

export default function RegionsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0F1115" }}>
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-24">

        {/* ── Page Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          {/* Eyebrow — Outfit Medium */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#10B981",
              marginBottom: "20px",
            }}
          >
            NCR · Region Grid · Live Market Data
          </motion.p>

          {/* H1 — Clash Display, uppercase */}
          <h1
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#F8FAFC",
              lineHeight: 1.05,
            }}
          >
            Choose Your Market
          </h1>

          {/* Subtitle — Satoshi */}
          <p
            className="mt-4 max-w-lg mx-auto"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              color: "rgba(248,250,252,0.35)",
              lineHeight: 1.7,
            }}
          >
            Six NCR micro-markets. Each carrying live listings, ROI intelligence, and
            Gecko&apos;s RERA verification status.
          </p>
        </motion.div>

        {/* ── Region Card Grid — movie poster layout ───────────────────── */}
        <div
          className="flex flex-wrap justify-center gap-5"
        >
          {REGIONS.map((region, i) => (
            <MiniatureRegionCard key={region.slug} region={region} index={i} />
          ))}
        </div>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16 flex items-center justify-center gap-3"
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#10B981" }}
          />
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 400,
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.12)",
            }}
          >
            Market indices update every 15 min · RERA-verified listings only
          </p>
        </motion.div>

        {/* ── Explore All link ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 text-center"
        >
          <Link
            href="/search"
            className="pill-btn inline-flex items-center gap-2 px-6 py-3 text-sm transition-all"
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 500,
              color: "rgba(248,250,252,0.7)",
              textDecoration: "none",
            }}
          >
            Search All Regions
            <span style={{ color: "#10B981" }}>→</span>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
