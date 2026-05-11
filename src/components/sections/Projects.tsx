"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Projects — Full-bleed infinite auto-scroll carousel.
 * CSS marquee: translateX only, pauses on hover.
 * Header: whileInView stagger (on-scroll Requirement ✓).
 * Card hover: amber glow shadow (matching screen palette).
 */

// Per-card accent pairs: [gradientClass, glowColor]
const cardAccents = [
  { gradient: "from-amber-500/25 to-orange-600/10",   glow: "hsl(43 95% 52% / 0.2)"  },
  { gradient: "from-cyan-400/25 to-sky-500/10",        glow: "hsl(195 100% 50% / 0.18)" },
  { gradient: "from-emerald-400/20 to-teal-600/10",    glow: "hsl(160 70% 45% / 0.18)" },
  { gradient: "from-violet-500/20 to-purple-600/10",   glow: "hsl(265 70% 60% / 0.18)" },
  { gradient: "from-rose-400/20 to-pink-600/10",       glow: "hsl(340 75% 60% / 0.18)" },
  { gradient: "from-sky-400/20 to-indigo-600/10",      glow: "hsl(215 80% 60% / 0.18)" },
  { gradient: "from-amber-400/20 to-yellow-600/10",    glow: "hsl(45 95% 55% / 0.2)"  },
];

function CarouselCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const accent = cardAccents[index % cardAccents.length];

  return (
    <div
      className={cn(
        "rainbow-border group relative shrink-0 rounded-[2rem] overflow-hidden transition-all duration-700",
        "w-[85vw] md:w-[540px] lg:w-[720px]"
      )}
      style={{
        background: "hsl(var(--surface-1))",
        boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${accent.glow}, 0 4px 32px rgba(0,0,0,0.5)`;
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 32px rgba(0,0,0,0.5)";
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
      }}
    >
      {/* Accent top bar */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity duration-700",
          accent.gradient
        )}
        aria-hidden="true"
      />

      {/* Card body */}
      <div className="flex flex-col min-h-[420px]">
        {/* Visual area — gradient abstraction */}
        <div
          className="h-[180px] relative overflow-hidden shrink-0 border-b"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-25 group-hover:opacity-50 transition-opacity duration-1000 mix-blend-screen",
              accent.gradient
            )}
            aria-hidden="true"
          />
          {/* Project GIF placeholder */}
          <div className="absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity duration-700">
            <img
              src={`/your-gif-file-name.gif`}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <span
              className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border backdrop-blur-sm"
              style={{
                background: "hsl(var(--background) / 0.6)",
                color: "hsl(var(--foreground) / 0.4)",
                borderColor: "hsl(var(--border-bright))",
              }}
            >
              Project_{String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <span
              className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] block mb-3"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {project.subtitle}
            </span>
            <h3
              className="text-2xl md:text-3xl font-black heading-display mb-4"
              style={{ color: "hsl(var(--foreground))" }}
            >
              {project.title}
            </h3>
            <p
              className="text-sm md:text-base leading-relaxed mb-6"
              style={{ color: "hsl(var(--foreground) / 0.5)" }}
            >
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-3 py-1.5 rounded-full border uppercase tracking-wider transition-colors duration-300"
                  style={{
                    background: "hsl(var(--surface-2) / 0.5)",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground) / 0.5)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* GitHub link */}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 group/link"
              style={{ color: "hsl(var(--foreground) / 0.6)" }}
              aria-label={`View ${project.title} source on GitHub`}
            >
              <div
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover/link:border-amber-400/50"
                style={{ borderColor: "hsl(var(--border-bright))" }}
              >
                <FaGithub size={16} aria-hidden="true" />
              </div>
              <span className="group-hover/link:text-primary transition-colors duration-300">
                View Source
              </span>
              <ArrowUpRight
                size={14}
                className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const loopItems = [...projects, ...projects];
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="projects"
      className="py-24 relative z-10 overflow-hidden"
      aria-label="Featured projects"
    >
      {/* ── Section header (on-scroll reveal ✓) ── */}
      <div className="layout-grid relative z-20 mb-12 md:mb-20">
        <motion.div
          className="grid-col-half"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
        >
          <span className="section-label mb-4 block">Selected Work</span>
          <h2 className="text-fluid-h2 font-black heading-display mb-6">
            Featured <br />
            <span style={{ color: "hsl(var(--primary))" }}>Projects</span>
          </h2>
        </motion.div>
      </div>

      {/* ── Infinite carousel ── */}
      <div
        className="relative w-full overflow-hidden py-16"
        aria-label="Projects carousel — scrolls automatically, hover to pause"
      >
        {/* Edge fade masks */}
        <div
          className="absolute inset-y-0 left-0 w-16 md:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-16 md:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
          aria-hidden="true"
        />

        <div
          className="flex gap-8 px-8 w-max animate-continuous-scroll"
          style={{ willChange: "transform" }}
        >
          {loopItems.map((project, i) => (
            <CarouselCard
              key={`${project.id}-${i}`}
              project={project}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
