"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";

const socialLinks = [
  { icon: FaGithub, href: personalInfo.github, label: "GitHub profile" },
  { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn profile" },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Send email" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-12 md:py-20 relative overflow-hidden border-t"
      style={{ borderColor: "hsl(var(--border))" }}
    >
      <div className="container px-6 mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* ── Top row ── */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            {/* Brand mark */}
            <motion.div
              className="text-2xl font-black tracking-tighter heading-display"
              style={{ color: "hsl(var(--foreground))" }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              SJ<span style={{ color: "hsl(var(--primary))" }}>.</span>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "hsl(var(--surface-1) / 0.5)",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--muted-foreground))",
                  }}
                  whileHover={{
                    y: -3,
                    scale: 1.08,
                    color: "hsl(var(--primary))",
                    borderColor: "hsl(var(--primary) / 0.3)",
                  }}
                  whileTap={{ scale: 0.94 }}
                  aria-label={link.label}
                >
                  <link.icon size={17} aria-hidden="true" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── Divider ── */}
          <div
            className="h-px mb-8"
            style={{
              background:
                "linear-gradient(to right, transparent, hsl(var(--border)), transparent)",
            }}
            aria-hidden="true"
          />

          {/* ── Bottom row ── */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              className="text-[10px] font-mono uppercase tracking-[0.3em]"
              style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}
            >
              Built for the love of Game
            </p>
            <p
              className="text-[10px] font-mono tracking-widest"
              style={{ color: "hsl(var(--muted-foreground) / 0.35)" }}
            >
              &copy; {currentYear} {personalInfo.fullName.toUpperCase()} — ALL
              RIGHTS RESERVED
            </p>
          </motion.div>

          {/* Spacing for floating dock */}
          <div className="h-20 md:h-24" aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
