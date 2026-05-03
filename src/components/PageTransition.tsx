"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const shutterVariants = {
  initial: { scaleY: 1 },
  animate: { scaleY: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { scaleY: 1, transition: { duration: 0.45, ease: EASE } },
};

const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.3, duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Shutter curtain */}
        <motion.div
          className="fixed inset-0 z-[999] origin-top bg-[#050505] pointer-events-none"
          variants={shutterVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        />
        {/* Page content */}
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
