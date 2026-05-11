"use client";

import { motion } from "framer-motion";

/**
 * AuroraBeam — Cinematic ambient light effect.
 * Uses the exact palette from screen: amber gold + electric cyan.
 * Gradient stops: amber (#F5A623) + cyan (#00CFFF).
 * Pure CSS-driven animation via keyframes — minimal JS overhead.
 */
export function AuroraBeam({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Primary amber glow — top left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "900px",
          height: "900px",
          background:
            "radial-gradient(circle at center, hsl(43 95% 52% / 0.09), transparent 65%)",
          left: "15%",
          top: "-5%",
          animation: "auroraFloat 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Secondary cyan glow — bottom right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle at center, hsl(195 100% 50% / 0.06), transparent 65%)",
          right: "5%",
          bottom: "10%",
          animation: "auroraFloatAlt 28s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Tertiary amber whisper — right edge */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle at center, hsl(43 95% 52% / 0.04), transparent 70%)",
          right: "25%",
          top: "30%",
          animation: "auroraFloat 35s ease-in-out infinite reverse",
          animationDelay: "-10s",
          willChange: "transform",
        }}
      />

      {/* Soft vignette to ground the section */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_40%,hsl(222_35%_7%)_90%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,transparent_30%,hsl(222_35%_7%)_80%)]" />
    </div>
  );
}
