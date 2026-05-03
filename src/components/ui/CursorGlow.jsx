import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    if (typeof window !== "undefined") {
      setIsPointer(window.matchMedia("(pointer: fine)").matches);
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isPointer) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-0 rounded-full"
      style={{
        width: "256px",
        height: "256px",
        background: "radial-gradient(circle, rgba(0, 255, 204, 0.08) 0%, transparent 70%)",
      }}
      animate={{ x: pos.x - 128, y: pos.y - 128 }}
      transition={{ duration: 0.05, ease: "linear" }}
    />
  );
}
