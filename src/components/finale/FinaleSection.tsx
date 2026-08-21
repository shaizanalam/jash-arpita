"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";
import { useEffect, useState } from "react";

// Floating stars/sparkles for the moon-and-back finale
const sparkles = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1.5 + Math.random() * 3,
  opacity: 0.2 + Math.random() * 0.6,
  delay: Math.random() * 5,
  duration: 2.5 + Math.random() * 3.5,
}));

export default function FinaleSection() {
  const [typedText, setTypedText] = useState("");
  const [isInView, setIsInView] = useState(false);
  const fullText = content.finalMessage;

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
    }, 65);
    return () => clearInterval(interval);
  }, [isInView, fullText]);

  return (
    <section
      className="relative min-h-[80vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #0a0015 40%, #000008 100%)",
      }}
    >
      {/* Star field */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((star) => (
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
              opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
              scale: [0.8, 1.2, 0.8],
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

      {/* Moon — positioned differently on mobile (centered top) vs desktop (top right) */}
      <motion.div
        className="absolute pointer-events-none top-[6%] right-[30%] sm:top-[8%] sm:right-[12%]"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        animate={{
          y: [0, -10, 0],
        }}
      >
        <div
          className="w-16 h-16 sm:w-36 sm:h-36 rounded-full relative"
          style={{
            background: "radial-gradient(circle at 35% 35%, #fffde7, #ffe082, #ffcc02)",
            boxShadow:
              "0 0 30px 10px rgba(255, 220, 50, 0.3), 0 0 60px 30px rgba(255, 200, 0, 0.12), 0 0 100px 50px rgba(255,180,0,0.06)",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{ width: "22%", height: "22%", top: "28%", left: "55%", background: "rgba(200,160,0,0.3)" }}
          />
          <div
            className="absolute rounded-full"
            style={{ width: "14%", height: "14%", top: "55%", left: "30%", background: "rgba(200,160,0,0.25)" }}
          />
          <div
            className="absolute rounded-full"
            style={{ width: "10%", height: "10%", top: "38%", left: "25%", background: "rgba(200,160,0,0.2)" }}
          />
        </div>
      </motion.div>

      {/* Subtle deep-crimson glow at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, rgba(127,29,29,0.25) 0%, transparent 100%)",
        }}
      />

      {/* Main message */}
      <motion.div
        className="relative z-10 text-center px-5 sm:px-8 max-w-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        onViewportEnter={() => setIsInView(true)}
        transition={{ duration: 1 }}
      >
        {/* Small label above */}
        <motion.p
          className="text-white/30 text-[9px] sm:text-xs tracking-[0.4em] uppercase font-sans mb-5 sm:mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Always &amp; Forever
        </motion.p>

        {/* Typewriter message */}
        <h2
          className="font-script leading-tight"
          style={{
            fontSize: "clamp(1.6rem, 6vw, 4.5rem)",
            color: "#fff",
            textShadow: "0 0 40px rgba(255,220,100,0.4), 0 2px 20px rgba(0,0,0,0.6)",
          }}
        >
          {typedText}
          <motion.span
            className="inline-block w-[2px] h-[0.85em] bg-yellow-200 ml-1 align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </h2>

        {/* Heart below */}
        <motion.div
          className="mt-6 sm:mt-10 flex justify-center"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.6, type: "spring", stiffness: 200 }}
        >
          <motion.svg
            width="36"
            height="33"
            viewBox="0 0 24 22"
            fill="none"
            className="sm:w-12 sm:h-11"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M12 22L10.26 20.42C4.08 14.84 0 11.18 0 6.6C0 2.9 2.92 0 6.6 0C8.68 0 10.68 0.98 12 2.54C13.32 0.98 15.32 0 17.4 0C21.08 0 24 2.9 24 6.6C24 11.18 19.92 14.84 13.74 20.42L12 22Z"
              fill="#ef4444"
              style={{ filter: "drop-shadow(0 0 12px rgba(239,68,68,0.7))" }}
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
