"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Item {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  num: string;
}

export const CurveCarousel = ({ items }: { items: Item[] }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Left to right flow (prevItem logic)
  const autoAdvance = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const nextItem = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prevItem = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Slow smooth auto-scroll
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      autoAdvance();
    }, 5000); // Slower interval for "smooth" feel
    return () => clearInterval(interval);
  }, [isPaused, index, autoAdvance]);

  return (
    <div 
      className="relative w-full h-[700px] flex items-center justify-center overflow-hidden py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Stage Container */}
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center [perspective:2000px] [transform-style:preserve-3d]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const itemIndex = (index + offset + items.length) % items.length;
            const item = items[itemIndex];
            
            return (
              <CarouselItem
                key={`${itemIndex}-${offset}`}
                item={item}
                offset={offset}
                custom={direction}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-8 z-30">
        <button 
          onClick={prevItem}
          className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white group backdrop-blur-md"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="flex gap-3">
          {items.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-700",
                i === index ? "bg-primary w-10 shadow-[0_0_20px_rgba(255,215,0,0.6)]" : "bg-white/5"
              )} 
            />
          ))}
        </div>
        <button 
          onClick={nextItem}
          className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white group backdrop-blur-md"
        >
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const CarouselItem = ({ item, offset, custom }: { item: Item; offset: number; custom: number }) => {
  const absOffset = Math.abs(offset);
  const x = offset * 400; // Even wider horizontal spread
  const z = absOffset * -450; // Deeper depth
  const rotateY = offset * -50; // Sharper curve
  const opacity = Math.max(0, 1 - absOffset * 0.45);
  const scale = 1 - absOffset * 0.25;

  return (
    <motion.div
      className="absolute w-[400px] md:w-[500px] h-[600px] pointer-events-auto"
      initial={{ 
        x: custom > 0 ? 1000 : -1000,
        opacity: 0,
        rotateY: custom > 0 ? 90 : -90,
        z: -1000
      }}
      animate={{ 
        x, 
        z, 
        rotateY, 
        opacity, 
        scale,
        zIndex: 10 - absOffset,
        y: offset === 0 ? [0, -10, 0] : 0, // Wavy idle for active card
      }}
      exit={{ 
        x: custom > 0 ? -1000 : 1000,
        opacity: 0,
        rotateY: custom > 0 ? -90 : 90,
        z: -1000
      }}
      transition={{
        x: { type: "spring", stiffness: 100, damping: 25 },
        z: { type: "spring", stiffness: 100, damping: 25 },
        rotateY: { type: "spring", stiffness: 100, damping: 25 },
        opacity: { duration: 0.6 },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <div className={cn(
        "relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 bg-[#050505] group/card shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-700",
        offset === 0 ? "border-primary/60 shadow-[0_0_60px_rgba(255,215,0,0.15)] ring-1 ring-primary/40" : "grayscale blur-[2px] opacity-40 scale-90"
      )}>
        {/* Technical Arsenal Accents */}
        <div className="absolute top-0 right-0 p-8 z-20">
          <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover/card:border-primary/50 transition-colors">
            <Code size={18} className="text-white/40 group-hover/card:text-primary transition-colors" />
          </div>
        </div>

        {/* Glossy Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent pointer-events-none" />

        {/* Project Number */}
        <div className="absolute top-10 left-10 text-7xl font-black text-white/[0.02] font-mono z-0 select-none">
          {item.num}
        </div>

        {/* Image Container */}
        <div className="h-[48%] w-full relative overflow-hidden">
          <motion.img 
            src={process.env.NODE_ENV === "production" ? `/Surya-Janardhan${item.image}` : item.image} 
            alt={item.title} 
            className="w-full h-full object-cover grayscale-[0.7] group-hover/card:grayscale-0 group-hover/card:scale-105 transition-all duration-1000"
            animate={offset === 0 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-12 flex flex-col h-[52%] justify-between relative z-10">
          <div>
            <motion.span 
              className="text-primary font-mono text-[9px] font-bold tracking-[0.5em] uppercase mb-4 block"
              animate={offset === 0 ? { opacity: [0.4, 1, 0.4] } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {item.subtitle}
            </motion.span>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter leading-none">
              {item.title}
            </h3>
            <p className="text-white/30 text-sm line-clamp-3 leading-relaxed font-medium tracking-tight">
              {item.description}
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex flex-wrap gap-2.5">
              {item.tech.slice(0, 4).map((t) => (
                <span key={t} className="text-[9px] font-mono font-bold px-3 py-2 bg-white/[0.02] border border-white/[0.06] rounded-xl text-white/20 uppercase tracking-[0.2em] group-hover/card:border-primary/20 group-hover/card:text-primary/40 transition-all">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-5">
              <a 
                href={item.github} 
                target="_blank" 
                className="flex-1 flex items-center justify-center gap-3 py-4.5 bg-white/5 border border-white/10 rounded-[1.5rem] text-[10px] font-black tracking-[0.2em] text-white/80 hover:bg-primary hover:text-black transition-all hover:scale-[1.03] active:scale-[0.97] uppercase"
              >
                DEPLOY REPO
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
