"use client";

import { motion } from "framer-motion";
import { Mail, Code, Briefcase, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative z-10 bg-black/40 border-t border-white/5">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Get In <span className="text-primary">Touch</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <motion.div 
            className="flex flex-col gap-6 justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="mailto:chintalajanardhan2004@gmail.com" className="flex items-center gap-4 p-6 glass rounded-xl hover:bg-white/10 transition-colors group border hover:border-primary/50">
              <div className="p-4 bg-primary/20 rounded-full text-primary group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email Me</h3>
                <p className="text-muted-foreground w-full truncate">chintalajanardhan2004@gmail.com</p>
              </div>
            </a>
            
            <a href="https://github.com/Surya2004-janardhan" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-6 glass rounded-xl hover:bg-white/10 transition-colors group">
              <div className="p-4 bg-white/10 rounded-full text-white group-hover:scale-110 transition-transform">
                <Code size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">GitHub</h3>
                <p className="text-muted-foreground">Check out my open source code.</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/surya-janardhan/" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-6 glass rounded-xl hover:bg-white/10 transition-colors group border hover:border-primary/50">
              <div className="p-4 bg-blue-500/20 rounded-full text-blue-400 group-hover:scale-110 transition-transform">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">LinkedIn</h3>
                <p className="text-muted-foreground">Let&apos;s connect professionally.</p>
              </div>
            </a>
          </motion.div>

          <motion.div 
            className="glass rounded-3xl p-10 flex flex-col justify-between h-full relative overflow-hidden group border-primary/20 hover:border-primary/50 transition-colors"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
            
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white">Status Board</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Availability</p>
                  <p className="text-lg font-medium text-white flex items-center gap-2">
                    Actively seeking new opportunities
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Current Focus</p>
                  <p className="text-lg font-medium text-white">
                    Agentic Workflows, Next.js Architectures
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Location</p>
                  <p className="text-lg font-medium text-white">
                    Andhra Pradesh, India (Open to Remote)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-muted-foreground italic">
                &quot;I build things end-to-end from schema design to deployment. Let&apos;s build something incredible together.&quot;
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
