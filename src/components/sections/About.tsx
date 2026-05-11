"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Briefcase, GraduationCap, Code2, TrendingUp, Layers } from "lucide-react";
import { useRef, useEffect } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import { personalInfo, stats, experience, education } from "@/lib/data";

/** Spring counter that counts up on scroll into view */
function AnimatedCounter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv   = useMotionValue(0);
  const sv   = useSpring(mv, { stiffness: 40, damping: 20 });
  const inV  = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => { if (inV) mv.set(value); }, [inV, mv, value]);
  useEffect(() => sv.on("change", (v) => { if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix; }), [sv, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}

const ease = [0.16, 1, 0.3, 1] as const;

/** Animated stat icon that pulses */
const statIcons = [TrendingUp, Bot, GraduationCap, Layers];
function Bot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="2" /><path d="M12 8V4m-4 4V4m8 4V4M8 12h.01M16 12h.01M12 16h.01" />
    </svg>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const ghostY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const lineH  = useTransform(scrollYProgress, [0.1, 0.55], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-40 relative z-10 overflow-hidden noise" aria-label="About me">
      {/* Ghost watermark parallax */}
      <motion.div className="absolute top-16 left-0 right-0 pointer-events-none select-none overflow-hidden text-center"
        style={{ y: ghostY }} aria-hidden="true">
        <span className="text-[15vw] font-black tracking-tighter whitespace-nowrap heading-display"
          style={{ color: "hsl(var(--foreground) / 0.012)" }}>ABOUT</span>
      </motion.div>

      <div className="layout-grid relative z-10">
        {/* Header */}
        <motion.div className="grid-col-half mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
        >
          <span className="section-label mb-4 block">About Me</span>
          <h2 className="text-fluid-h2 heading-display mb-4">
            Bridging AI <span style={{ color: "hsl(var(--primary))" }}>&</span> Engineering
          </h2>
        </motion.div>

        {/* Bio — scroll-linked word reveal */}
        <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2 mb-20 md:mb-32">
          <TextReveal text={personalInfo.bio} />
        </div>

        {/* Stats strip — glaze cards with float animation */}
        <div className="grid-col-full grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-20 md:mb-32 max-w-5xl mx-auto w-full">
          {stats.map((stat, i) => {
            const Icon = statIcons[i % statIcons.length];
            return (
              <motion.div key={stat.label}
                className="glaze-card glow-border-anim relative p-6 md:p-8 rounded-2xl border cursor-default"
                style={{ background: "hsl(var(--surface-1) / 0.5)", borderColor: "hsl(var(--border))" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                whileHover={{ y: -6, borderColor: "hsl(var(--primary) / 0.35)" }}
              >
                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(var(--primary) / 0.08)", color: "hsl(var(--primary) / 0.4)" }}
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 0.95, 1] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon size={14} aria-hidden="true" />
                </motion.div>

                <div className="text-4xl md:text-5xl font-black heading-display mb-2 transition-colors duration-300"
                  style={{ color: "hsl(var(--foreground))" }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </div>
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.22em]"
                  style={{ color: "hsl(var(--muted-foreground))" }}>
                  {stat.label}
                </span>

                {/* Bottom amber accent bar — grows in */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: "hsl(var(--primary) / 0.3)", transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease, delay: 0.3 + i * 0.1 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bento grid */}
        <div className="grid-col-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">

          {/* Experience card — 3-col, with live progress line */}
          <motion.div
            className="glaze-card glow-border-anim md:col-span-2 lg:col-span-3 relative p-8 md:p-10 rounded-3xl border"
            style={{ background: "hsl(var(--surface-1) / 0.4)", borderColor: "hsl(var(--border))" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, ease }}
            whileHover={{ y: -4 }}
          >
            {/* Scroll-driven connector line */}
            <div className="absolute top-0 left-10 w-px h-full overflow-hidden hidden md:block" aria-hidden="true">
              <motion.div className="w-full" style={{
                height: lineH,
                background: "linear-gradient(to bottom, hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.2), transparent)",
              }} />
            </div>

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 md:pl-8">
              <motion.div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "hsl(var(--primary) / 0.1)", border: "1px solid hsl(var(--primary) / 0.2)" }}
                animate={{ boxShadow: ["0 0 0px hsl(var(--primary) / 0)", "0 0 16px hsl(var(--primary) / 0.3)", "0 0 0px hsl(var(--primary) / 0)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Briefcase size={22} style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              </motion.div>
              <div>
                <h3 className="text-lg md:text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>{experience.title}</h3>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{experience.company}</p>
              </div>
              <div className="sm:ml-auto">
                <span className="text-[10px] font-mono px-3 py-1.5 rounded-full border"
                  style={{ background: "hsl(var(--primary) / 0.08)", color: "hsl(var(--primary) / 0.9)", borderColor: "hsl(var(--primary) / 0.2)" }}>
                  {experience.period}
                </span>
              </div>
            </div>

            <ul className="space-y-4 md:pl-8">
              {experience.highlights.map((h, i) => (
                <motion.li key={i} className="text-sm md:text-base leading-relaxed flex gap-4"
                  style={{ color: "hsl(var(--foreground) / 0.55)" }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.12 }}
                >
                  <span className="mt-1 shrink-0" style={{ color: "hsl(var(--primary) / 0.6)" }} aria-hidden="true">▸</span>
                  {h}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Education card — 2-col */}
          <motion.div
            className="glaze-card glow-border-anim md:col-span-1 lg:col-span-2 h-full p-8 md:p-10 rounded-3xl border flex flex-col justify-between"
            style={{ background: "hsl(var(--surface-1) / 0.4)", borderColor: "hsl(var(--border))" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div>
              <div className="flex items-center gap-4 mb-8">
                <motion.div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "hsl(var(--cyan) / 0.08)", border: "1px solid hsl(var(--cyan) / 0.15)" }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <GraduationCap size={22} style={{ color: "hsl(var(--cyan))" }} aria-hidden="true" />
                </motion.div>
                <h3 className="text-lg md:text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>Education</h3>
              </div>
              <p className="text-base mb-2 font-medium" style={{ color: "hsl(var(--foreground) / 0.85)" }}>{education.degree}</p>
              <p className="text-sm mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>{education.institution}</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black heading-display text-glow-cyan" style={{ color: "hsl(var(--cyan))" }}>
                <AnimatedCounter value={8.5} suffix="" decimals={1} />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em]" style={{ color: "hsl(var(--muted-foreground))" }}>/ 10 CGPA</span>
            </div>
          </motion.div>

          {/* Problem Solving — 2-col */}
          <motion.div
            className="glaze-card glow-border-anim md:col-span-1 lg:col-span-2 h-full p-8 md:p-10 rounded-3xl border flex flex-col justify-between"
            style={{ background: "hsl(var(--surface-1) / 0.4)", borderColor: "hsl(var(--border))" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <div>
              <div className="flex items-center gap-4 mb-8">
                <motion.div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border-bright))" }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Code2 size={22} style={{ color: "hsl(var(--foreground) / 0.7)" }} aria-hidden="true" />
                </motion.div>
                <h3 className="text-lg md:text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>Problem Solving</h3>
              </div>
              <p className="text-sm mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>Algorithmic mastery across competitive platforms</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black heading-display" style={{ color: "hsl(var(--foreground))" }}>
                <AnimatedCounter value={800} suffix="+" decimals={0} />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em]" style={{ color: "hsl(var(--muted-foreground))" }}>Solved</span>
            </div>
          </motion.div>

          {/* Core tech cloud — 3-col, animated tags */}
          <motion.div
            className="glaze-card glow-border-anim md:col-span-2 lg:col-span-3 h-full p-8 md:p-10 rounded-3xl border"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--surface-1) / 0.3))", borderColor: "hsl(var(--primary) / 0.12)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex flex-wrap gap-2 md:gap-3">
              {["LangChain", "RAG Pipelines", "AI Agents", "Node.js", "React", "Docker", "Redis", "PostgreSQL"].map((tag, i) => (
                <motion.span key={tag}
                  className="text-[10px] md:text-[11px] font-mono px-3 md:px-4 py-2 rounded-full border uppercase tracking-wider"
                  style={{ background: "hsl(var(--primary) / 0.05)", color: "hsl(var(--primary) / 0.75)", borderColor: "hsl(var(--primary) / 0.12)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ scale: 1.08, background: "hsl(var(--primary) / 0.15)" }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <p className="text-xs md:text-sm mt-8 font-mono tracking-widest uppercase" style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>
              Core Technical Stack
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
