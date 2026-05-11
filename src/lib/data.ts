"use client";

/**
 * Section data module — Centralized personal information used across all sections.
 * Single source of truth. Edit here to update everywhere.
 */

export const personalInfo = {
  name: "Surya Janardhan",
  fullName: "Surya Janardhan Chintala",
  role: "AI Engineer & Full Stack Developer",
  tagline: "Engineering high-performance AI systems and autonomous agent fleets.",
  bio: "I build things end-to-end — from schema design to deployment. Specializing in intelligent systems that solve real problems at scale. Deployed 20+ production AI agents at GrowStack.ai, designed RAG pipelines that actually work, and survived the chaos of full-stack development.",
  email: "chintalajanardhan2004@gmail.com",
  github: "https://github.com/SuryaJanardhan",
  githubUsername: "SuryaJanardhan",
  linkedin: "https://www.linkedin.com/in/surya-janardhan/",
  resumeUrl: "https://drive.google.com/file/d/1iHSh3v_KGjj8Ay1q2IqePfb1LvzFmzg0/view?usp=sharing",
};

export const stats = [
  { label: "AI Agents Deployed", value: 20, suffix: "+" },
  { label: "Problems Solved", value: 800, suffix: "+" },
  { label: "Months Experience", value: 10, suffix: "" },
];

export const experience = {
  title: "AI Intern",
  company: "GrowStack.ai",
  period: "May 2025 — Feb 2026",
  duration: "10 Months",
  highlights: [
    "Deployed 20+ production-ready AI agents automating Lead Generation and Campaign Orchestration via RAG pipelines",
    "Launched AI-powered content agents achieving 95% content accuracy and 60% sales training improvement",
    "Integrated LinkedIn, Twitter/X, and Instagram APIs with LLM-driven workflows, boosting engagement by 45%",
  ],
};

export const education = {
  degree: "B.Tech in AI & ML",
  institution: "Aditya College of Engineering",
  cgpa: "8.5/10",
};

export const projects = [
  {
    id: "dreams",
    title: "Dreams",
    subtitle: "Autonomous AI Video Production",
    description:
      "Autonomous system producing 60+ monthly lip-synced videos across YouTube, Instagram, and Facebook. Zero manual effort. Gemini 2.0 Pro + Wav2Lip with 95% accuracy.",
    tech: ["Node.js", "Python", "React", "Gemini 2.0", "FFmpeg"],
    github: "https://github.com/SuryaJanardhan/Dreams",
    featured: true,
    image: "/img-1.webp",
  },
  {
    id: "aditya-foods",
    title: "Aditya Foods",
    subtitle: "Full-Stack Mobile App",
    description:
      "Food ordering app for college canteens. Reduced order processing time by 40% and food fulfillment time by 50% with Redis caching and Razorpay integration.",
    tech: ["React Native", "Node.js", "SQL", "Redis", "Expo"],
    github: "https://github.com/SuryaJanardhan/AdtFoods",
    featured: false,
    image: "/img-2.webp",
  },
  {
    id: "ai-sensei",
    title: "AI Sensei",
    subtitle: "Intelligent Language Tutor",
    description:
      "Groq API for instant context-aware Japanese tutoring with vector search and Socket.IO real-time exchange.",
    tech: ["React.js", "Node.js", "MongoDB", "Groq API", "Socket.IO"],
    github: "https://github.com/SuryaJanardhan/AI-sensei",
    featured: false,
    image: "/img-3.webp",
  },
  {
    id: "redis-leaderboard",
    title: "Redis Leaderboard",
    subtitle: "Real-Time Game Backend",
    description:
      "Production-style leaderboard service with atomic operations, sorted sets, and real-time updates.",
    tech: ["TypeScript", "Redis", "Express"],
    github:
      "https://github.com/SuryaJanardhan/Redis-Powered-Game-Leaderboard-with-Atomic-Operations-and-Real-Time-Updates",
    featured: false,
    image: "/img-1.webp",
  },
  {
    id: "chunked-transfer",
    title: "Chunked Transfer",
    subtitle: "High-Performance File Service",
    description:
      "Production-grade 1GB+ file transfer with chunked uploads, resumability, and streaming architecture.",
    tech: ["TypeScript", "API Design", "Streaming"],
    github:
      "https://github.com/SuryaJanardhan/High-Performance-Large-File-Transfer-Service-with-Chunked-Uploads",
    featured: false,
    image: "/img-2.webp",
  },
  {
    id: "emotion-analyzer",
    title: "Emotion Analyzer",
    subtitle: "CNN+LSTM Stress Detection",
    description:
      "Cognitive emotion detection from audio and video signals using CNN + LSTM on the RAVDESS dataset.",
    tech: ["Python", "CNN", "LSTM", "RAVDESS"],
    github:
      "https://github.com/SuryaJanardhan/emotion-based-stress-analyzer-desktop-app",
    featured: false,
    image: "/img-3.webp",
  },
  {
    id: "iot-analytics",
    title: "IoT Analytics",
    subtitle: "Sensor Data Platform",
    description:
      "Containerized IoT backend for time-series sensor analytics with TimescaleDB and Docker orchestration.",
    tech: ["TypeScript", "TimescaleDB", "IoT", "Docker"],
    github:
      "https://github.com/SuryaJanardhan/An-ioT-Sensor-Analytics-Platform-with-TimescaleDB",
    featured: false,
    image: "/img-1.webp",
  },
];

export const skillCategories = [
  {
    category: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C", "R"],
  },
  {
    category: "AI / ML",
    skills: [
      "LangChain",
      "LLMs",
      "LangGraph",
      "AI Agents",
      "RAG",
      "Deep Learning",
      "Machine Learning",
    ],
  },
  {
    category: "Web Frameworks",
    skills: ["Node.js", "Express.js", "RESTful APIs", "Flask"],
  },
  {
    category: "Frontend",
    skills: ["React.js", "Next.js", "React Native", "Tailwind CSS", "Redux"],
  },
  {
    category: "Databases & Messaging",
    skills: ["MongoDB", "PostgreSQL", "SQL", "Redis", "RabbitMQ", "Kafka"],
  },
  {
    category: "Developer Tools",
    skills: ["Git", "Docker", "VS Code", "Postman", "GitHub Actions"],
  },
];
