"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { type Region } from "@/data/regions";

// Deterministic Unsplash image URLs keyed to each region slug
const REGION_PHOTO: Record<string, string> = {
  "gurgaon":           "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=560&q=80",
  "noida":             "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=560&q=80",
  "south-delhi":       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=560&q=80",
  "aerocity":          "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=560&q=80&sat=-80",
  "dwarka-expressway": "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=560&q=80",
  "greater-noida":     "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=560&q=80",
};

// Fallback picsum seeds per region (used if Unsplash fails)
const PICSUM_SEEDS: Record<string, string> = {
  "gurgaon":           "600/800?random=1",
  "noida":             "600/800?random=2",
  "south-delhi":       "600/800?random=3",
  "aerocity":          "600/800?random=4",
  "dwarka-expressway": "600/800?random=5",
  "greater-noida":     "600/800?random=6",
};

function getPhotoUrl(slug: string): string {
  return REGION_PHOTO[slug] ?? `https://picsum.photos/seed/${PICSUM_SEEDS[slug] ?? slug}/600/800`;
}

interface MiniatureRegionCardProps {
  region: Region;
  index: number;
}

export function MiniatureRegionCard({ region, index }: MiniatureRegionCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ width: "280px", flexShrink: 0 }}
    >
      <Link href={`/search?region=${region.slug}`} className="block">
        {/* 3:4 aspect ratio container */}
        <div
          className="relative overflow-hidden cursor-pointer"
          style={{
            width: "280px",
            height: "373px",
            borderRadius: "20px",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Full-bleed image — greyscale → color on hover */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getPhotoUrl(region.slug)}
            alt={region.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.08)" : "scale(1.01)",
              filter: hovered ? "grayscale(0%) brightness(0.9)" : "grayscale(60%) brightness(0.75)",
              transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            loading="lazy"
          />

          {/* Always-on gradient scrim for text legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(10,11,14,0.92) 0%, rgba(10,11,14,0.2) 50%, rgba(10,11,14,0.0) 75%)",
              transition: "opacity 0.4s ease",
            }}
          />

          {/* ── Glassmorphic info overlay — slides up on hover ─────────── */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="overlay"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-x-0 bottom-0 px-5 pb-16 pt-6"
                style={{
                  background: "linear-gradient(to top, rgba(10,11,14,0.9) 0%, rgba(15,17,21,0.7) 60%, transparent 100%)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Strategic Bio — Satoshi Regular */}
                <p
                  className="text-[11px] leading-relaxed mb-3"
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    color: "rgba(248,250,252,0.75)",
                    fontWeight: 400,
                  }}
                >
                  {region.strategicBio}
                </p>

                {/* Market Health Tag — Outfit Medium */}
                <div
                  className="inline-flex items-center px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(16,185,129,0.25)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 500,
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: "#10B981",
                    }}
                  >
                    {region.marketHealthTag}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Bottom text — always visible ───────────────────────────── */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 text-center">
            {/* Emerald line — expands on hover */}
            <motion.div
              className="mx-auto mb-3 h-px"
              style={{ background: "#10B981", transformOrigin: "center" }}
              animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.4 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Region Name — Clash Display Bold, all-caps, centered */}
            <h2
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#F8FAFC",
                lineHeight: 1.2,
              }}
            >
              {region.name}
            </h2>

            {/* City label */}
            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 400,
                fontSize: "9px",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.3)",
                marginTop: "3px",
                textTransform: "uppercase",
              }}
            >
              NCR · {region.totalListings.toLocaleString()} Listings
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
