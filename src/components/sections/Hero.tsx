"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useRef } from "react";


export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const nameLetters = "SURYA".split("");
  const lastNameLetters = "JANARDHAN".split("");

  return (
    <section ref={ref} className="relative min-h-[120vh] flex items-center justify-center overflow-hidden">
      {/* Clean concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[440px] h-[440px] rounded-full border border-white/[0.03]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[680px] h-[680px] rounded-full border border-white/[0.02]"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[920px] h-[920px] rounded-full border border-white/[0.015]"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Center reticle crosshair */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="w-[500px] h-[500px] rounded-full border border-primary/10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="container relative z-10 px-6 mx-auto text-center"
        style={{ y: yText, opacity, scale, rotateX, perspective: 1000 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        >
          <span className="inline-block py-1.5 px-4 mb-8 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-[0.3em] border border-primary/20">
            {/* {"// open to opportunities"} No need this section */}
          </span>
        </motion.div>

        {/* Massive split name with stagger */}
        <div className="mb-4 overflow-hidden">
          <div className="flex items-center justify-center gap-1 md:gap-2">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={`f-${i}`}
                className="text-6xl md:text-[10rem] lg:text-[12rem] font-black leading-none text-white tracking-tighter"
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.06, type: "spring", stiffness: 60, damping: 12 }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="mb-10 overflow-hidden">
          <div className="flex items-center justify-center gap-0.5 md:gap-1">
            {lastNameLetters.map((letter, i) => (
              <motion.span
                key={`l-${i}`}
                className="text-4xl md:text-6xl lg:text-8xl font-black leading-none text-primary tracking-[0.1em]"
                initial={{ y: 200, opacity: 0, rotateZ: 15 }}
                animate={{ y: 0, opacity: 1, rotateZ: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.04, type: "spring", stiffness: 60, damping: 12 }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p
          className="text-base md:text-lg text-white/60 font-mono mx-auto max-w-xl mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          spending most of my time on full-stack apps and AI systems, mostly things I wanted to exist and sometimes couldn&apos;t find.        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <motion.a
            href="#projects"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-black rounded-full font-bold tracking-wide hover:bg-primary/90 transition-all w-full sm:w-auto"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,215,0,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </motion.a>
          <motion.a
            href="https://drive.google.com/file/d/1iHSh3v_KGjj8Ay1q2IqePfb1LvzFmzg0/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 border border-white/10 rounded-full font-bold text-white/60 hover:text-white hover:border-white/30 transition-all w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} />
            Resume
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.5 }}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
