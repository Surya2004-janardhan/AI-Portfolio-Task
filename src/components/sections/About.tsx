"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { GraduationCap, Briefcase, Code2 } from "lucide-react";
import { useRef } from "react";

// 3D tilt card wrapper
function TiltCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, x: -60, rotateZ: -3 }}
      whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, type: "spring", stiffness: 80 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const cards = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "B.Tech in Artificial Intelligence & Machine Learning at Aditya College of Engineering.",
    badge: "CGPA: 8.5/10.0",
    accentClass: "from-white/5 to-transparent",
    iconBg: "bg-primary/10",
    borderClass: "hover:border-primary/50",
    delay: 0.1,
  },
  {
    icon: Briefcase,
    title: "Experience",
    description: <>AI Intern at <span className="text-white">GrowStack.ai</span>. Deployed 20+ production-ready AI agents and RAG pipelines.</>,
    badge: "70% Manual Effort Slashed",
    accentClass: "from-primary/10 to-transparent",
    iconBg: "bg-primary/20",
    borderClass: "border-primary/30 hover:border-primary",
    featured: true,
    delay: 0.25,
  },
  {
    icon: Code2,
    title: "Algorithmic Excellence",
    description: "A deep love for coding challenges. Demonstrated strong analytical abilities in algorithms.",
    badge: "800+ Problems Solved",
    accentClass: "from-white/5 to-transparent",
    iconBg: "bg-primary/10",
    borderClass: "hover:border-primary/50",
    delay: 0.4,
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 relative z-10 bg-[#060606] border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-black/0 to-black/0 pointer-events-none" />
      <div className="container px-6 mx-auto relative z-10">
        {/* Section heading with horizontal line slide animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="h-[1px] bg-gradient-to-r from-transparent to-primary/50 inline-block"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">About <span className="text-primary">Me</span></h2>
            <motion.span
              className="h-[1px] bg-gradient-to-l from-transparent to-primary/50 inline-block"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Bridging the gap between intelligent AI systems and robust Full-Stack architecture.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" style={{ perspective: 1000 }}>
          {cards.map((card) => (
            <TiltCard
              key={card.title}
              delay={card.delay}
              className={`glass p-10 rounded-3xl flex flex-col items-center text-center transition-all duration-300 group hover:-translate-y-2 bg-gradient-to-b ${card.accentClass} ${card.borderClass} ${card.featured ? 'relative overflow-hidden' : ''}`}
            >
              {card.featured && (
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors pointer-events-none" />
              )}
              <motion.div
                className={`w-20 h-20 ${card.iconBg} rounded-2xl flex items-center justify-center mb-8 z-10 shadow-[0_0_30px_-5px_rgba(255,215,0,0.3)]`}
                whileHover={{ scale: 1.2, rotate: 12 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <card.icon size={40} className="text-primary" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 z-10">{card.title}</h3>
              <p className="text-muted-foreground mb-8 text-lg z-10">{card.description}</p>
              <motion.span
                className="font-bold text-black px-6 py-2 bg-primary rounded-full text-sm z-10 shadow-[0_0_20px_rgba(255,215,0,0.4)] mt-auto"
                whileHover={{ scale: 1.1, boxShadow: "0 0 35px rgba(255,215,0,0.6)" }}
              >
                {card.badge}
              </motion.span>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
