"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useRef, type MouseEvent } from "react";
import { AuroraBeam } from "@/components/ui/aurora-beam";
import { personalInfo } from "@/lib/data";

/**
 * Contact — Split layout: heading (left 6-col) + links (right 5-col).
 * Cursor spotlight: amber radial follows mouse via spring (interactive animation ✓).
 * Links: staggered x-slide on scroll (on-scroll Requirement ✓).
 * All link targets: keyboard + screenreader accessible.
 */

const contactLinks = [
  {
    icon: Mail,
    title: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    label: "Send Message",
    aria: `Send email to ${personalInfo.email}`,
  },
  {
    icon: FaGithub,
    title: "GitHub",
    value: personalInfo.githubUsername,
    href: personalInfo.github,
    label: "View Repos",
    aria: `View GitHub profile for ${personalInfo.githubUsername}`,
  },
  {
    icon: FaLinkedin,
    title: "LinkedIn",
    value: "surya-janardhan",
    href: personalInfo.linkedin,
    label: "Connect",
    aria: "Connect on LinkedIn",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor-tracking amber spotlight
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-40 relative z-10 overflow-hidden"
      onMouseMove={handleMouseMove}
      aria-label="Contact me"
    >
      <AuroraBeam className="opacity-40" />

      {/* ── Amber cursor spotlight ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none hidden md:block z-0"
        style={{
          width: "600px",
          height: "600px",
          left: springX.get() + "%",
          top: springY.get() + "%",
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.06), transparent 60%)",
          // Use percentage-based left/top via motion values
        }}
        aria-hidden="true"
      >
        {/* Motion-aware spotlight — re-using spring directly */}
      </motion.div>

      {/* Proper spring-driven spotlight */}
      <motion.div
        className="absolute rounded-full pointer-events-none hidden md:block z-0"
        style={{
          width: "600px",
          height: "600px",
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.055), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="layout-grid relative z-10">
        {/* ── Left — CTA heading ── */}
        <div className="grid-col-half flex flex-col justify-center mb-16 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease }}
          >
            <span className="section-label mb-6 block">Get in Touch</span>
            <h2
              className="text-fluid-h2 font-black tracking-tighter leading-[0.85] heading-display mb-8"
            >
              LET&apos;S BUILD
              <br />
              <span style={{ color: "hsl(var(--primary))" }}>SOMETHING</span>
              <br />
              LEGENDARY.
            </h2>
            <p
              className="text-base md:text-lg max-w-md leading-relaxed"
              style={{ color: "hsl(var(--foreground) / 0.45)" }}
            >
              Currently seeking a challenging role where I can push the
              boundaries of AI and Full-Stack development.
            </p>
          </motion.div>
        </div>

        {/* ── Right — Contact link cards ── */}
        <div
          className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8 flex flex-col justify-center space-y-4 md:space-y-5"
        >
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.title}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="group relative flex items-center justify-between p-6 md:p-8 rounded-2xl md:rounded-3xl border transition-all duration-500 overflow-hidden"
              style={{
                background: "hsl(var(--surface-1) / 0.5)",
                borderColor: "hsl(var(--border))",
              }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease, delay: i * 0.12 }}
              whileHover={{
                x: -6,
                borderColor: "hsl(var(--primary) / 0.35)",
                background: "hsl(var(--surface-2) / 0.5)",
              }}
              aria-label={link.aria}
            >
              {/* Top shine reflection */}
              <div
                className="absolute top-0 left-0 right-0 h-px transition-all duration-700"
                style={{
                  background:
                    "linear-gradient(to right, transparent, hsl(var(--foreground) / 0.06), transparent)",
                }}
                aria-hidden="true"
              />

              <div className="flex items-center gap-5">
                <div
                  className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-500 group-hover:border-primary/30 group-hover:bg-primary/5"
                  style={{
                    background: "hsl(var(--surface-2) / 0.6)",
                    borderColor: "hsl(var(--border-bright))",
                  }}
                >
                  <link.icon
                    size={22}
                    className="transition-colors duration-500"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3
                    className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase mb-1"
                    style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}
                  >
                    {link.title}
                  </h3>
                  <p
                    className="text-base md:text-lg font-bold transition-colors duration-500 group-hover:text-primary"
                    style={{ color: "hsl(var(--foreground) / 0.85)" }}
                  >
                    {link.label}
                  </p>
                </div>
              </div>

              <ExternalLink
                size={16}
                className="transition-all duration-300 group-hover:text-primary/60 shrink-0"
                style={{ color: "hsl(var(--foreground) / 0.2)" }}
                aria-hidden="true"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
