"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * MagneticButton — Cursor-reactive button with magnetic pull on hover.
 * The element subtly follows the cursor within its bounding box, snapping
 * back with spring physics on mouse leave.
 */
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: "a" | "button";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  as = "button",
  href,
  target,
  rel,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  // Subtle glow that follows mouse position
  const glowX = useTransform(springX, (val) => val * 0.5 + 50);
  const glowY = useTransform(springY, (val) => val * 0.5 + 50);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = as === "a" ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
      style={{ x: springX, y: springY }}
    >
      <Component
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={cn(
          "relative overflow-hidden group",
          className
        )}
        whileTap={{ scale: 0.97 }}
      >
        {/* Magnetic glow effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, hsl(var(--primary) / 0.15), transparent 60%)`,
          }}
        />
        <span className="relative z-10">{children}</span>
      </Component>
    </motion.div>
  );
}
