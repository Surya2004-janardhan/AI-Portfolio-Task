"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useRef } from "react";
import { AuroraBeam } from "@/components/ui/aurora-beam";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SplitText } from "@/components/ui/split-text";
import { personalInfo } from "@/lib/data";

/**
 * Hero — Entry section.
 * Parallax: entire content block drifts up + fades as user scrolls (Requirement ✓).
 * On-mount: 7-element staggered cascade (badge → name → role → tagline → CTAs → scroll cue).
 * Alignment: Left-aligned on 12-col grid. Right dead-space creates editorial tension.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Scroll-linked parallax — only transform/opacity (requirement compliant)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const opacity = useTransform(smoothScroll, [0, 0.65, 1], [1, 1, 0]);
  const scale = useTransform(smoothScroll, [0, 1], [1, 0.93]);
  const contentY = useTransform(smoothScroll, [0, 1], ["0%", "30%"]);

  // Cubic bezier: smooth deceleration (used across all mounts)
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[120vh] md:min-h-[140vh] w-full flex items-start overflow-hidden"
      aria-label="Hero introduction"
    >
      {/* Ambient aurora — amber + cyan */}
      <AuroraBeam />

      {/* Subtle topology dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" aria-hidden="true" />

      {/* Main content — parallax wrapper */}
      <motion.div
        className="layout-grid pt-[20vh] md:pt-[28vh] relative z-10 w-full"
        style={{ opacity, scale, y: contentY }}
      >
        <div className="grid-col-full">
          {/* ── Availability badge ── */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 py-2 px-4 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] mb-8 md:mb-12"
          > */}
          {/* <span className="relative flex h-2 w-2" aria-hidden="true"> */}
          {/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /> */}
          {/* <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" /> */}
          {/* </span> */}
          {/* <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.22em] text-white/50"> */}
          {/* Available for new challenges */}
          {/* </span> */}
          {/* </motion.div> */}

          {/* ── H1 name — SplitText per-char reveal ── */}
          <div className="mb-8 md:mb-10 w-full">
            <h1 className="heading-display text-fluid-hero text-white leading-[0.85]">
              <SplitText text="SURYA" delay={0.2} />
            </h1>
            <h1 className="heading-display text-fluid-hero leading-[0.85] text-glow-amber" style={{ color: "hsl(var(--primary) / 0.9)" }}>
              <SplitText text="JANARDHAN" delay={0.4} />
            </h1>
          </div>

          {/* ── Role + tagline ── */}
          <div className="max-w-2xl mb-12 md:mb-16">
            <motion.p
              className="section-label mb-5 md:mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.4, ease, delay: 0.8 }}
            >
              {personalInfo.role}
            </motion.p>
            <motion.p
              className="text-base md:text-xl leading-relaxed font-medium"
              style={{ color: "hsl(var(--foreground) / 0.45)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease, delay: 1.0 }}
            >
              {personalInfo.tagline}{" "}
              <span style={{ color: "hsl(var(--foreground) / 0.75)" }}>
                Bridging the gap between raw research and production-grade applications.
              </span>
            </motion.p>
          </div>

          {/* ── CTA buttons ── */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 1.2 }}
          >
            {/* Primary — amber fill */}
            <MagneticButton
              as="a"
              href="#projects"
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold tracking-tight text-sm transition-all duration-300 w-full sm:w-auto glow-sm hover:glow-md"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
              aria-label="Explore my work"
            >
              <span className="flex items-center gap-2">
                EXPLORE WORK
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                />
              </span>
            </MagneticButton>

            {/* Secondary — ghost glass */}
            <MagneticButton
              as="a"
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 w-full sm:w-auto border"
              style={{
                background: "hsl(var(--surface-1) / 0.5)",
                borderColor: "hsl(var(--border-bright))",
                color: "hsl(var(--foreground) / 0.65)",
              }}
              aria-label="Download my CV"
            >
              <span className="flex items-center gap-2">
                <Download size={16} aria-hidden="true" />
                GET CV
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-16 md:bottom-24 left-6 md:left-12 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 2.2, duration: 2 }}
        aria-hidden="true"
      >
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center p-1.5 shrink-0 border"
          style={{
            borderColor: "hsl(var(--foreground) / 0.2)",
            animation: "pulseOpacity 2s ease-in-out infinite",
          }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{
              background: "hsl(var(--foreground) / 0.5)",
              animation: "dotBounce 1.5s ease-in-out infinite",
            }}
          />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] hidden md:block"
          style={{ color: "hsl(var(--foreground) / 0.3)" }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
