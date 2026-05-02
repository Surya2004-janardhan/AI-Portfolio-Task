"use client";

import { motion } from "framer-motion";
import { Terminal, BrainCircuit, Globe, Layout, Database, Wrench } from "lucide-react";
import { FaJava, FaRobot, FaBrain, FaNodeJs, FaReact, FaGitAlt, FaDocker } from "react-icons/fa";
import { SiPython, SiJavascript, SiTypescript, SiExpress, SiFlask, SiNextdotjs, SiTailwindcss, SiRedux, SiMongodb, SiPostgresql, SiRedis, SiRabbitmq, SiApachekafka, SiPostman, SiGithubactions } from "react-icons/si";

const skillCategories = [
  {
    category: "Languages",
    icon: <Terminal size={24} className="text-primary" />,
    skills: [
      { name: "Python", icon: <SiPython /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Java", icon: <FaJava /> },
      { name: "C", icon: null },
      { name: "R", icon: null }
    ]
  },
  {
    category: "AI / ML",
    icon: <BrainCircuit size={24} className="text-primary" />,
    skills: [
      { name: "LangChain", icon: <FaRobot /> },
      { name: "LLMs", icon: <FaBrain /> },
      { name: "LangGraph", icon: <FaRobot /> },
      { name: "AI Agents", icon: <FaRobot /> },
      { name: "RAG", icon: <FaBrain /> },
      { name: "Deep Learning", icon: <FaBrain /> },
      { name: "Machine Learning", icon: <FaRobot /> }
    ]
  },
  {
    category: "Web Frameworks",
    icon: <Globe size={24} className="text-primary" />,
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "RESTful APIs", icon: <Globe size={16} /> },
      { name: "Flask", icon: <SiFlask /> }
    ]
  },
  {
    category: "Frontend",
    icon: <Layout size={24} className="text-primary" />,
    skills: [
      { name: "React.js", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "React Native", icon: <FaReact /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Redux", icon: <SiRedux /> }
    ]
  },
  {
    category: "Databases & Messaging",
    icon: <Database size={24} className="text-primary" />,
    skills: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "SQL", icon: <Database size={16} /> },
      { name: "Redis", icon: <SiRedis /> },
      { name: "RabbitMQ", icon: <SiRabbitmq /> },
      { name: "Kafka", icon: <SiApachekafka /> }
    ]
  },
  {
    category: "Developer Tools",
    icon: <Wrench size={24} className="text-primary" />,
    skills: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "Docker", icon: <FaDocker /> },
      { name: "VS Code", icon: <Wrench size={16} /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "GitHub Actions", icon: <SiGithubactions /> }
    ]
  }
];

// Stagger container + child variants for orchestrated reveal
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const skillTagVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3 },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10 bg-[#040404]">
      <div className="container px-6 mx-auto">
        {/* Typewriter-style heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-black tracking-tight mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            Technical <span className="text-primary">Skills</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A comprehensive overview of my technical expertise and the tools I use to bring ideas to life.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((group) => (
            <motion.div
              key={group.category}
              variants={cardVariants}
              className="glass p-8 rounded-3xl flex flex-col gap-6 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2 bg-gradient-to-b from-white/5 to-transparent"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-4 mb-2">
                <motion.div
                  className="p-3 bg-primary/10 rounded-xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {group.icon}
                </motion.div>
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    custom={i}
                    variants={skillTagVariants}
                    className="flex items-center gap-2 bg-black/40 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-primary/20 hover:border-primary/50 hover:text-primary transition-all cursor-default shadow-[0_0_15px_-5px_transparent] hover:shadow-primary/30"
                    whileHover={{ scale: 1.1, y: -3 }}
                  >
                    {skill.icon}
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
