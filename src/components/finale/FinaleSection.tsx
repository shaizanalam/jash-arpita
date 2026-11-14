"use client";

import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";
import { useEffect, useState } from "react";

// Gentle star field for the finale night sky
const stars = Array.from({ length: 55 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2.5,
  opacity: 0.15 + Math.random() * 0.55,
  delay: Math.random() * 6,
  duration: 2.5 + Math.random() * 4,
}));

export default function FinaleSection() {
  const [typedText, setTypedText] = useState("");
  const [isInView, setIsInView] = useState(false);
  const fullText = content.finalMessage;
  const isComplete = typedText.length >= fullText.length;

  useEffect(() => {
    if (!isInView) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [isInView, fullText]);

  return (
    <section
      className="relative min-h-[85vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, #140826 0%, #0a0012 35%, #020008 100%)",
      }}
    >
      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [star.opacity * 0.25, star.opacity, star.opacity * 0.25],
              scale: [0.7, 1.15, 0.7],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        className="absolute pointer-events-none top-[8%] sm:top-[10%] left-1/2 -translate-x-1/2 sm:left-[12%] sm:-translate-x-0"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: { duration: 1.5, ease: "easeOut" },
        }}
        viewport={{ once: true, amount: 0.3 }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-20 h-20 sm:w-44 sm:h-44 rounded-full relative"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #fffde7, #ffe082, #ffcc02)",
            boxShadow:
              "0 0 35px 12px rgba(255, 220, 50, 0.35), 0 0 70px 40px rgba(255, 200, 0, 0.14), 0 0 110px 70px rgba(255, 180, 0, 0.08)",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{ width: "24%", height: "24%", top: "26%", left: "56%", background: "rgba(200,160,0,0.3)" }}
          />
          <div
            className="absolute rounded-full"
            style={{ width: "16%", height: "16%", top: "54%", left: "30%", background: "rgba(200,160,0,0.28)" }}
          />
          <div
            className="absolute rounded-full"
            style={{ width: "11%", height: "11%", top: "36%", left: "26%", background: "rgba(200,160,0,0.22)" }}
          />
        </div>
      </motion.div>

      {/* Deep-crimson glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, rgba(127,29,29,0.3) 0%, transparent 100%)",
        }}
      />

      {/* Main message */}
      <motion.div
        className="relative z-10 text-center px-6 sm:px-10 max-w-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        onViewportEnter={() => setIsInView(true)}
        transition={{ duration: 1 }}
      >
        {/* Small label above */}
        <motion.p
          className="text-white/30 text-[9px] sm:text-xs tracking-[0.45em] uppercase font-sans mb-6 sm:mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Always &amp; Forever
        </motion.p>

        {/* Typewriter message */}
        <h2
          className="font-script leading-relaxed"
          style={{
            fontSize: "clamp(1.7rem, 6vw, 4.6rem)",
            color: "#fff",
            textShadow:
              "0 0 45px rgba(255,220,100,0.45), 0 2px 24px rgba(0,0,0,0.7)",
          }}
        >
          {typedText}
          <motion.span
            className="inline-block w-[2px] h-[0.9em] bg-yellow-100 ml-1 align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </h2>

        {/* Heart below */}
        <AnimatePresence>
          {typedText.length > 0 && (
            <motion.div
              className="mt-8 sm:mt-14 flex justify-center"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6, duration: 0.7, type: "spring", stiffness: 220 }}
            >
              <motion.svg
                width="38"
                height="35"
                viewBox="0 0 24 22"
                fill="none"
                className="sm:w-14 sm:h-12"
                animate={{ scale: [1, 1.14, 1] }}
                transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
              >
                <path
                  d="M12 22L10.26 20.42C4.08 14.84 0 11.18 0 6.6C0 2.9 2.92 0 6.6 0C8.68 0 10.68 0.98 12 2.54C13.32 0.98 15.32 0 17.4 0C21.08 0 24 2.9 24 6.6C24 11.18 19.92 14.84 13.74 20.42L12 22Z"
                  fill="#ef4444"
                  style={{ filter: "drop-shadow(0 0 14px rgba(239,68,68,0.75))" }}
                />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Signature — appears once the message finishes typing */}
        <motion.p
          className="font-script italic text-lg sm:text-2xl text-white/55 mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 8 }}
          animate={isComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          — {content.letterSignatureName}
        </motion.p>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <p className="text-white/25 text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-sans">
          Made with ♥ for Arpita
        </p>
      </div>
    </section>
  );
}
