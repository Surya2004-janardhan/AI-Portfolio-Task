"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "AI Email Assistant",
    description: "An automated email responder powered by local LLMs via Ollama and n8n. Seamlessly classifies and drafts replies.",
    tech: ["Next.js", "TypeScript", "Ollama", "Tailwind"],
    github: "#",
    live: "#"
  },
  {
    title: "WebRTC Video Platform",
    description: "A production-ready mesh topology video chat application supporting multiple peers with real-time text chat.",
    tech: ["React", "WebRTC", "Socket.IO", "Node.js"],
    github: "#",
    live: "#"
  },
  {
    title: "Cataract Detection AI",
    description: "Electron desktop app connecting to Hugging Face and Groq to deliver context-aware medical intelligence.",
    tech: ["Electron", "Python", "Gradio", "React"],
    github: "#",
    live: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 w-fit">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">Some of the recent things I&apos;ve built, solving real user problems.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 group hover:skew-y-1 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full"
            >
              <div className="w-full h-48 bg-white/5 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center border border-white/5">
                {/* Placeholder Image Space */}
                <div className="w-16 h-16 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500 blur-xl" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-medium px-2 py-1 bg-white/5 border border-white/10 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <a href={project.github} className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </a>
                <a href={project.live} className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <ExternalLink size={20} />
                  <span className="sr-only">Live Demo</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
