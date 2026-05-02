"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Code, Briefcase } from "lucide-react";
import { useRef } from "react";

const links = [
  {
    icon: Mail,
    title: "Email",
    value: "chintalajanardhan2004@gmail.com",
    href: "mailto:chintalajanardhan2004@gmail.com",
    color: "primary",
  },
  {
    icon: Code,
    title: "GitHub",
    value: "Surya2004-janardhan",
    href: "https://github.com/Surya2004-janardhan",
    color: "white",
  },
  {
    icon: Briefcase,
    title: "LinkedIn",
    value: "surya-janardhan",
    href: "https://www.linkedin.com/in/surya-janardhan/",
    color: "blue",
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={sectionRef} id="contact" className="py-32 relative z-10 bg-black overflow-hidden">
      {/* Rotating accent shape */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ rotate: bgRotate }}
      >
        <div className="w-full h-full rounded-full border border-primary/[0.05]" />
        <div className="absolute inset-8 rounded-full border border-primary/[0.03]" />
        <div className="absolute inset-16 rounded-full border border-white/[0.02]" />
      </motion.div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.span
              className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-6 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* {`// let's connect`} */}
            </motion.span>
            <motion.h2
              className="text-5xl md:text-7xl font-black tracking-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              Get In <span className="text-primary">Touch</span>
            </motion.h2>
            <motion.p
              className="text-white/50 text-lg max-w-lg mx-auto font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Currently looking for new opportunities. My inbox is always open.
            </motion.p>
          </motion.div>

          {/* Contact links as horizontal cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {links.map((link, i) => (
              <motion.a
                key={link.title}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-primary/40 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 40, rotateZ: i === 0 ? -3 : i === 2 ? 3 : 0 }}
                whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15, type: "spring" }}
                whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    link.color === "primary" ? "bg-primary/10 text-primary" :
                    link.color === "blue" ? "bg-blue-500/10 text-blue-400" :
                    "bg-white/[0.06] text-white/60"
                  }`}
                  whileHover={{ rotate: 12, scale: 1.1 }}
                >
                  <link.icon size={24} />
                </motion.div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{link.title}</h3>
                <p className="text-white/50 text-sm font-mono truncate">{link.value}</p>
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
