"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { GraduationCap, Briefcase, Code2 } from "lucide-react";
import { useRef, useEffect } from "react";

// Animated counter that counts up when in view
function AnimatedCounter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals) + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const cards = [
  {
    icon: GraduationCap,
    title: "Education",
    stat: 8.5,
    statSuffix: "",
    decimals: 1,
    statLabel: "CGPA / 10",
    description: "B.Tech in AI & ML — Aditya College of Engineering",
    highlights: ["Artificial Intelligence", "Machine Learning", "Data Structures"],
  },
  {
    icon: Briefcase,
    title: "Experience",
    stat: 20,
    statSuffix: "+",
    decimals: 0,
    statLabel: "AI AGENTS DEPLOYED",
    description: "AI Intern at GrowStack.ai — Production RAG Pipelines",
    highlights: ["LangChain", "RAG Pipelines", "70% Effort Reduction"],
    featured: true,
  },
  {
    icon: Code2,
    title: "Problem Solving",
    stat: 800,
    statSuffix: "+",
    decimals: 0,
    statLabel: "PROBLEMS SOLVED",
    description: "Algorithmic mastery across competitive platforms",
    highlights: ["Algorithms", "Data Structures", "System Design"],
  },
];

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const card0Rotate = useTransform(scrollYProgress, [0.1, 0.5], [-12, 0]);
  const card0X = useTransform(scrollYProgress, [0.1, 0.5], [-60, 0]);
  const card1Y = useTransform(scrollYProgress, [0.1, 0.5], [50, 0]);
  const card2Rotate = useTransform(scrollYProgress, [0.1, 0.5], [12, 0]);
  const card2X = useTransform(scrollYProgress, [0.1, 0.5], [60, 0]);

  const cardTransforms = [
    { rotate: card0Rotate, x: card0X, y: 0 },
    { rotate: 0, x: 0, y: card1Y },
    { rotate: card2Rotate, x: card2X, y: 0 },
  ];

  return (
    <section ref={containerRef} id="about" className="py-32 relative z-10 bg-[#060606] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[15vw] font-black text-white/[0.02] tracking-tighter whitespace-nowrap">ABOUT ME</span>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <motion.div
          className="mb-20 max-w-3xl"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Bridging AI <span className="text-primary">&</span> Engineering
          </h2>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed">
            I build things end-to-end — from schema design to deployment. Specializing in 
            intelligent systems that solve real problems at scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" style={{ perspective: 1200 }}>
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              style={{
                rotate: cardTransforms[i].rotate,
                x: cardTransforms[i].x,
                y: cardTransforms[i].y,
              }}
              initial={{ opacity: 0, y: 100, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15, type: "spring", stiffness: 70 }}
              whileHover={{ y: -16, scale: 1.02, transition: { duration: 0.3 } }}
              className={`relative rounded-3xl overflow-hidden cursor-default group
                ${card.featured 
                  ? 'bg-gradient-to-br from-primary/[0.12] via-primary/[0.04] to-transparent border-2 border-primary/30 hover:border-primary' 
                  : 'bg-white/[0.03] border border-white/[0.06] hover:border-primary/40'
                } transition-colors duration-300`}
            >
              {/* Large stat number as background */}
              <div className="absolute top-4 right-4 pointer-events-none select-none">
                <span className={`text-6xl md:text-7xl font-black leading-none ${card.featured ? 'text-primary/[0.08]' : 'text-white/[0.04]'}`}>
                  <AnimatedCounter value={card.stat} suffix={card.statSuffix} decimals={card.decimals} />
                </span>
              </div>

              {/* Diagonal accent stripe */}
              <div className={`absolute -top-10 -right-10 w-40 h-40 rotate-45 ${card.featured ? 'bg-primary/[0.06]' : 'bg-white/[0.02]'} pointer-events-none`} />

              <div className="p-8 relative z-10">
                <motion.div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${card.featured ? 'bg-primary/20' : 'bg-white/[0.06]'}`}
                  whileHover={{ rotate: 360, scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                >
                  <card.icon size={28} className={card.featured ? "text-primary" : "text-white/70"} />
                </motion.div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{card.title}</h3>
                <p className="text-white/50 text-sm mb-6">{card.description}</p>

                {/* Stat label */}
                <div className="mb-6">
                  <span className={`text-3xl font-black ${card.featured ? 'text-primary' : 'text-white'}`}>
                    <AnimatedCounter value={card.stat} suffix={card.statSuffix} decimals={card.decimals} />
                  </span>
                  <span className="text-white/40 text-xs font-mono uppercase tracking-wider ml-2">{card.statLabel}</span>
                </div>

                {/* Highlight tags */}
                <div className="flex flex-wrap gap-2">
                  {card.highlights.map((h) => (
                    <span
                      key={h}
                      className={`text-[11px] font-mono px-3 py-1 rounded-full 
                        ${card.featured 
                          ? 'bg-primary/10 text-primary/80 border border-primary/20' 
                          : 'bg-white/[0.04] text-white/50 border border-white/[0.06]'
                        } group-hover:border-primary/30 transition-colors`}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
