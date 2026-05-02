"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useRef } from "react";

// Floating particle component for background atmosphere
function FloatingParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/20"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Individual letter animation for the name
  const nameLetters = "Surya".split("");
  const lastNameLetters = "Janardhan".split("");

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Floating particles */}
      <FloatingParticle delay={0} x="10%" y="20%" size={6} />
      <FloatingParticle delay={0.5} x="80%" y="15%" size={4} />
      <FloatingParticle delay={1} x="60%" y="70%" size={8} />
      <FloatingParticle delay={1.5} x="25%" y="60%" size={5} />
      <FloatingParticle delay={2} x="90%" y="45%" size={3} />
      <FloatingParticle delay={2.5} x="45%" y="85%" size={7} />
      <FloatingParticle delay={0.8} x="15%" y="75%" size={4} />
      <FloatingParticle delay={1.2} x="70%" y="30%" size={6} />

      {/* Animated grid lines background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '60px 60px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Background glow shadow */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full mix-blend-screen filter blur-[128px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full mix-blend-screen filter blur-[128px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="container relative z-10 px-6 mx-auto text-center"
        style={{ y: yText, opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 120 }}
        >
          <span className="inline-block py-1 px-3 mb-6 rounded-full bg-yellow-400/10 text-yellow-500 text-sm font-medium border border-yellow-400/20">
            Available for AI &amp; Full Stack Roles
          </span>
        </motion.div>

        {/* Letter-by-letter name reveal */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 text-white">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={`first-${i}`}
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.05, type: "spring", stiffness: 100 }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
          <span className="mr-4 md:mr-6"></span>
          {lastNameLetters.map((letter, i) => (
            <motion.span
              key={`last-${i}`}
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.05, type: "spring", stiffness: 100 }}
              className="inline-block text-primary"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mx-auto max-w-2xl mb-12"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          I&apos;m an AI Intern and Full Stack Engineer specializing in deploying
          autonomous AI agents, RAG pipelines, and building robust Full Stack applications.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, type: "spring" }}
        >
          <motion.a
            href="#projects"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-semibold hover:bg-foreground/90 transition-all w-full sm:w-auto"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,215,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </motion.a>
          <motion.a
            href="#"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all w-full sm:w-auto"
            whileHover={{ scale: 1.05, borderColor: "rgba(255,215,0,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
            animate={{ borderColor: ["rgba(255,255,255,0.2)", "rgba(255,215,0,0.5)", "rgba(255,255,255,0.2)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
