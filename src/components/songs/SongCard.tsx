"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Song } from "@/data/songs";
import { Play, Music } from "lucide-react";

interface SongCardProps {
  song: Song;
  index: number;
}

export default function SongCard({ song, index }: SongCardProps) {
  const [imageError, setImageError] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        delay: index * 0.14,
        duration: 0.7,
        type: "spring",
        stiffness: 110,
        damping: 15,
      }}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
    >
      <div
        className="rounded-2xl overflow-hidden group-hover:border-crimson-300/60"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="flex items-center gap-4 sm:gap-5 p-3 sm:p-5">
          {/* Album Cover */}
          <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-xl overflow-hidden flex-shrink-0 bg-crimson-900/60 shadow-lg shadow-crimson-900/20">
            {!imageError ? (
              <Image
                src={song.cover}
                alt={`${song.title} by ${song.artist}`}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                sizes="120px"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-crimson-700 to-crimson-900">
                <Music className="w-7 h-7 sm:w-8 sm:h-8 text-white/60" />
              </div>
            )}
          </div>

          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-white text-sm sm:text-base font-semibold tracking-tight">
              {song.title}
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mt-0.5">
              {song.artist}
            </p>
            {song.memory && (
              <p className="text-white/45 text-xs mt-1.5 font-script italic leading-tight">
                {song.memory}
              </p>
            )}
          </div>

          {/* Play Button */}
          <motion.button
            className="flex-shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-crimson-50 flex items-center justify-center transition-all duration-200 active:scale-95"
            whileTap={{ scale: 0.92 }}
            onClick={() => setPlaying((p) => !p)}
            aria-label={`Play ${song.title}`}
          >
            <Play
              className={`w-4 h-4 sm:w-5 sm:h-5 text-crimson-600 ml-0.5 transition-colors duration-200 ${playing ? "text-crimson-900" : ""}`}
              fill="currentColor"
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
