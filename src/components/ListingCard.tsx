"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { validateRERA } from "../utils/reraValidator";

interface ListingProps {
  id: string;
  title: string;
  price: number;
  reraId: string;
  sqft: number;
  location: string;
  vibeScore: number;
  aiSummary: string;
}

export function ListingCard({
  title,
  price,
  reraId,
  sqft,
  location,
  vibeScore,
}: ListingProps) {
  const isValidRera = validateRERA(reraId);

  if (!isValidRera) return null;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="luxury-card px-6 py-5 group flex flex-col items-start justify-center transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      {/* Top: Verification Badge + Title — Satoshi */}
      <div className="flex items-center space-x-2 mb-3">
        <CheckCircle2
          className="w-3.5 h-3.5 shrink-0"
          style={{ color: "#10B981" }}
        />
        <span
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 400,
            fontSize: "10px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(248,250,252,0.4)",
          }}
        >
          Gecko-Verified · {title}
        </span>
      </div>

      {/* Middle: Hero Price — Outfit Medium (numerical data) */}
      <p
        className="mb-1 leading-none"
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          color: "#F8FAFC",
          letterSpacing: "-0.01em",
          transition: "color 0.25s ease",
        }}
      >
        {formatPrice(price)}
      </p>

      {/* RERA ID — Outfit Medium */}
      <p
        className="mb-4"
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 400,
          fontSize: "10px",
          color: "rgba(248,250,252,0.25)",
          letterSpacing: "0.04em",
        }}
      >
        RERA {reraId}
      </p>

      {/* Hairline divider */}
      <div
        className="w-full mb-4"
        style={{ height: "1px", background: "rgba(255,255,255,0.05)" }}
      />

      {/* Bottom: Meta row — Satoshi + Outfit for score */}
      <div className="flex items-center w-full gap-2 flex-wrap">
        <span
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            color: "rgba(248,250,252,0.4)",
          }}
        >
          {location}
        </span>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            fontSize: "12px",
            color: "rgba(248,250,252,0.4)",
          }}
        >
          {sqft.toLocaleString()} sq ft
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3" style={{ color: "#10B981" }} />
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: "11px",
              color: "#10B981",
            }}
          >
            Vibe {vibeScore}/100
          </span>
        </div>
      </div>
    </motion.div>
  );
}
