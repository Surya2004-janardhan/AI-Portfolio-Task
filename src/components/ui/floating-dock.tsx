/**
 * Floating Dock Component
 * Inspired by macOS and Elementary OS
 */
"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-4 inset-x-0 flex flex-col gap-3"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  href={item.href}
                  key={item.title}
                  className="h-12 w-12 rounded-2xl bg-neutral-900/80 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-2xl"
                >
                  <div className="h-5 w-5 text-white/70">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-2xl bg-neutral-900/80 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-2xl transition-all active:scale-95"
      >
        <motion.div 
          animate={{ rotate: open ? 90 : 0 }}
          className="h-6 w-6 text-neutral-400"
        >
          {open ? (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </motion.div>
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-20 gap-4 items-end rounded-[2.5rem] bg-neutral-950/20 backdrop-blur-2xl px-6 pb-4 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() || { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [48, 58, 48]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [48, 58, 48]);

  let widthIconTransform = useTransform(distance, [-150, 0, 150], [24, 29, 24]);
  let heightIconTransform = useTransform(distance, [-150, 0, 150], [24, 29, 24]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  });

  let widthIcon = useSpring(widthIconTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  });
  let heightIcon = useSpring(heightIconTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        className="aspect-square rounded-[1.5rem] bg-white/[0.03] flex items-center justify-center relative border border-white/5 transition-all duration-300 shadow-inner group"
        style={{
          backgroundColor: hovered ? "hsl(var(--primary) / 0.15)" : "rgba(255,255,255,0.03)",
          borderColor: hovered ? "hsl(var(--primary) / 0.4)" : "rgba(255,255,255,0.05)",
          boxShadow: hovered ? "0 0 20px hsl(var(--primary)/0.2), inset 0 0 10px hsl(var(--primary)/0.1)" : "inset 0 0 0 rgba(0,0,0,0)",
        }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 5, x: "-50%" }}
              className="px-3 py-1.5 whitespace-pre rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-white absolute left-1/2 -top-14 w-fit text-[10px] font-mono tracking-widest uppercase shadow-2xl"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center transition-colors duration-300"
          animate={{ color: hovered ? "hsl(var(--primary))" : "rgba(255,255,255,0.6)" }}
        >
          {icon}
        </motion.div>
        
        {/* macOS Reflection dot - updated to amber hover glow */}
        <motion.div 
          className="absolute -bottom-1.5 w-6 h-1 rounded-full blur-[2px]"
          style={{ background: hovered ? "hsl(var(--primary))" : "transparent" }}
          animate={{ opacity: hovered ? 0.8 : 0 }}
        />
      </motion.div>
    </Link>
  );
}
