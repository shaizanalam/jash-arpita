"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Memory } from "@/data/memories";

interface MemoryLightboxProps {
  memory: Memory | null;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function MemoryLightbox({
  memory,
  currentIndex,
  totalCount,
  onClose,
  onPrev,
  onNext,
}: MemoryLightboxProps) {
  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!memory) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [memory, onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!memory) return;
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [memory, handleKeyDown]);

  if (!memory) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        onClick={onClose}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(30, 6, 6, 0.94) 0%, rgba(12, 0, 3, 0.98) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        {/* Subtle ambient lighting */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(220, 38, 38, 0.15) 0%, transparent 60%)",
          }}
        />

        {/* Top Floating Glass Header */}
        <motion.div
          className="relative z-10 w-full max-w-2xl flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Index & Tag Pill */}
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 shadow-xl"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300/90" />
            <span className="text-white/80 text-xs tracking-wider uppercase font-sans font-medium">
              {currentIndex + 1} of {totalCount}
            </span>
            {memory.tag && (
              <>
                <span className="text-white/30 text-xs">•</span>
                <span className="text-amber-200/90 text-xs font-sans font-medium tracking-wide">
                  {memory.tag}
                </span>
              </>
            )}
          </div>

          {/* Close Pill Button */}
          <button
            onClick={onClose}
            className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 text-white/80 hover:text-white transition-all shadow-xl active:scale-95"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            aria-label="Close photo preview"
          >
            <span className="text-[11px] font-sans uppercase tracking-widest text-white/60 group-hover:text-white/90 hidden sm:inline">
              Close
            </span>
            <X className="w-4 h-4 text-white/80 group-hover:text-white" />
          </button>
        </motion.div>

        {/* Main Photo Centerpiece */}
        <div
          className="relative z-10 flex-1 flex items-center justify-center w-full max-w-4xl my-auto py-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Button (Desktop) */}
          {totalCount > 1 && (
            <button
              onClick={onPrev}
              className="hidden sm:flex absolute -left-12 md:-left-16 z-20 w-11 h-11 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
              style={{
                background: "rgba(255, 255, 255, 0.09)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Photo Container with Apple-style Fluid Spring */}
          <motion.div
            key={memory.id}
            className="relative flex flex-col items-center justify-center max-w-[90vw] max-h-[68vh] sm:max-h-[72vh] rounded-2xl overflow-hidden p-2 sm:p-2.5 shadow-2xl border border-white/20"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
              boxShadow:
                "0 25px 60px -15px rgba(0, 0, 0, 0.75), 0 0 35px rgba(220, 38, 38, 0.2)",
            }}
          >
            {/* Image display */}
            <div className="relative w-auto h-auto max-h-[62vh] sm:max-h-[66vh] overflow-hidden rounded-xl">
              <Image
                src={memory.image}
                alt={memory.caption}
                width={800}
                height={1200}
                className="w-auto h-auto max-h-[62vh] sm:max-h-[66vh] max-w-[85vw] sm:max-w-xl object-contain rounded-xl select-none"
                priority
                unoptimized
              />
            </div>
          </motion.div>

          {/* Next Button (Desktop) */}
          {totalCount > 1 && (
            <button
              onClick={onNext}
              className="hidden sm:flex absolute -right-12 md:-right-16 z-20 w-11 h-11 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
              style={{
                background: "rgba(255, 255, 255, 0.09)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Bottom Floating Caption Pill */}
        <motion.div
          className="relative z-10 w-full max-w-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 260, delay: 0.08 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="px-6 py-4 rounded-2xl border border-white/15 shadow-2xl mx-auto"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
            }}
          >
            <p className="font-script text-xl sm:text-2xl md:text-3xl text-white italic tracking-wide">
              {memory.caption}
            </p>
            {memory.date && (
              <p className="text-white/50 text-[11px] sm:text-xs font-sans tracking-[0.25em] uppercase mt-1">
                {memory.date}
              </p>
            )}

            {/* Mobile Nav arrows */}
            {totalCount > 1 && (
              <div className="flex sm:hidden items-center justify-center gap-6 mt-3 pt-3 border-t border-white/10">
                <button
                  onClick={onPrev}
                  className="p-2 rounded-full bg-white/10 text-white/80 active:scale-90 transition-transform"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs text-white/60 font-sans">
                  {currentIndex + 1} / {totalCount}
                </span>
                <button
                  onClick={onNext}
                  className="p-2 rounded-full bg-white/10 text-white/80 active:scale-90 transition-transform"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
