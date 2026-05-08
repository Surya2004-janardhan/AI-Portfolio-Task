"use client";

import { motion } from "framer-motion";
import { CurveCarousel } from "@/components/ui/curve-carousel";

const projects = [
  {
    title: "Dreams",
    subtitle: "Autonomous AI Video Production",
    description: "60+ monthly lip-synced videos across YT & IG. Zero manual effort. Gemini 2.0 Pro + Qwen3-TTS.",
    tech: ["Node.js", "Python", "React", "Gemini 2.0", "FFmpeg"],
    image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif", 
    github: "https://github.com/Surya2004-janardhan/Dreams",
    num: "01",
  },
  {
    title: "Aditya Foods",
    subtitle: "Full-Stack Mobile App",
    description: "Food ordering app with Node.js backend, REST APIs, Razorpay, and Redis caching.",
    tech: ["React Native", "Node.js", "SQL", "Redis", "Expo"],
    image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif", 
    github: "https://github.com/Surya2004-janardhan/AdtFoods",
    num: "02",
  },
  {
    title: "AI Sensei",
    subtitle: "Intelligent Language Tutor",
    description: "Groq API for instant context-aware Japanese tutoring with vector search & Socket.IO exchange.",
    tech: ["React.js", "Node.js", "MongoDB", "Groq API", "Socket.IO"],
    image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif", 
    github: "https://github.com/Surya2004-janardhan/AI-sensei",
    num: "03",
  },
  {
    title: "Redis Leaderboard",
    subtitle: "Real-Time Game Backend",
    description: "Production-style leaderboard service with atomic operations and real-time updates.",
    tech: ["TypeScript", "Redis", "Express"],
    image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
    github: "https://github.com/Surya2004-janardhan/Redis-Powered-Game-Leaderboard-with-Atomic-Operations-and-Real-Time-Updates",
    num: "04",
  },
  {
    title: "Chunked Transfer",
    subtitle: "High-Performance File Service",
    description: "Production-grade 1GB+ file transfer with chunked uploads, resumability & streaming.",
    tech: ["TypeScript", "API", "Streaming"],
    image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
    github: "https://github.com/Surya2004-janardhan/High-Performance-Large-File-Transfer-Service-with-Chunked-Uploads",
    num: "05",
  },
  {
    title: "Emotion Analyzer",
    subtitle: "CNN+LSTM Stress Detection",
    description: "Cognitive emotion detection from audio & video using RAVDESS dataset.",
    tech: ["Python", "CNN", "LSTM", "RAVDESS"],
    image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
    github: "https://github.com/Surya2004-janardhan/emotion-based-stress-analyzer-desktop-app",
    num: "06",
  },
  {
    title: "IoT Analytics",
    subtitle: "Sensor Data Platform",
    description: "Containerized IoT backend for time-series sensor analytics with TimescaleDB.",
    tech: ["TypeScript", "TimescaleDB", "IoT", "Docker"],
    image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
    github: "https://github.com/Surya2004-janardhan/An-ioT-Sensor-Analytics-Platform-with-TimescaleDB",
    num: "07",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative z-10 bg-black overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Giant background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full text-center">
        <motion.span 
          className="text-[25vw] font-black text-white/[0.015] tracking-tighter whitespace-nowrap inline-block"
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          EXPERIENCE WORK EXPERIENCE
        </motion.span>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* {"// selected work"} */}
          </motion.span>
          <motion.h2
            className="text-4xl md:text-7xl font-black tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Featured <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.p
            className="text-white/40 font-mono text-sm mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            A curated selection of my most impactful engineering work.
          </motion.p>
        </motion.div>

        {/* 3D Curve Carousel */}
        <CurveCarousel items={projects} />
      </div>
    </section>
  );
}
