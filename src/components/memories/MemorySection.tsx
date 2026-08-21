"use client";

import { motion } from "framer-motion";
import { memories } from "@/data/memories";
import { content } from "@/data/content";
import Polaroid from "./Polaroid";

// Pre-computed scattered positions for natural scrapbook feel — desktop
const scatterPositions = [
  { x: "5%", y: "8%" },
  { x: "55%", y: "3%" },
  { x: "25%", y: "25%" },
  { x: "65%", y: "22%" },
  { x: "8%", y: "48%" },
  { x: "50%", y: "45%" },
  { x: "30%", y: "65%" },
  { x: "62%", y: "68%" },
  { x: "15%", y: "82%" },
  { x: "52%", y: "85%" },
];

export default function MemorySection() {
  return (
    <section
      className="relative"
      style={{
        background: "linear-gradient(180deg, #7F1D1D 0%, #991B1B 30%, #7F1D1D 100%)",
      }}
    >
      {/* Scattered Polaroids - Desktop */}
      <div className="hidden md:block relative w-full h-[180vh]">
        {memories.map((memory, i) => {
          const pos = scatterPositions[i % scatterPositions.length];
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: pos.x,
                top: pos.y,
                zIndex: i + 1,
              }}
            >
              <Polaroid
                image={memory.image}
                caption={memory.caption}
                rotation={memory.rotation}
                index={i}
              />
            </div>
          );
        })}

        {/* Overlay text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2
            className="font-script text-4xl md:text-5xl lg:text-6xl text-white text-center px-8 drop-shadow-lg"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
          >
            {content.memoryHeading}
          </h2>
        </motion.div>
      </div>

      {/* Mobile Layout — Beautiful vertical scroll gallery */}
      <div className="md:hidden relative px-5 py-12">
        {/* Heading first on mobile */}
        <motion.h2
          className="font-script text-2xl text-white text-center mb-8 drop-shadow-lg"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {content.memoryHeading}
        </motion.h2>

        {/* 2-column masonry-style grid */}
        <div className="grid grid-cols-2 gap-3">
          {memories.map((memory, i) => (
            <motion.div
              key={i}
              className="flex justify-center"
              style={{ zIndex: i + 1 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Polaroid
                image={memory.image}
                caption={memory.caption}
                rotation={memory.rotation * 0.3}
                index={i}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
