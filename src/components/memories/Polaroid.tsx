"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface PolaroidProps {
  image: string;
  caption: string;
  rotation: number;
  index: number;
}

export default function Polaroid({ image, caption, rotation, index }: PolaroidProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0, y: 50, rotate: rotation * 2.2, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        delay: index * 0.11,
        duration: 0.75,
        type: "spring",
        stiffness: 130,
        damping: 16,
      }}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        zIndex: 30,
        transition: { duration: 0.4, ease: "easeOut" },
      }}
      style={{
        rotate: `${rotation}deg`,
        filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.3))",
        transform: "translateZ(0)",
      }}
    >
      <div
        className="bg-white p-2 sm:p-3 pb-12 sm:pb-20 w-[calc(50vw-24px)] sm:w-[230px] md:w-[270px] rounded-[3px] shadow-inner border border-white/60"
        style={{
          boxShadow:
            "0 4px 6px rgba(0,0,0,0.06), 0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        {/* Photo area */}
        <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden rounded-[2px]">
          {!imageError ? (
            <Image
              src={image}
              alt={caption}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 300px, 400px"
              quality={100}
              onError={() => setImageError(true)}
              loading="eager"
              priority={index < 4}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-crimson-100 to-crimson-300 flex items-center justify-center">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="crimson-700" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="absolute bottom-1 sm:bottom-3 left-2 right-2 sm:left-3 sm:right-3 flex items-center justify-center min-h-[32px] sm:min-h-[44px]">
          <p className="text-center font-script text-xs sm:text-base text-gray-800 leading-tight">
            {caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
