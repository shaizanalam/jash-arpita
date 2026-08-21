"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function LetterSection() {
  const paragraphs = content.letterBody.split("\n\n");

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-16 px-3 sm:py-24 sm:px-4 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1a0000 0%, #3d0000 30%, #7F1D1D 60%, #5a0f0f 100%)",
      }}
    >
      {/* Subtle ambient glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[60vw] sm:w-[40vw] h-[60vw] sm:h-[40vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(185,28,28,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[50vw] sm:w-[35vw] h-[50vw] sm:h-[35vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Parchment Letter Card */}
      <motion.div
        className="relative w-full max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Outer decorative frame */}
        <div
          className="absolute -inset-[1px] rounded-xl sm:rounded-2xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,200,150,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(255,180,100,0.2) 100%)",
          }}
        />

        {/* Main card */}
        <div
          className="relative rounded-xl sm:rounded-2xl px-5 py-8 sm:px-14 sm:py-16"
          style={{
            background: "linear-gradient(160deg, rgba(255,245,220,0.96) 0%, rgba(255,238,200,0.98) 50%, rgba(255,245,215,0.95) 100%)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {/* Top decorative line */}
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-10">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(180,100,40,0.4))" }} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="sm:w-5 sm:h-5">
              <path d="M12 2L14.09 8.26L20.73 9.27L16 13.86L17.18 20.5L12 17.27L6.82 20.5L8 13.86L3.27 9.27L9.91 8.26L12 2Z" fill="rgba(180,100,40,0.5)" />
            </svg>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(180,100,40,0.4), transparent)" }} />
          </div>

          {/* Greeting */}
          <motion.h2
            className="font-script text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-10 text-center"
            style={{ color: "#5a2d00", textShadow: "0 1px 3px rgba(120,60,0,0.15)" }}
            variants={itemVariants}
          >
            {content.letterGreeting}
          </motion.h2>

          {/* Letter Body */}
          <div className="space-y-4 sm:space-y-5">
            {paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                className="font-script text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-left"
                style={{ color: "#3d1a00" }}
                variants={itemVariants}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Divider */}
          <motion.div className="mt-8 sm:mt-12 mb-4 sm:mb-6" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(180,100,40,0.35))" }} />
              <span style={{ color: "rgba(180,100,40,0.5)", fontSize: "18px" }}>❧</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(180,100,40,0.35), transparent)" }} />
            </div>
          </motion.div>

          {/* Signature */}
          <motion.div className="text-right" variants={itemVariants}>
            <p
              className="font-script text-xl sm:text-2xl md:text-3xl italic"
              style={{ color: "#5a2d00" }}
            >
              {content.letterSignature},
            </p>
            <p
              className="font-script text-lg sm:text-xl md:text-2xl mt-1"
              style={{ color: "#7a4a10" }}
            >
              {content.letterSignatureName}
            </p>
          </motion.div>

          {/* Wax Seal accent */}
          <motion.div
            className="absolute -bottom-5 sm:-bottom-7 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
            style={{
              background: "radial-gradient(circle at 40% 35%, #dc2626, #7f1d1d)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,100,100,0.3)",
            }}
            variants={itemVariants}
          >
            <span className="text-white/80 text-base sm:text-xl" style={{ fontFamily: "serif", fontStyle: "italic" }}>S</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
