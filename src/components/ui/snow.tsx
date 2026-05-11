"use client";

import { useEffect, useState } from "react";

/** Snow — slowed to 50%, opacity reduced, amber+cyan palette to match site theme */
export function Snow() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const generateSnow = (count: number, color: string) => {
    let shadow = "";
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 100);
      const y = Math.floor(Math.random() * 100);
      shadow += `${x}vw ${y}vh 1px 1px ${color}${i < count - 1 ? "," : ""}`;
    }
    return shadow;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
      <style>{`
        .snow-layer-1 {
          width: 2px; height: 2px; border-radius: 50%;
          background: transparent;
          box-shadow: ${generateSnow(80, "rgba(245,166,35,0.55)")};
          animation: snowFall 40s linear infinite;
        }
        .snow-layer-2 {
          width: 3px; height: 3px; border-radius: 50%;
          background: transparent;
          box-shadow: ${generateSnow(50, "rgba(0,207,255,0.35)")};
          animation: snowFall 55s linear infinite;
          animation-delay: -18s;
        }
        .snow-layer-3 {
          width: 1.5px; height: 1.5px; border-radius: 50%;
          background: transparent;
          box-shadow: ${generateSnow(100, "rgba(255,255,255,0.3)")};
          animation: snowFall 70s linear infinite;
          animation-delay: -35s;
        }
        @keyframes snowFall {
          0%   { transform: translateY(-10vh) translateX(0); }
          50%  { transform: translateY(50vh)  translateX(2vw); }
          100% { transform: translateY(110vh) translateX(-1vw); }
        }
      `}</style>
      <div className="snow-layer-1 absolute top-0 left-0" />
      <div className="snow-layer-2 absolute top-0 left-0" />
      <div className="snow-layer-3 absolute top-0 left-0" />
    </div>
  );
}
