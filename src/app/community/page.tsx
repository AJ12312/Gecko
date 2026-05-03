"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageSquare, CheckCircle2, BarChart2, Star, TrendingUp } from "lucide-react";

interface VibeCard {
  id: string;
  resident: string;
  handle: string;
  locality: string;
  verified: boolean;
  vibeScore: number;
  sentiment: "Positive" | "Neutral" | "Mixed";
  content: string;
  tags: string[];
  likes: number;
  replies: number;
  timeAgo: string;
}

const FEED: VibeCard[] = [
  {
    id: "1",
    resident: "Reyansh Rastogi",
    handle: "@reyansh.rastogi",
    locality: "Golf Course Rd, Gurgaon",
    verified: true,
    vibeScore: 96,
    sentiment: "Positive",
    content: "Three years in DLF Camellias and the infrastructure still feels impossibly premium. 24/7 power backup hasn't failed once. The greenery ratio here is unlike anything else in NCR.",
    tags: ["infrastructure", "greenery", "luxury"],
    likes: 142,
    replies: 18,
    timeAgo: "2h ago",
  },
  {
    id: "2",
    resident: "Arshvir Singh",
    handle: "@arshvir.singh",
    locality: "Ashok Nagar, Bangalore",
    verified: true,
    vibeScore: 93,
    sentiment: "Positive",
    content: "Prestige Kingfisher's community events are elite. Bumped into three founders at the rooftop last Friday. The social density here is unmatched in Bangalore.",
    tags: ["community", "networking", "lifestyle"],
    likes: 98,
    replies: 23,
    timeAgo: "5h ago",
  },
  {
    id: "3",
    resident: "Neha Gupta",
    handle: "@ngupta",
    locality: "Altamount Rd, Mumbai",
    verified: false,
    vibeScore: 74,
    sentiment: "Mixed",
    content: "Views from the 42nd floor are breathtaking but the building management has been slow on the gym renovation. Hope they sort it out soon.",
    tags: ["views", "maintenance", "gym"],
    likes: 61,
    replies: 9,
    timeAgo: "1d ago",
  },
  {
    id: "4",
    resident: "Arjun Kapoor",
    handle: "@a.kapoor",
    locality: "Aerocity, Delhi",
    verified: true,
    vibeScore: 88,
    sentiment: "Positive",
    content: "The airport connectivity from Aerocity is a cheat code. 8 minutes to T3, zero traffic. For someone who flies every week this is non-negotiable.",
    tags: ["connectivity", "airport", "convenience"],
    likes: 215,
    replies: 34,
    timeAgo: "3d ago",
  },
];

const sentimentColor: Record<string, string> = {
  Positive: "#10B981",
  Neutral: "#94A3B8",
  Mixed: "#F59E0B",
};

export default function CommunityPage() {
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) =>
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="min-h-screen px-6 pt-14 pb-24" style={{ background: "#0F1115" }}>
      <div className="max-w-3xl mx-auto">
        
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
            Culture Circle · Resident Sentiment
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
            Community Feed
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
            Verified resident insights and Gecko Vibe Index™ analytics.
          </p>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {FEED.map((card, i) => {
            const isLiked = liked.has(card.id);
            return (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 transition-all duration-300"
                style={{ 
                  background: "#1A1D23", 
                  borderRadius: "24px",
                  border: "1px solid rgba(255,255,255,0.03)"
                }}
              >
                {/* Author Row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                      style={{ 
                        background: "rgba(255,255,255,0.03)", 
                        border: "1px solid rgba(255,255,255,0.06)",
                        fontFamily: "'Outfit', sans-serif" 
                      }}
                    >
                      {card.resident[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 600, fontSize: "15px", color: "#F8FAFC" }}>{card.resident}</span>
                        {card.verified && (
                          <CheckCircle2 className="w-4 h-4" style={{ color: "#10B981" }} />
                        )}
                      </div>
                      <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "11px", color: "rgba(248,250,252,0.25)" }}>
                        {card.handle} · {card.locality}
                      </p>
                    </div>
                  </div>

                  {/* Vibe Score Badge */}
                  <div className="flex flex-col items-end gap-1">
                    <div 
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{
                        background: `${sentimentColor[card.sentiment]}10`,
                        border: `1px solid ${sentimentColor[card.sentiment]}25`,
                      }}
                    >
                      <Star className="w-3.5 h-3.5" style={{ color: sentimentColor[card.sentiment] }} />
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "14px", color: sentimentColor[card.sentiment] }}>
                        {card.vibeScore}
                      </span>
                    </div>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "8px", fontWeight: 600, color: "rgba(248,250,252,0.15)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Vibe Score</span>
                  </div>
                </div>

                {/* Content */}
                <p 
                  style={{ 
                    fontFamily: "'Satoshi', sans-serif", 
                    fontSize: "14px", 
                    lineHeight: 1.6, 
                    color: "rgba(248,250,252,0.8)", 
                    marginBottom: "16px" 
                  }}
                >
                  {card.content}
                </p>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap mb-6">
                  {card.tags.map((tag) => (
                    <span 
                      key={tag} 
                      style={{ 
                        padding: "4px 10px", 
                        fontSize: "10px", 
                        fontFamily: "'Outfit', sans-serif", 
                        color: "rgba(248,250,252,0.3)", 
                        background: "rgba(255,255,255,0.02)", 
                        border: "1px solid rgba(255,255,255,0.04)", 
                        borderRadius: "8px" 
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-8 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
                  <button
                    onClick={() => toggleLike(card.id)}
                    className="flex items-center gap-2 transition-colors"
                    style={{ color: isLiked ? "#10B981" : "rgba(248,250,252,0.35)" }}
                  >
                    <Heart className="w-4 h-4" style={{ fill: isLiked ? "#10B981" : "none" }} />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", fontWeight: 500 }}>{card.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-2 transition-colors" style={{ color: "rgba(248,250,252,0.35)" }}>
                    <MessageSquare className="w-4 h-4" />
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "12px", fontWeight: 500 }}>{card.replies}</span>
                  </button>
                  <span className="ml-auto" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "10px", color: "rgba(248,250,252,0.15)", fontWeight: 500 }}>{card.timeAgo}</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

