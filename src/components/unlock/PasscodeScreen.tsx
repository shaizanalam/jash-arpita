"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECRET_CODE, content } from "@/data/content";

interface PasscodeScreenProps {
  onUnlock: () => void;
}

export default function PasscodeScreen({ onUnlock }: PasscodeScreenProps) {
  const [code, setCode] = useState("");
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const codeLength = SECRET_CODE.length;

  const handleDigit = useCallback(
    (digit: string) => {
      if (success) return;
      if (code.length >= codeLength) return;

      const newCode = code + digit;
      setCode(newCode);

      if (newCode.length === codeLength) {
        if (newCode === SECRET_CODE) {
          setSuccess(true);
          setTimeout(() => onUnlock(), 1000);
        } else {
          setShake(true);
          setTimeout(() => {
            setShake(false);
            setCode("");
          }, 600);
        }
      }
    },
    [code, codeLength, success, onUnlock]
  );

  const handleClear = useCallback(() => {
    if (success) return;
    setCode("");
  }, [success]);

  const handleBackspace = useCallback(() => {
    if (success) return;
    setCode((prev) => prev.slice(0, -1));
  }, [success]);

  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["C", "0", "⌫"],
  ];

  return (
    <AnimatePresence>
      {!success ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream px-4"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12"
              viewBox="0 0 48 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 44L20.52 40.84C8.16 29.68 0 22.28 0 13.2C0 5.8 5.84 0 13.2 0C17.36 0 21.36 1.96 24 5.08C26.64 1.96 30.64 0 34.8 0C42.16 0 48 5.8 48 13.2C48 22.28 39.84 29.68 27.48 40.84L24 44Z"
                fill="#DC2626"
              />
            </svg>
          </motion.div>

          <motion.div
            className="flex gap-2.5 sm:gap-3 mb-8 sm:mb-10"
            animate={shake ? { x: [0, -12, 12, -12, 12, -6, 6, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {Array.from({ length: codeLength }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 transition-colors duration-200 ${i < code.length ? "bg-crimson-500 border-crimson-500" : "bg-transparent border-gray-300"}`}
                animate={success && i < code.length ? { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-3 gap-3 sm:gap-4"
          >
            {keys.flat().map((key, index) => {
              const isSpecial = key === "C" || key === "⌫";
              return (
                <motion.button
                  key={key + index}
                  className={`keypad-btn w-[72px] h-[72px] sm:w-[76px] sm:h-[76px] rounded-full flex items-center justify-center text-xl sm:text-2xl font-light transition-colors duration-150 ${isSpecial ? "text-crimson-400 bg-crimson-50 hover:bg-crimson-100 active:bg-crimson-200" : "text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300"}`}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (key === "C") handleClear();
                    else if (key === "⌫") handleBackspace();
                    else handleDigit(key);
                  }}
                  aria-label={key === "C" ? "Clear" : key === "⌫" ? "Backspace" : `Digit ${key}`}
                >
                  {key}
                </motion.button>
              );
            })}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 text-xs sm:text-sm text-gray-400 font-sans tracking-[0.2em] uppercase text-center"
          >
            {content.passcodeHint}
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        >
          <motion.svg
            className="w-14 h-13 sm:w-16 sm:h-[58px]"
            viewBox="0 0 48 44"
            fill="none"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.3, 0.8, 1.5], opacity: [1, 1, 0.8, 0] }}
            transition={{ duration: 1.2 }}
          >
            <path
              d="M24 44L20.52 40.84C8.16 29.68 0 22.28 0 13.2C0 5.8 5.84 0 13.2 0C17.36 0 21.36 1.96 24 5.08C26.64 1.96 30.64 0 34.8 0C42.16 0 48 5.8 48 13.2C48 22.28 39.84 29.68 27.48 40.84L24 44Z"
              fill="#DC2626"
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
