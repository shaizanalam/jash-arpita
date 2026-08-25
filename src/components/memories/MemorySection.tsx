"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";
import Cake from "./Cake";

export default function MemorySection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[60vh] md:min-h-[80vh] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #7F1D1D 0%, #991B1B 30%, #7F1D1D 100%)",
      }}
    >
      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center px-6 flex flex-col items-center mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <Cake />
        <h2
          className="font-script text-4xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl mb-4 mt-8"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
        >
          {content.memoryHeading}
        </h2>
        <motion.div
          className="w-16 h-1 bg-white/40 mx-auto rounded-full mt-8"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
      </motion.div>
    </section>
  );
}
