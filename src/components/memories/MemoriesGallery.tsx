"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "@/data/content";
import { memories, Memory } from "@/data/memories";
import PolaroidCard from "./PolaroidCard";
import MemoryLightbox from "./MemoryLightbox";

export default function MemoriesGallery() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  if (memories.length === 0) return null;

  const currentIndex = selectedMemory
    ? memories.findIndex((m) => m.id === selectedMemory.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex <= 0) {
      setSelectedMemory(memories[memories.length - 1]);
    } else {
      setSelectedMemory(memories[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex >= memories.length - 1) {
      setSelectedMemory(memories[0]);
    } else {
      setSelectedMemory(memories[currentIndex + 1]);
    }
  };

  return (
    <section
      className="relative min-h-[90vh] sm:min-h-screen py-20 sm:py-32 px-4 sm:px-8 overflow-hidden flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(180deg, #5a0f0f 0%, #3a0808 30%, #220303 70%, #1a0000 100%)",
      }}
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] sm:w-[65vw] h-[55vh] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 38, 38, 0.16) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-10 w-[55vw] sm:w-[35vw] h-[45vh] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 65%)",
          filter: "blur(85px)",
        }}
      />

      {/* Section Header */}
      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto mb-14 sm:mb-20 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Eyebrow */}
        <p className="text-[10px] sm:text-xs tracking-[0.45em] uppercase font-sans text-amber-200/70 font-semibold mb-3 sm:mb-4">
          {content.memoriesEyebrow}
        </p>

        {/* Heading */}
        <h2
          className="font-script text-4xl sm:text-6xl md:text-7xl text-white italic tracking-tight leading-tight"
          style={{ textShadow: "0 4px 25px rgba(0,0,0,0.5)" }}
        >
          {content.memoriesHeading}
        </h2>

        {/* Golden Divider */}
        <div className="flex items-center justify-center gap-3 my-4 sm:my-6">
          <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-amber-300/40" />
          <span className="text-amber-300/60 text-xs">✦</span>
          <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-amber-300/40" />
        </div>

        {/* Subtitle */}
        <p className="text-white/60 text-sm sm:text-base font-sans leading-relaxed max-w-lg mx-auto">
          {content.memoriesSubheading}
        </p>
      </motion.div>

      {/* Gallery Cards Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 sm:gap-14 md:gap-16 lg:gap-20">
        {memories.map((memory, index) => (
          <div
            key={memory.id}
            className={`flex items-center justify-center ${
              index === 1 ? "md:translate-y-8" : "md:-translate-y-4"
            }`}
          >
            <PolaroidCard
              memory={memory}
              index={index}
              onClick={() => setSelectedMemory(memory)}
            />
          </div>
        ))}
      </div>

      {/* Interactive Lightbox */}
      <MemoryLightbox
        memory={selectedMemory}
        currentIndex={currentIndex}
        totalCount={memories.length}
        onClose={() => setSelectedMemory(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
