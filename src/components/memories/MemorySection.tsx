"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";
import { memories } from "@/data/memories";
import Cake from "./Cake";
import Polaroid from "./Polaroid";

// Decorative floating hearts scattered around the hero
const hearts = [
  { left: "12%", top: "22%", size: 14, delay: 0, dur: 7 },
  { left: "84%", top: "18%", size: 18, delay: 1.2, dur: 8 },
  { left: "20%", top: "70%", size: 11, delay: 2.1, dur: 6.5 },
  { left: "78%", top: "66%", size: 15, delay: 0.6, dur: 9 },
  { left: "50%", top: "12%", size: 9, delay: 1.7, dur: 7.5 },
];

export default function MemorySection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #991B1B 0%, #7F1D1D 45%, #5a0f0f 100%)",
      }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[85vw] sm:w-[55vw] h-[60vh] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 38, 38, 0.22) 0%, transparent 62%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[5%] w-[50vw] sm:w-[32vw] h-[50vh] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 170, 90, 0.12) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((h, i) => (
          <span
            key={i}
            className="absolute text-white/25 select-none"
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
        viewport={{ once: true, amount: 0.4 }}
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
          className="text-[10px] sm:text-xs tracking-[0.5em] uppercase font-sans text-white/50 mb-6 sm:mb-8"
        >
          A celebration just for you
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
          style={{ textShadow: "0 6px 34px rgba(0,0,0,0.5)" }}
        >
          {content.memoryHeading}
        </motion.h1>

        {/* Divider with sparkle */}
        <motion.div
          className="flex items-center gap-3 mt-6 sm:mt-8 mb-10 sm:mb-14"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.8, delay: 0.2 },
            },
          }}
        >
          <span className="block h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-white/50" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2L14.09 8.26L20.73 9.27L16 13.86L17.18 20.5L12 17.27L6.82 20.5L8 13.86L3.27 9.27L9.91 8.26L12 2Z"
              fill="rgba(255,255,255,0.7)"
            />
          </svg>
          <span className="block h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-white/50" />
        </motion.div>

        {/* Cake */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.88, y: 24 },
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
              transition: { duration: 0.8, delay: 0.5 },
            },
          }}
          className="font-script italic text-lg sm:text-2xl text-white/75 mt-8 sm:mt-10"
        >
          Today the world celebrates you ✨
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-[0.35em] uppercase font-sans">
          Scroll
        </span>
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </motion.svg>
      </motion.div>

      {/* Memories grid — only when photos exist */}
      {memories.length > 0 && (
        <motion.div
          className="relative z-10 w-full max-w-5xl mx-auto px-2 sm:px-8 pt-16 sm:pt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9 }}
        >
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {memories.map((memory, index) => (
              <Polaroid
                key={index}
                image={memory.image}
                caption={memory.caption}
                rotation={memory.rotation}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
