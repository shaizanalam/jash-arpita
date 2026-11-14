"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type IntroPhase = "reveal" | "name" | "done";

interface IntroSequenceProps {
  onComplete: () => void;
}

// Gentle floating particles (petals/hearts) for the intro background
const particles = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 4 + Math.random() * 10,
  delay: Math.random() * 6,
  duration: 10 + Math.random() * 12,
  rotate: Math.random() * 360,
}));

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<IntroPhase>("reveal");
  const [skip, setSkip] = useState(false);

  // Auto-advance through phases, then complete
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("name"), 1400);
    const t2 = setTimeout(() => setPhase("done"), 4200);
    const t3 = setTimeout(() => onComplete(), 4600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    setSkip(true);
    // Fast-forward to done
    setPhase("done");
    setTimeout(() => onComplete(), 400);
  }, [onComplete]);

  const isDone = phase === "done" || skip;

  return (
    <AnimatePresence mode="wait">
      {!isDone ? (
        <motion.div
          className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Soft gradient glow behind the text */}
          <motion.div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, rgba(185, 28, 28, 0.18) 0%, transparent 60%), radial-gradient(80% 80% at 80% 20%, rgba(220, 38, 38, 0.12) 0%, transparent 50%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />

          {/* Floating decorative particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-white/20 backdrop-blur-sm"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  opacity: 0.4,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 12, 0],
                  rotate: [p.rotate, p.rotate + 45, p.rotate],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {phase === "reveal" && (
            <>
              {/* Small label */}
              <motion.p
                className="text-[10px] sm:text-xs tracking-[0.5em] uppercase font-sans text-white/50 mb-10 sm:mb-14"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                A little something for you
              </motion.p>

              {/* "Happy Birthday" */}
              <motion.h1
                className="font-serif text-white text-4xl sm:text-6xl lg:text-8xl font-light italic tracking-tight leading-tight mb-2"
                style={{ textShadow: "0 0 30px rgba(220, 38, 38, 0.35)" }}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                Happy Birthday
              </motion.h1>

              {/* Skip hint */}
              <motion.p
                className="text-[10px] sm:text-xs text-white/30 tracking-widest mt-12 sm:mt-16 font-sans uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                onClick={handleSkip}
                style={{ cursor: "pointer" }}
              >
                tap to skip
              </motion.p>
            </>
          )}

          {phase === "name" && (
            <>
              {/* The name "Arpita" — centerpiece */}
              <motion.h1
                className="font-[Cormorant_Garamond] text-white text-5xl sm:text-7xl lg:text-9xl font-light italic tracking-tighter leading-none mb-1"
                style={{
                  textShadow:
                    "0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(185, 28, 28, 0.45)",
                  background:
                    "linear-gradient(to bottom, #ffffff 0%, #fde8e8 40%, #fbd5d5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{
                  delay: 0.2,
                  duration: 1.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                Arpita
              </motion.h1>

              <motion.p
                className="text-[11px] sm:text-xs tracking-[0.6em] uppercase font-sans text-white/40 mt-3 sm:mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                with love
              </motion.p>

              <motion.div
                className="w-8 h-0.5 bg-white/30 mx-auto mt-10 sm:mt-14 rounded"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              />
            </>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
