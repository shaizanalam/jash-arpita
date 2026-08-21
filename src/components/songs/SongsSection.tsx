"use client";

import { motion } from "framer-motion";
import { songs } from "@/data/songs";
import { content } from "@/data/content";
import SongCard from "./SongCard";

export default function SongsSection() {
  return (
    <section
      className="relative min-h-screen py-14 px-4 sm:py-20"
      style={{
        background: "linear-gradient(180deg, #7F1D1D 0%, #991B1B 40%, #B91C1C 100%)",
      }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-8 sm:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white italic">
          {content.songsHeading}
        </h2>
        <p className="text-white/40 text-[10px] sm:text-sm tracking-[0.3em] uppercase mt-2 sm:mt-3 font-sans">
          {content.songsSubheading}
        </p>
      </motion.div>

      {/* Song Cards — single column on mobile, 2 cols on sm+ */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
        {songs.map((song, i) => (
          <SongCard key={i} song={song} index={i} />
        ))}
      </div>
    </section>
  );
}
