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
      initial={{ opacity: 0, y: 60, rotate: rotation * 2, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: index * 0.12,
        duration: 0.7,
        type: "spring",
        stiffness: 120,
        damping: 14,
      }}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        zIndex: 20,
        transition: { duration: 0.3 },
      }}
      style={{
        rotate: `${rotation}deg`,
        filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.35))",
        transform: "translateZ(0)",
      }}
    >
      {/* 
        Mobile: w-[calc(50vw-28px)] makes each polaroid fill exactly half the screen minus padding/gap
        sm: 210px, md+: 240px for larger screens
      */}
      <div className="bg-white p-2 pb-10 sm:p-3.5 sm:pb-16 w-[calc(50vw-28px)] sm:w-[210px] md:w-[240px] rounded-[2px] cursor-default shadow-md">
        {/* Photo area */}
        <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden rounded-[1px]">
          {!imageError ? (
            <Image
              src={image}
              alt={caption}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 300px, 400px"
              quality={100}
              onError={() => setImageError(true)}
              loading="eager"
              priority={index < 4}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-crimson-200 to-crimson-400 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="absolute bottom-1 sm:bottom-2.5 left-1.5 right-1.5 sm:left-2 sm:right-2 flex items-center justify-center min-h-[28px] sm:min-h-[40px]">
          <p className="text-center font-script text-[10px] sm:text-sm text-gray-800 leading-tight">
            {caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
