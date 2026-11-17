"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";
import Cake from "./Cake";

// Floating hearts scattered across the celebration sky
const hearts = [
  { left: "10%", top: "20%", size: 14, delay: 0, dur: 7 },
  { left: "86%", top: "16%", size: 18, delay: 1.2, dur: 8 },
  { left: "18%", top: "68%", size: 12, delay: 2.1, dur: 6.5 },
  { left: "80%", top: "64%", size: 16, delay: 0.6, dur: 9 },
  { left: "50%", top: "10%", size: 10, delay: 1.7, dur: 7.5 },
];

export default function BirthdayHero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[100dvh] overflow-hidden px-6 py-20 select-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 10%, #991B1B 0%, #7F1D1D 48%, #5a0f0f 100%)",
      }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[85vw] sm:w-[55vw] h-[60vh] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[5%] w-[50vw] sm:w-[32vw] h-[50vh] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 170, 90, 0.15) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((h, i) => (
          <span
            key={i}
            className="absolute text-white/20 select-none pointer-events-none"
            style={{
              left: h.left,
              top: h.top,
              fontSize: h.size,
              animation: `heart-float ${h.dur}s ease-in-out ${h.delay}s infinite`,
            }}
            aria-hidden="true"
          >
            ❤
          </span>
        ))}
      </div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
        }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="text-[10px] sm:text-xs tracking-[0.45em] uppercase font-sans text-white/60 mb-5 sm:mb-7 font-medium"
        >
          {content.heroSubtitle}
        </motion.p>

        {/* Heading */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="font-script text-5xl sm:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight"
          style={{ textShadow: "0 6px 36px rgba(0,0,0,0.55)" }}
        >
          {content.memoryHeading}
        </motion.h1>

        {/* Divider with sparkle */}
        <motion.div
          className="flex items-center gap-3 mt-5 sm:mt-7 mb-8 sm:mb-12"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.8, delay: 0.2 },
            },
          }}
        >
          <span className="block h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-white/40" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2L14.09 8.26L20.73 9.27L16 13.86L17.18 20.5L12 17.27L6.82 20.5L8 13.86L3.27 9.27L9.91 8.26L12 2Z"
              fill="rgba(255,255,255,0.75)"
            />
          </svg>
          <span className="block h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-white/40" />
        </motion.div>

        {/* Cake with glowing candles */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.88, y: 20 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 1, delay: 0.25, ease: "easeOut" },
            },
          }}
        >
          <Cake />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.45 },
            },
          }}
          className="font-script italic text-xl sm:text-3xl text-white/80 mt-8 sm:mt-10 tracking-wide"
        >
          {content.heroTagline}
        </motion.p>
      </motion.div>

      {/* Scroll cue with Apple fluid spring */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/45 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-sans font-medium">
          Scroll Down
        </span>
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
