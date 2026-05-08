"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ClassyBackground = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate static-looking particles for consistency across renders
    const p = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(p);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Wavy Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.05),transparent_50%)] animate-pulse" 
          style={{ animationDuration: '8s' }}
        />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="wave">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="1">
              <animate attributeName="baseFrequency" values="0.01;0.015;0.01" dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
          <rect width="100%" height="100%" fill="transparent" filter="url(#wave)" opacity="0.1" stroke="rgba(255,215,0,0.1)" strokeWidth="2" />
        </svg>
      </div>

      {/* Snow Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white/20 rounded-full blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, 1000],
            opacity: [0, 1, 0],
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-primary/10 to-transparent blur-3xl opacity-50" />
    </div>
  );
};
