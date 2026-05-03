"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, CheckCircle, TrendingUp, SquareStack } from "lucide-react";
import { getRegion, getPropertiesByRegion, type Property } from "@/data/regions";

// ─── Carousel image sets per property (3 seeds each) ─────────────────────────
const CAROUSEL: Record<string, number[]> = {
  g1:  [1022, 500,  901], g2:  [1034, 512,  880], g3:  [1043, 475,  868],
  g4:  [1055, 467,  851], g5:  [1080, 420,  844],
  n1:  [1062, 430,  832], n2:  [1074, 444,  817], n3:  [1082, 455,  804],
  n4:  [1091, 410,  790],
  sd1: [1015, 390,  775], sd2: [1027, 375,  760], sd3: [1038, 360,  745],
  a1:  [1047, 350,  730], a2:  [1068, 340,  715],
  de1: [1073, 330,  700], de2: [1086, 320,  685],
  gn1: [1094, 310,  670], gn2: [1003, 300,  655],
};

function getImg(id: string, frame = 0) {
  const seeds = CAROUSEL[id] ?? [1000, 501, 900];
  return `https://picsum.photos/seed/${seeds[frame] ?? seeds[0]}/800/450`;
}

// ─── Sort & filter types ──────────────────────────────────────────────────────
type SortKey = "default" | "price-desc" | "roi" | "vibe";

const SORTS: { key: SortKey; label: string; sub: string }[] = [
  { key: "default",    label: "Relevance",     sub: "Gecko Score" },
  { key: "price-desc", label: "Price",         sub: "High → Low"  },
  { key: "roi",        label: "ROI",           sub: "Annual %"    },
  { key: "vibe",       label: "Vibe Index",    sub: "AI Signal"   },
];

function sortProps(props: Property[], sort: SortKey) {
  const c = [...props];
  if (sort === "price-desc") return c.sort((a, b) => b.price - a.price);
  if (sort === "roi")        return c.sort((a, b) => b.roi - a.roi);
  if (sort === "vibe")       return c.sort((a, b) => b.vibeScore - a.vibeScore);
  return c;
}

