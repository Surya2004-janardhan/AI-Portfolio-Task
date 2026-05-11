"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitText({ text, className = "", delay = 0 }: SplitTextProps) {
  // Elite easing curve for smooth, expensive-feeling sweeps
  const eliteEase = [0.16, 1, 0.3, 1];

  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIndex) => {
            const index = wordIndex * 5 + charIndex; // Approximate overall index for stagger
            return (
              <span key={`${char}-${index}`} className="inline-block overflow-hidden relative">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", rotateX: 90, opacity: 0 }}
                  animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    ease: eliteEase,
                    delay: delay + index * 0.03, // Micro-stagger
                  }}
                  style={{ transformOrigin: "bottom center" }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
