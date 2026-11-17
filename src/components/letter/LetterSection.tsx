"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function LetterSection() {
  const paragraphs = content.letterBody.split("\n\n");

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-16 px-3 sm:py-28 sm:px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1a0000 0%, #3d0000 30%, #7F1D1D 60%, #5a0f0f 100%)",
      }}
    >
      {/* Ambient glow orbs */}
      <div
        className="absolute top-[15%] left-[10%] w-[70vw] sm:w-[55vw] h-[70vw] sm:h-[55vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(185,28,28,0.14) 0%, transparent 65%)",
          filter: "blur(72px)",
        }}
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[60vw] sm:w-[45vw] h-[60vw] sm:h-[45vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(220,38,38,0.10) 0%, transparent 65%)",
          filter: "blur(88px)",
        }}
      />

      {/* Parchment Letter Card */}
      <motion.div
        className="relative w-full max-w-2xl mx-auto glass-dark rounded-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={containerVariants}
      >
        {/* Outer decorative glow */}
        <div
          className="absolute -inset-[1px] rounded-2xl pointer-events-none blur opacity-40"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,200,150,0.35) 0%, rgba(255,255,255,0.05) 50%, rgba(255,180,100,0.3) 100%)",
          }}
        />

        {/* Main card */}
        <div className="relative rounded-2xl px-6 py-10 sm:px-12 sm:py-16 glass paper-texture overflow-hidden">
          {/* Inner hairline border */}
          <div
            className="pointer-events-none absolute inset-3 rounded-xl border"
            style={{ borderColor: "rgba(180, 110, 50, 0.18)" }}
          />
          {/* Top decorative line */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 mb-8 sm:mb-12">
            <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(180,100,40,0.35))" }} />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
              <path d="M12 2L14.09 8.26L20.73 9.27L16 13.86L17.18 20.5L12 17.27L6.82 20.5L8 13.86L3.27 9.27L9.91 8.26L12 2Z" fill="rgba(180,100,40,0.55)" />
            </svg>
            <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, rgba(180,100,40,0.35), transparent)" }} />
          </div>

          {/* Greeting */}
          <motion.h2
            className="font-script text-3xl sm:text-4xl md:text-5xl mb-7 sm:mb-11 text-center"
            style={{ color: "#5a2d00", textShadow: "0 1px 3px rgba(120,60,0,0.15)" }}
            variants={itemVariants}
          >
            {content.letterGreeting}
          </motion.h2>

          {/* Letter Body */}
          <div className="space-y-5 sm:space-y-6">
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
          <motion.div className="mt-10 sm:mt-14 mb-5 sm:mb-8" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(180,100,40,0.3))" }} />
              <span style={{ color: "rgba(180,100,40,0.5)", fontSize: "20px" }}>❧</span>
              <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(90deg, rgba(180,100,40,0.3), transparent)" }} />
            </div>
          </motion.div>

          {/* Signature */}
          <motion.div className="text-right" variants={itemVariants}>
            <p className="font-script text-xl sm:text-2xl md:text-3xl italic mb-1" style={{ color: "#5a2d00" }}>
              {content.letterSignature.replace(/,+$/, "")},
            </p>
            <p className="font-script text-lg sm:text-xl md:text-2xl" style={{ color: "#7a4a10" }}>
              {content.letterSignatureName}
            </p>
          </motion.div>
        </div>

        {/* Wax Seal accent — sibling of the card so it is never clipped */}
        <motion.div
          className="absolute -bottom-7 sm:-bottom-10 left-1/2 -translate-x-1/2 z-10 w-12 h-12 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 40% 35%, #dc2626, #7f1d1d)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,100,100,0.3), 0 0 20px rgba(220,38,38,0.5)",
          }}
          variants={itemVariants}
        >
          <span className="text-white/85 text-lg sm:text-2xl" style={{ fontFamily: "serif", fontStyle: "italic" }}>J</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
