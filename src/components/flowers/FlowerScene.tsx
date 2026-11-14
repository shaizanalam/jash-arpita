"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const flowerImages = [
  "/images/flowers/flower-01.png",
  "/images/flowers/flower-02.png",
  "/images/flowers/flower-03.png",
  "/images/flowers/flower-04.png",
  "/images/flowers/flower-05.png",
  "/images/flowers/flower-06.png",
  "/images/flowers/flower-07.png",
  "/images/flowers/flower-08.png",
  "/images/flowers/flower-09.png",
];

// Build well-formed letter points for "ARPITA".
// Coordinates are natural to each letter (y: 0 bottom → 6 top).
function generateLetterPoints() {
  const pts: { char: string; x: number; y: number }[] = [];
  const add = (char: string, x: number, y: number) => pts.push({ char, x, y });

  // ---- A (letter 1) ----
  const addA = (key: string) => {
    add(key, 2, 6);
    add(key, 1.5, 5); add(key, 1, 4); add(key, 0.5, 3); add(key, 0, 2); add(key, -0.5, 1); add(key, -1, 0);
    add(key, 2.5, 5); add(key, 3, 4); add(key, 3.5, 3); add(key, 4, 2); add(key, 4.5, 1); add(key, 5, 0);
    add(key, 0.5, 2.5); add(key, 1.5, 2.5); add(key, 2.5, 2.5); add(key, 3.5, 2.5);
  };
  addA("A1");

  // ---- R ----
  for (let y = 0; y <= 6; y++) add("R", 0, y);
  [1, 2, 3].forEach((x) => add("R", x, 6));
  add("R", 4, 5.5); add("R", 4, 4.5); add("R", 4, 3.5);
  [1, 2, 3].forEach((x) => add("R", x, 3));
  add("R", 2, 2); add("R", 3, 1); add("R", 4.5, 0);

  // ---- P ----
  for (let y = 0; y <= 6; y++) add("P", 0, y);
  [1, 2, 3].forEach((x) => add("P", x, 6));
  add("P", 4, 5.5); add("P", 4, 4.5); add("P", 4, 3.5);
  [1, 2, 3].forEach((x) => add("P", x, 3));

  // ---- I ----
  [0, 1, 2, 3, 4].forEach((x) => add("I", x, 6));
  for (let y = 1; y <= 5; y++) add("I", 2, y);
  [0, 1, 2, 3, 4].forEach((x) => add("I", x, 0));

  // ---- T ----
  [0, 1, 2, 3, 4].forEach((x) => add("T", x, 6));
  for (let y = 0; y <= 6; y++) add("T", 2, y);

  // ---- A (letter 2) ----
  addA("A2");

  return pts;
}

// Horizontal pitch per letter — generous gaps keep the letters distinct
// even when the flowers are large.
const letterOffsets: Record<string, number> = {
  A1: 1, // natural -1..5  →  0..6
  R: 8, // natural  0..4.5 →  8..12.5
  P: 15, // natural  0..4   → 15..19
  I: 22, // natural  0..4   → 22..26
  T: 29, // natural  0..4   → 29..33
  A2: 36, // natural -1..5  → 35..41
};

const targetPositions = generateLetterPoints().map((pt) => ({
  x: pt.x + letterOffsets[pt.char],
  y: pt.y,
}));

const numFlowers = targetPositions.length;
const armGap = 9;
const chainGap = 9;
const b = armGap / (2 * Math.PI);

// Total horizontal span is 0..41, so the visual centre is 20.5.
const centerX = 20.5;

const flowers = Array.from({ length: numFlowers }).map((_, i) => {
  const theta = Math.sqrt(((2 * chainGap) / b) * i);
  const radius = b * theta;
  const spiralX = Math.cos(-theta) * radius;
  const spiralY = Math.sin(-theta) * radius;

  const targetPt = targetPositions[i];
  const jitterX = (Math.random() - 0.5) * 0.35;
  const jitterY = (Math.random() - 0.5) * 0.35;

  // Desktop spell positions (vw units) — wide spread so big flowers don't merge
  const spellX = (targetPt.x - centerX) * 2.1 + jitterX;
  const spellY = (targetPt.y - 3) * -3.0 + jitterY;

  // Mobile spell positions — portrait-friendly
  const spellXMobile = (targetPt.x - centerX) * 1.85 + jitterX;
  const spellYMobile = (targetPt.y - 3) * -2.8 + jitterY;

  const sizeVw = 24;

  return {
    id: i,
    src: flowerImages[i % flowerImages.length],
    spiralX,
    spiralY,
    spellX,
    spellY,
    spellXMobile,
    spellYMobile,
    sizeVw,
    delay: i * 0.055,
    rotation: theta * (180 / Math.PI) + (Math.random() * 40 - 20),
    spinDuration: 20 + Math.random() * 20,
    spinDirection: i % 2 === 0 ? 360 : -360,
    zIndex: i,
  };
});

type FlowerPhase = "expanding" | "spell" | "done";

interface FlowerSceneProps {
  onComplete: () => void;
}

export default function FlowerScene({ onComplete }: FlowerSceneProps) {
  const [phase, setPhase] = useState<FlowerPhase>("expanding");
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setPhase("spell"), 8500));
    timers.push(setTimeout(() => setPhase("done"), 12000));
    timers.push(setTimeout(() => onComplete(), 12400));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 overflow-hidden"
      style={{
        background:
          phase === "spell" || phase === "done"
            ? "linear-gradient(180deg, #7F1D1D 0%, #991B1B 50%, #7F1D1D 100%)"
            : "#000000",
        transition: "background 1.5s ease-in-out",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="relative w-full h-full overflow-hidden">
          {flowers.map((flower) => {
            const isExpanding = phase === "expanding";

            const targetX = isExpanding
              ? isMobile
                ? flower.spiralX * 1.5
                : flower.spiralX
              : isMobile
                ? flower.spellXMobile
                : flower.spellX;
            const targetY = isExpanding
              ? isMobile
                ? flower.spiralY * 2.2
                : flower.spiralY
              : isMobile
                ? flower.spellYMobile
                : flower.spellY;

            // Flowers render big and lush when spelling the name
            const spellSize = isMobile ? 5 : 4.5;
            const targetScale = isExpanding ? 1 : spellSize / flower.sizeVw;

            return (
              <motion.div
                key={flower.id}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  zIndex: flower.zIndex,
                  width: `${flower.sizeVw}vw`,
                  height: `${flower.sizeVw}vw`,
                  marginTop: `-${flower.sizeVw / 2}vw`,
                  marginLeft: `-${flower.sizeVw / 2}vw`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0,
                  rotate: flower.rotation - 180,
                }}
                animate={{
                  opacity: 1,
                  scale: targetScale,
                  x: `${targetX}vw`,
                  y: `${targetY}vw`,
                  rotate: flower.rotation,
                }}
                transition={{
                  delay: isExpanding ? flower.delay : 0,
                  duration: isExpanding ? 1.3 : 1.8,
                  ease: isExpanding ? "easeInOut" : [0.4, 0, 0.2, 1],
                }}
              >
                <motion.img
                  src={flower.src}
                  alt="flower"
                  animate={{ rotate: [0, flower.spinDirection] }}
                  transition={{
                    duration: flower.spinDuration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    willChange: "transform",
                  }}
                  loading="eager"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {(phase === "spell" || phase === "done") && (
          <motion.div
            className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-12 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.p
              className="text-white/60 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-sans font-medium"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Unlock to Explore
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            className="absolute inset-0 z-[60] bg-black pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
