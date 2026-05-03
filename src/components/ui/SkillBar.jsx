import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function SkillBar({ name, level }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-mono text-sm font-medium">{name}</span>
        <span className="text-xs text-text-muted">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-surface overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-neon to-green-neon"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </div>
  );
}
