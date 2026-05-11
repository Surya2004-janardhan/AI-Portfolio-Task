"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { skillCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Skills — Interactive filtered grid + decorative marquee.
 * Parallax: horizontal watermark drifts right→left (Requirement ✓).
 * On-scroll: staggered group reveals, skill pill animations (Requirement ✓).
 */

const allSkills = skillCategories.flatMap((c) => c.skills);

function SkillMarquee({ direction = 1 }: { direction?: number }) {
  const items = [...allSkills, ...allSkills];
  const dur = direction > 0 ? "38s" : "44s";
  return (
    <div className="overflow-hidden py-3">
      <div
        className={cn(
          "flex gap-4 whitespace-nowrap",
          direction > 0 ? "animate-marquee" : "animate-marquee-reverse"
        )}
        style={{ "--marquee-duration": dur } as React.CSSProperties}
      >
        {items.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="px-4 py-2 rounded-full text-xs font-medium shrink-0 border font-mono"
            style={{
              background: "hsl(var(--surface-1) / 0.5)",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground) / 0.3)",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Horizontal parallax watermark (Requirement ✓)
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-28 md:py-44 relative z-10 overflow-hidden surface-1"
      aria-label="Technical skills"
    >
      {/* ── Horizontal parallax watermark ── */}
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none"
        style={{ x: bgX }}
        aria-hidden="true"
      >
        <span
          className="text-[18vw] font-black tracking-tighter whitespace-nowrap heading-display"
          style={{ color: "hsl(var(--foreground) / 0.012)" }}
        >
          SKILLS &amp; TOOLS
        </span>
      </motion.div>

      <div className="container px-6 mx-auto relative z-10">
        {/* ── Header ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
        >
          <motion.span
            className="section-label mb-4 block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            Tech Stack
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tight heading-display"
            style={{ color: "hsl(var(--foreground))" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
          >
            Technical{" "}
            <span className="text-glow-amber" style={{ color: "hsl(var(--primary))" }}>Arsenal</span>
          </motion.h2>
        </motion.div>

        {/* ── Category filter tabs ── */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          role="group"
          aria-label="Filter skills by category"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "text-xs font-mono px-4 py-2 rounded-full border transition-all duration-300"
            )}
            style={
              activeCategory === null
                ? {
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    borderColor: "hsl(var(--primary))",
                  }
                : {
                    background: "hsl(var(--surface-1) / 0.5)",
                    color: "hsl(var(--muted-foreground))",
                    borderColor: "hsl(var(--border))",
                  }
            }
            aria-pressed={activeCategory === null}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={cn(
                "text-xs font-mono px-4 py-2 rounded-full border transition-all duration-300"
              )}
              style={
                activeCategory === cat.category
                  ? {
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      borderColor: "hsl(var(--primary))",
                    }
                  : {
                      background: "hsl(var(--surface-1) / 0.5)",
                      color: "hsl(var(--muted-foreground))",
                      borderColor: "hsl(var(--border))",
                    }
              }
              aria-pressed={activeCategory === cat.category}
            >
              {cat.category}
            </button>
          ))}
        </motion.div>

        {/* ── Skills grid — staggered on-scroll reveal (Requirement ✓) ── */}
        <div className="max-w-5xl" role="list" aria-label="Skills list">
          {skillCategories.map((group, idx) => {
            const isActive =
              activeCategory === null || activeCategory === group.category;

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.55, ease, delay: idx * 0.07 }}
                animate={{
                  opacity: isActive ? 1 : 0.12,
                  scale: isActive ? 1 : 0.98,
                  filter: isActive ? "blur(0px)" : "blur(1.5px)",
                }}
                className="mb-8 transition-all duration-400"
                role="listitem"
              >
                {/* Category label + divider */}
                <div className="flex items-center gap-3 mb-4">
                  <h3
                    className="text-sm font-bold font-mono uppercase tracking-wider"
                    style={{ color: "hsl(var(--foreground) / 0.55)" }}
                  >
                    {group.category}
                  </h3>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, hsl(var(--border)), transparent)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      className={cn(
                        "relative overflow-hidden text-sm font-medium px-5 py-3 rounded-xl border transition-all duration-300 cursor-default select-none",
                        isActive ? "glaze-card glow-border-anim shadow-sm" : ""
                      )}
                      style={
                        isActive
                          ? {
                              background: "hsl(var(--surface-2) / 0.8)",
                              borderColor: "hsl(var(--border-bright))",
                              color: "hsl(var(--foreground) / 0.9)",
                            }
                          : {
                              background: "hsl(var(--surface-1) / 0.3)",
                              borderColor: "hsl(var(--border) / 0.4)",
                              color: "hsl(var(--foreground) / 0.2)",
                            }
                      }
                      whileHover={
                        isActive
                          ? {
                              y: -4,
                              scale: 1.05,
                              color: "hsl(var(--primary))",
                              borderColor: "hsl(var(--primary) / 0.5)",
                              boxShadow: "0 10px 20px hsl(var(--primary)/0.15)",
                            }
                          : {}
                      }
                      initial={{ opacity: 0, scale: 0.8, y: 15 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: si * 0.03 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Decorative marquee strip ── */}
        <div className="mt-16 -mx-6 opacity-35" aria-hidden="true">
          <SkillMarquee direction={1} />
          <SkillMarquee direction={-1} />
        </div>
      </div>
    </section>
  );
}
