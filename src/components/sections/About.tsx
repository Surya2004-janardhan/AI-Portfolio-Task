"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10 bg-black/40 border-y border-white/5">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          {/* Text Content */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">About <span className="text-blue-400">Me</span></h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I am a passionate software engineer dedicated to crafting highly scalable, performant, and beautifully designed web applications. With a strong foundation in modern JavaScript frameworks, I build full-stack solutions that bridge the gap between design and intricate backend logic.
              </p>
              <p>
                My approach focuses on writing clean, maintainable code, leveraging AI to accelerate development, and always keeping the user experience at the forefront. Currently, I am exploring advanced React architectures and deepening my expertise in systems engineering.
              </p>
              <p>
                When I&apos;m not coding, you can find me analyzing open-source projects or exploring the latest trends in UI/UX design.
              </p>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl rotate-3 opacity-50 blur-lg" />
              <div className="absolute inset-0 bg-background border border-white/10 rounded-2xl -rotate-3 overflow-hidden flex items-center justify-center">
                 {/* This would be an optimized Next.js Image component once an asset is provided */}
                 <div className="text-muted-foreground italic flex flex-col items-center">
                    <span className="text-6xl mb-2">👋</span>
                    <span className="text-sm">Profile Image Placeholder</span>
                 </div>
              </div>
            </div>
          </motion.div>
        
        </div>
      </div>
    </section>
  );
}
