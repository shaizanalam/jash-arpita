"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PasscodeScreen from "@/components/unlock/PasscodeScreen";
import FlowerScene from "@/components/flowers/FlowerScene";
import BirthdayHero from "@/components/memories/BirthdayHero";
import MemoriesGallery from "@/components/memories/MemoriesGallery";
import LetterSection from "@/components/letter/LetterSection";
import SongsSection from "@/components/songs/SongsSection";
import FinaleSection from "@/components/finale/FinaleSection";

type AppState = "locked" | "flowers" | "exploring";

export default function Home() {
  const [state, setState] = useState<AppState>("locked");

  const handleUnlock = useCallback(() => {
    setState("flowers");
  }, []);

  const handleFlowersComplete = useCallback(() => {
    setState("exploring");
  }, []);

  return (
    <main className="relative bg-cream min-h-screen selection:bg-crimson-200 selection:text-crimson-900">
      {/* Passcode Lock Screen */}
      <AnimatePresence mode="wait">
        {state === "locked" && (
          <PasscodeScreen onUnlock={handleUnlock} />
        )}
      </AnimatePresence>

      {/* Flower Transition — spells "Arpita" */}
      <AnimatePresence>
        {state === "flowers" && (
          <FlowerScene onComplete={handleFlowersComplete} />
        )}
      </AnimatePresence>

      {/* Main Content — cinematic entry after flower animation */}
      <AnimatePresence>
        {state === "exploring" && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <BirthdayHero />
            <MemoriesGallery />
            <LetterSection />
            <SongsSection />
            <FinaleSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
