"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
                style={{ color: "rgba(16,185,129,0.18)" }}
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + ((path.id * 7) % 10),
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Gecko",
}: {
    title?: string;
}) {
    const words = title.split(" ");
    const router = useRouter();
    const [triggered, setTriggered] = useState(false);

    const handleDiscover = () => {
        if (triggered) return;
        setTriggered(true);
        setTimeout(() => router.push("/regions"), 650);
    };

    return (
        <div
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
            style={{ background: "#0F1115" }}
        >
            {/* Floating paths — two mirrored layers */}
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            {/* Ambient grid */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px)," +
                        "linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Radial vignette */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 0%, #0F1115 100%)",
                }}
            />

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Eyebrow label */}
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mb-8 uppercase"
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 500,
                          fontSize: "10px",
                          letterSpacing: "0.4em",
                          color: "#10B981",
                        }}
                    >
                        NCR · AI PropTech · RERA Verified
                    </motion.p>

                    {/* Headline — letter-by-letter spring animation */}
                    <h1
                        className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 uppercase"
                        style={{
                          fontFamily: "'Clash Display', sans-serif",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                        }}
                    >
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text"
                                        style={{
                                            backgroundImage:
                                                "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.55) 100%)",
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    {/* Animated subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xl md:text-2xl leading-relaxed font-light tracking-wide max-w-2xl mx-auto mb-12"
                        style={{
                          fontFamily: "'Satoshi', sans-serif",
                          fontWeight: 400,
                          color: "rgba(248,250,252,0.3)",
                        }}
                    >
                        Your{" "}
                        <AnimatedTextCycle
                            words={["investment", "future", "family", "capital", "search"]}
                            interval={3000}
                            className="text-white/60"
                        />{" "}
                        deserves better{" "}
                        <AnimatedTextCycle
                            words={["data", "truth", "transparency", "honesty", "intelligence"]}
                            interval={3000}
                            className="text-white/60"
                        />
                        .
                    </motion.p>

                    {/* CTA Button — shadcn ghost variant with stealth luxury wrapper */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.85 }}
                    >
                        <div
                            className="inline-block group relative p-px overflow-hidden"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
                                borderRadius: "4px",
                            }}
                        >
                            <Button
                                variant="ghost"
                                onClick={handleDiscover}
                                disabled={triggered}
                                className="rounded-sm px-10 py-6 text-base font-medium tracking-[0.12em] uppercase transition-all duration-300 group-hover:-translate-y-0.5"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    color: triggered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.85)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    backdropFilter: "blur(12px)",
                                    letterSpacing: "0.12em",
                                }}
                            >
                                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                    Discover Excellence
                                </span>
                                <motion.span
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    className="ml-3 opacity-50 group-hover:opacity-80 transition-all duration-300"
                                >
                                    →
                                </motion.span>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Stat strip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="mt-20 flex items-center justify-center gap-12"
                    >
                        {[
                            { value: "847+",   label: "Gurgaon Listings" },
                            { value: "98.4",   label: "Peak Vibe Score"  },
                            { value: "RERA",   label: "Verified Only"    },
                            { value: "₹65L+", label: "Entry Price"      },
                        ].map(({ value, label }) => (
                            <div key={label} className="text-center">
                                <p
                                    className="text-2xl font-bold leading-none mb-1.5"
                                    style={{
                                      fontFamily: "'Outfit', sans-serif",
                                      fontWeight: 600,
                                      color: "rgba(255,255,255,0.5)",
                                    }}
                                >
                                    {value}
                                </p>
                                <p
                                    className="text-[9px] uppercase tracking-widest"
                                    style={{
                                      fontFamily: "'Satoshi', sans-serif",
                                      fontWeight: 400,
                                      color: "rgba(255,255,255,0.18)",
                                    }}
                                >
                                    {label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Shutter transition overlay */}
            <motion.div
                className="absolute inset-0 z-50 pointer-events-none"
                style={{ background: "#0F1115", transformOrigin: "center" }}
                initial={{ scale: 0, borderRadius: "100%" }}
                animate={
                    triggered
                        ? { scale: 4, borderRadius: "0%", opacity: 1 }
                        : { scale: 0, borderRadius: "100%", opacity: 0 }
                }
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            />
        </div>
    );
}
