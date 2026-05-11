"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, User, Cpu, Briefcase, Mail, Bot } from "lucide-react";

const navLinks = [
  { title: "Home",     href: "#home",        icon: <Home className="h-full w-full" /> },
  { title: "About",    href: "#about",       icon: <User className="h-full w-full" /> },
  { title: "Skills",   href: "#skills",      icon: <Cpu className="h-full w-full" /> },
  { title: "Projects", href: "#projects",    icon: <Briefcase className="h-full w-full" /> },
  { title: "Contact",  href: "#contact",     icon: <Mail className="h-full w-full" /> },
  { title: "AI Chat",  href: "#ai-terminal", icon: <Bot className="h-full w-full" /> },
];

export default function Navbar() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-center">
        <FloatingDock 
          items={navLinks} 
          desktopClassName="bg-[hsl(222_35%_7%/0.65)] backdrop-blur-2xl border-white/10 shadow-2xl glaze-card"
          mobileClassName="bg-[hsl(222_35%_7%/0.85)] border-white/10"
        />
      </div>
    </div>
  );
}
