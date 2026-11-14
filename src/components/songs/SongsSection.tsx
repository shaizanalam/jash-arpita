"use client";

import { motion } from "framer-motion";
import { songs } from "@/data/songs";
import { content } from "@/data/content";
import SongCard from "./SongCard";

export default function SongsSection() {
  // Nothing to show — skip the section entirely so the page stays clean.
  if (songs.length === 0) return null;

  return (
    <section
      className="relative min-h-[70vh] sm:min-h-screen py-12 sm:py-24 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #7F1D1D 0%, #991B1B 40%, #B91C1C 100%)",
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/4 -translate-x-1/4 w-[60vw] sm:w-[40vw] h-[50vh] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(220, 38, 38, 0.14) 0%, transparent 55%)",
          filter: "blur(72px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[50vw] sm:w-[35vw] h-[50vh] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(127, 29, 29, 0.16) 0%, transparent 55%)",
          filter: "blur(80px)",
        }}
      />

      {/* Section Header */}
      <motion.div
        className="relative z-10 text-center mb-10 sm:mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white italic tracking-tight drop-shadow-lg">
          {content.songsHeading}
        </h2>
        <p className="text-white/40 text-[10px] sm:text-sm tracking-[0.35em] uppercase mt-3 sm:mt-4 font-sans font-medium">
          {content.songsSubheading}
        </p>
      </motion.div>

      {/* Song Cards */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {songs.map((song, i) => (
            <SongCard key={i} song={song} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
