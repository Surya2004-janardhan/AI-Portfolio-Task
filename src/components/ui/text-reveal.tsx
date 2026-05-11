"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TextReveal — Scroll-linked text reveal where each word fades from dim to bright
 * as the user scrolls through the section. Creates an editorial reading experience.
 */
interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed tracking-tight">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          return (
            <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [2, 0]);

  return (
    <motion.span
      className="inline-block mr-[0.3em] will-change-[opacity,transform]"
      style={{ opacity, y }}
    >
      {children}
    </motion.span>
  );
}
