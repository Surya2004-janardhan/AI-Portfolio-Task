"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";

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
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Get In <span className="text-emerald-400">Touch</span></h2>
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
            <a href="mailto:hello@example.com" className="flex items-center gap-4 p-6 glass rounded-xl hover:bg-white/10 transition-colors group">
              <div className="p-4 bg-emerald-500/20 rounded-full text-emerald-400 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email Me</h3>
                <p className="text-muted-foreground">Drop a line anytime.</p>
              </div>
            </a>
            
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-6 glass rounded-xl hover:bg-white/10 transition-colors group">
              <div className="p-4 bg-white/10 rounded-full text-white group-hover:scale-110 transition-transform">
                <Github size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">GitHub</h3>
                <p className="text-muted-foreground">Check out my open source code.</p>
              </div>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-6 glass rounded-xl hover:bg-white/10 transition-colors group">
              <div className="p-4 bg-blue-500/20 rounded-full text-blue-400 group-hover:scale-110 transition-transform">
                <Linkedin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">LinkedIn</h3>
                <p className="text-muted-foreground">Let&apos;s connect professionally.</p>
              </div>
            </a>
          </motion.div>

          <motion.form 
            className="glass rounded-2xl p-8 flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
              <input type="text" id="name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
              <input type="email" id="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white" placeholder="john@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
              <textarea id="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-white resize-none" placeholder="Your message here..." />
            </div>
            <button type="submit" className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 transition-colors mt-2">
              Send Message
              <Send size={18} />
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
