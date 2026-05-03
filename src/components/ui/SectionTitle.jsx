import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export function SectionTitle({ number, title }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div ref={ref} className="mb-12">
      <h2 className="text-3xl font-bold">
        <span className="font-mono text-cyan-neon">{number}.</span> {title}
      </h2>
      <motion.div
        className="mt-2 h-1 bg-gradient-to-r from-cyan-neon to-transparent"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}