// ─── Property Card ─────────────────────────────────────────────────────────────
function PropertyCard({ property, index }: { property: Property; index: number }) {
  const [frame, setFrame] = useState(0);
  const frames = CAROUSEL[property.id] ?? [1000, 501, 900];
  const total = frames.length;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="flex overflow-hidden rounded-sm"
      style={{ background: "#161B22", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* ── Left: 16:9 Image with Quick Scroll ─────────────────────────── */}
      <div className="relative w-[42%] shrink-0 overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <AnimatePresence mode="sync">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            key={frame}
            src={getImg(property.id, frame)}
            alt={property.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </AnimatePresence>

        {/* Subtle scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#161B22]/40 pointer-events-none" />

        {/* BHK badge */}
        <div
          className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-mono text-white/50"
          style={{ background: "rgba(15,17,21,0.7)", backdropFilter: "blur(8px)" }}
        >
          {property.bhk}
        </div>

        {/* Dot navigation — Quick Scroll */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setFrame(i)}
              aria-label={`View image ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width:  i === frame ? "16px" : "4px",
                height: "4px",
                borderRadius: "999px",
                background: i === frame ? "#10B981" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Right: Details ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-between p-5 min-w-0">
        {/* Top — Price + Address */}
        <div>
          <p
            className="text-2xl font-bold text-white leading-none mb-1"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            {property.priceDisplay}
          </p>
          <p className="text-xs font-mono text-white/30 truncate">
            {property.title} · {property.locality}
          </p>
        </div>

        {/* Middle — Divider */}
        <div className="h-px my-4" style={{ background: "rgba(255,255,255,0.05)" }} />

        {/* Bottom — 3 Tactical Stats */}
        <div className="grid grid-cols-3 gap-3">
          {/* RERA Status */}
          <div>
            <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1.5">RERA</p>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 shrink-0" style={{ color: "#10B981" }} />
              <p className="text-[10px] font-mono text-white/60">Verified</p>
            </div>
          </div>

          {/* ROI */}
          <div>
            <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1.5">ROI</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 shrink-0 text-white/40" />
              <p className="text-[10px] font-mono text-white/60">{property.roi}%</p>
            </div>
          </div>

          {/* Area */}
          <div>
            <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1.5">Area</p>
            <div className="flex items-center gap-1">
              <SquareStack className="w-3 h-3 shrink-0 text-white/40" />
              <p className="text-[10px] font-mono text-white/60">{property.area}</p>
            </div>
          </div>
        </div>

        {/* Vibe Score — inline */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[8px] font-mono text-white/15 uppercase tracking-widest">Gecko Vibe Index™</p>
          <div className="flex items-center gap-1.5">
            <div
              className="h-1 rounded-full"
              style={{ width: "48px", background: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-1 rounded-full"
                style={{
                  width: `${property.vibeScore}%`,
                  background: "linear-gradient(to right, #059669, #10B981)",
                }}
              />
            </div>
            <p className="text-[10px] font-mono text-[#10B981]">{property.vibeScore}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  search, setSearch,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  minArea, setMinArea,
  sort, setSort,
  count, total,
  regionName,
}: {
  search: string; setSearch: (v: string) => void;
  minPrice: number; setMinPrice: (v: number) => void;
  maxPrice: number; setMaxPrice: (v: number) => void;
  minArea: number;  setMinArea: (v: number) => void;
  sort: SortKey;    setSort: (v: SortKey) => void;
  count: number;    total: number;
  regionName: string;
}) {
  return (
    <aside
      className="w-72 shrink-0 h-full overflow-y-auto px-6 py-8"
      style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Back nav */}
      <Link
        href="/regions"
        className="flex items-center gap-2 text-[9px] font-mono text-white/25 hover:text-white/60 uppercase tracking-widest mb-10 transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        All Regions
      </Link>

      {/* Region label */}
      <div className="mb-10">
        <p className="text-[9px] font-mono text-[#10B981] uppercase tracking-widest mb-2">Discovery Engine</p>
        <h1
          className="text-2xl font-bold text-white tracking-tight leading-tight"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          {regionName}
        </h1>
        <p className="text-[10px] font-mono text-white/20 mt-1">
          {count} of {total} properties
        </p>
      </div>

      {/* Search */}
      <div className="mb-10">
        <label className="block text-[9px] font-mono text-white/20 uppercase tracking-widest mb-3">
          Search
        </label>
        <div
          className="flex items-center gap-2 px-3 py-2.5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "3px",
          }}
        >
          <Search className="w-3.5 h-3.5 text-white/20 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Property, locality…"
            className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/15 outline-none font-sans"
          />
        </div>
      </div>

      {/* ── Advanced Analytics label ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <p className="text-[8px] font-mono text-white/15 uppercase tracking-widest">Advanced Analytics</p>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Price (₹ Lakhs)</label>
            <span className="text-[9px] font-mono text-white/30">{minPrice}L – {maxPrice === 50000 ? "50000L+" : `${maxPrice}L`}</span>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[8px] font-mono text-white/15 mb-2 uppercase tracking-wider">From</p>
              <input
                type="range"
                min={0} max={50000} step={50}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <p className="text-[8px] font-mono text-white/15 mb-2 uppercase tracking-wider">To</p>
              <input
                type="range"
                min={0} max={50000} step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Area Range */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Min. Area</label>
            <span className="text-[9px] font-mono text-white/30">{minArea.toLocaleString()} sq ft</span>
          </div>
          <input
            type="range"
            min={0} max={15000} step={100}
            value={minArea}
            onChange={(e) => setMinArea(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[8px] font-mono text-white/10">0</span>
            <span className="text-[8px] font-mono text-white/10">15,000 sq ft</span>
          </div>
        </div>

        {/* Sort — as Analytics Matrix */}
        <div>
          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-3">Sort Matrix</p>
          <div className="space-y-1">
            {SORTS.map((s) => (
              <button
                key={s.key}
                onClick={() => setSort(s.key)}
                className="w-full flex items-center justify-between px-3 py-2.5 transition-all duration-200"
                style={{
                  background: sort === s.key ? "rgba(16,185,129,0.08)" : "transparent",
                  border: `1px solid ${sort === s.key ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.04)"}`,
                  borderRadius: "3px",
                }}
              >
                <span
                  className="text-xs font-mono"
                  style={{ color: sort === s.key ? "#10B981" : "rgba(255,255,255,0.35)" }}
                >
                  {s.label}
                </span>
                <span className="text-[8px] font-mono text-white/15">{s.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Main Discovery Page ──────────────────────────────────────────────────────
export default function RegionDiscoveryPage() {
  const params  = useParams();
  const slug    = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";
  const region  = getRegion(slug);
  const rawProps = getPropertiesByRegion(slug);

  const [search,   setSearch]   = useState("");
  const [sort,     setSort]     = useState<SortKey>("default");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minArea,  setMinArea]  = useState(0);

  const filtered = useMemo(() => {
    let props = sortProps(rawProps, sort);

    if (search.trim()) {
      const q = search.toLowerCase();
      props = props.filter(
        (p) => p.title.toLowerCase().includes(q) || p.locality.toLowerCase().includes(q)
      );
    }

    // Price filter (property.price is in lakhs)
    props = props.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Area filter — parse sq ft from string like "2,100 sq ft"
    props = props.filter((p) => {
      const sqft = parseInt(p.area.replace(/[^0-9]/g, ""), 10) || 0;
      return sqft >= minArea;
    });

    return props;
  }, [rawProps, sort, search, minPrice, maxPrice, minArea]);

  if (!region) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0F1115" }}>
        <div className="text-center">
          <p className="text-[10px] font-mono text-[#10B981] tracking-widest mb-3 uppercase">404</p>
          <h1 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            Region not found
          </h1>
          <Link href="/regions" className="text-xs font-mono text-white/25 hover:text-white transition-colors">
            ← Back to Region Grid
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-76px)] overflow-hidden" style={{ background: "#0F1115" }}>
      {/* Sidebar */}
      <Sidebar
        search={search}     setSearch={setSearch}
        minPrice={minPrice} setMinPrice={setMinPrice}
        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
        minArea={minArea}   setMinArea={setMinArea}
        sort={sort}         setSort={setSort}
        count={filtered.length} total={rawProps.length}
        regionName={region.name}
      />

      {/* Right — Property Grid */}
      <main className="flex-1 overflow-y-auto px-8 py-8">
        {/* Hero stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-8 mb-8 pb-8"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        >
          <div>
            <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1">Market IDX</p>
            <p className="text-xl font-mono font-bold text-[#10B981]">{region.marketIndex.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1">YoY Growth</p>
            <p className="text-xl font-mono font-bold text-white/70">{region.yoyGrowth}</p>
          </div>
          <div>
            <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1">Avg. Price</p>
            <p className="text-xl font-mono font-bold text-white/70">{region.avgPrice}</p>
          </div>
          <div className="ml-auto">
            <p className="text-[8px] font-mono text-white/15 uppercase tracking-widest mb-1">Sorted by</p>
            <p className="text-[10px] font-mono text-white/35">
              {SORTS.find((s) => s.key === sort)?.label} · {SORTS.find((s) => s.key === sort)?.sub}
            </p>
          </div>
        </motion.div>

        {/* Cards — 2-column horizontal layout */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-[10px] font-mono text-white/15 uppercase tracking-widest mb-3">No results</p>
            <p className="text-sm text-white/25">Adjust your filters to see properties.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}
