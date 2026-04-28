"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "React", level: 95 },
  { name: "Next.js", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 75 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Technical <span className="text-purple-400">Skills</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A comprehensive overview of my technical expertise and the tools I use to bring ideas to life.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {skills.map((skill, index) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-lg">{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1, delay: 0.1 * index, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
