"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
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

  const nextItem = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % items.length);
  };

  const prevItem = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden py-20">
      {/* 3D Stage Container */}
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
        <AnimatePresence initial={false} custom={direction}>
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
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 z-30">
        <button 
          onClick={prevItem}
          className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white group"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === index ? "bg-primary w-6" : "bg-white/20"
              )} 
            />
          ))}
        </div>
        <button 
          onClick={nextItem}
          className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white group"
        >
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const CarouselItem = ({ item, offset, custom }: { item: Item; offset: number; custom: number }) => {
  // 3D positioning logic
  const absOffset = Math.abs(offset);
  const x = offset * 320; // Horizontal spread
  const z = absOffset * -250; // Depth
  const rotateY = offset * -35; // Curve rotation
  const opacity = 1 - absOffset * 0.35;
  const scale = 1 - absOffset * 0.15;

  return (
    <motion.div
      className="absolute w-[350px] md:w-[450px] h-[550px] pointer-events-auto"
      initial={{ 
        x: custom > 0 ? 500 : -500,
        opacity: 0,
        rotateY: custom > 0 ? 45 : -45,
        z: -500
      }}
      animate={{ 
        x, 
        z, 
        rotateY, 
        opacity, 
        scale,
        zIndex: 10 - absOffset 
      }}
      exit={{ 
        x: custom > 0 ? -500 : 500,
        opacity: 0,
        rotateY: custom > 0 ? -45 : 45,
        z: -500
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
      }}
    >
      <div className={cn(
        "relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] group/card shadow-2xl",
        offset === 0 ? "border-primary/40 ring-1 ring-primary/20" : ""
      )}>
        {/* Project Number */}
        <div className="absolute top-6 left-6 text-5xl font-black text-white/5 font-mono z-0">
          {item.num}
        </div>

        {/* Image Container */}
        <div className="h-1/2 w-full relative overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover grayscale-[0.5] group-hover/card:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col h-1/2 justify-between relative z-10">
          <div>
            <span className="text-primary font-mono text-xs tracking-widest uppercase mb-2 block">
              {item.subtitle}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {item.title}
            </h3>
            <p className="text-white/50 text-sm line-clamp-3 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {item.tech.slice(0, 3).map((t) => (
                <span key={t} className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white/40">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href={item.github} 
                target="_blank" 
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-primary hover:text-black transition-all"
              >
                <Code size={14} /> Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
