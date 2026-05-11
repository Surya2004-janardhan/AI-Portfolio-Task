"use client";

import React from "react";

/**
 * AmbientBackground — Subtle atmospheric layer for the entire page.
 * Uses a dot grid, subtle noise, and a slow radial gradient pulse.
 * Much lighter than the previous 40-particle system.
 */
export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dot grid base */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise opacity-100" />

      {/* Subtle center radial glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(40 95% 55% / 0.04), transparent)",
        }}
      />

      {/* Bottom edge warm glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-primary/[0.03] to-transparent" />

      {/* Top vignette for depth */}
      <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}
