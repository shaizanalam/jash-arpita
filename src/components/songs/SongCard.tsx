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

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(185, 28, 28, 0.4)",
          boxShadow: "0 4px 30px rgba(185, 28, 28, 0.15)",
        }}
      >
        <div className="flex items-center gap-4 p-3 sm:p-4">
          {/* Album Cover */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-crimson-900">
            {!imageError ? (
              <Image
                src={song.cover}
                alt={`${song.title} by ${song.artist}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="80px"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-crimson-700 to-crimson-900">
                <Music className="w-6 h-6 text-white/50" />
              </div>
            )}
          </div>

          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-white text-sm sm:text-base font-semibold truncate">
              {song.title}
            </h3>
            <p className="text-white/60 text-xs sm:text-sm truncate mt-0.5">
              {song.artist}
            </p>
            {song.memory && (
              <p className="text-white/40 text-xs mt-1 truncate font-script italic">
                {song.memory}
              </p>
            )}
          </div>

          {/* Play Button */}
          <motion.button
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            whileTap={{ scale: 0.9 }}
            aria-label={`Play ${song.title}`}
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" fill="white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
