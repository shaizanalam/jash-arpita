"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { Memory } from "@/data/memories";

interface PolaroidCardProps {
  memory: Memory;
  index: number;
  onClick: () => void;
}

export default function PolaroidCard({
  memory,
  index,
  onClick,
}: PolaroidCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer select-none group"
      initial={{
        opacity: 0,
        y: 40,
        rotate: memory.rotation * 1.8,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: memory.rotation,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.16,
        type: "spring",
        stiffness: 160,
        damping: 18,
      }}
      whileHover={{
        scale: 1.04,
        rotate: memory.rotation > 0 ? 1 : -1,
        y: -8,
        zIndex: 30,
        transition: { type: "spring", stiffness: 260, damping: 20 },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        filter: isHovered
          ? "drop-shadow(0 28px 45px rgba(0,0,0,0.55))"
          : "drop-shadow(0 16px 32px rgba(0,0,0,0.38))",
        transform: "translateZ(0)",
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View photo: ${memory.caption}`}
    >
      {/* Washi Tape Accent at Top */}
      <div
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 w-24 sm:w-28 h-6 sm:h-7 pointer-events-none rounded-[1px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(254, 243, 199, 0.65) 0%, rgba(253, 230, 138, 0.45) 100%)",
          borderLeft: "1px dashed rgba(180, 83, 9, 0.25)",
          borderRight: "1px dashed rgba(180, 83, 9, 0.25)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          backdropFilter: "blur(2px)",
          transform: `translateX(-50%) rotate(${index % 2 === 0 ? "-1.5deg" : "1.8deg"})`,
        }}
      />

      {/* Main Polaroid Frame */}
      <div
        className="relative bg-[#FAF8F5] p-3 sm:p-4 pb-7 sm:pb-8 w-[270px] sm:w-[310px] md:w-[330px] rounded-[4px] border border-amber-900/10 overflow-hidden"
        style={{
          boxShadow:
            "inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Subtle Paper Grain / Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
        />

        {/* Specular Liquid Glare Reflection on Hover */}
        <motion.div
          className="absolute -inset-full pointer-events-none z-10"
          initial={false}
          animate={{
            x: isHovered ? "200%" : "-100%",
          }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
            transform: "rotate(35deg)",
          }}
        />

        {/* Photo Container */}
        <div className="relative w-full aspect-[3/4] bg-[#1a0f0f] overflow-hidden rounded-[2px] shadow-inner">
          {!imageError ? (
            <Image
              src={memory.image}
              alt={memory.caption}
              fill
              unoptimized
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none"
              sizes="(max-width: 640px) 270px, (max-width: 1024px) 310px, 330px"
              quality={100}
              onError={() => setImageError(true)}
              loading="eager"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-stone-900 flex items-center justify-center text-stone-500">
              <span className="text-xs">Photo unavailable</span>
            </div>
          )}

          {/* Vignette Shadow for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />

          {/* Floating Tag Pill (Top Left of Photo) */}
          {memory.tag && (
            <div
              className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full border border-white/25 shadow-md flex items-center gap-1.5"
              style={{
                background: "rgba(20, 20, 20, 0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-white/90 text-[10px] font-sans font-medium tracking-wider uppercase">
                {memory.tag}
              </span>
            </div>
          )}

          {/* Hover View Button Overlay */}
          <div
            className={`absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-full border border-white/30 shadow-lg flex items-center gap-1.5 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 sm:opacity-0"
            }`}
            style={{
              background: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <Maximize2 className="w-3 h-3 text-white" />
            <span className="text-white text-[10px] font-sans tracking-wider uppercase font-medium">
              View
            </span>
          </div>
        </div>

        {/* Polaroid Bottom Caption Area */}
        <div className="mt-3.5 sm:mt-4 text-center px-1">
          <p
            className="font-script text-base sm:text-lg md:text-xl font-medium leading-snug tracking-wide text-stone-800"
            style={{ textShadow: "0 1px 1px rgba(255,255,255,0.8)" }}
          >
            {memory.caption}
          </p>
          {memory.date && (
            <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-stone-400 mt-1 font-medium">
              {memory.date}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
