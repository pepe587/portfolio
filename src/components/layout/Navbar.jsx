import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaGithub, FaEnvelope } from "react-icons/fa";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-mono text-xl font-bold text-cyan-neon"
          >
            pepe587
          </motion.div>
        </Link>

        {/* Nav Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer font-mono text-sm text-text-muted hover:text-cyan-neon transition-colors"
          >
            About
          </Link>
          <Link
            to="projects"
            smooth={true}
            duration={500}
            className="cursor-pointer font-mono text-sm text-text-muted hover:text-cyan-neon transition-colors"
          >
            Projects
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <motion.a
            href="https://github.com/pepe587"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-text-muted hover:text-cyan-neon transition-colors"
            aria-label="GitHub profile"
          >
            <FaGithub size={20} />
          </motion.a>
          <motion.a
            href="mailto:pepegocar14@gmail.com"
            whileHover={{ scale: 1.1 }}
            className="text-text-muted hover:text-cyan-neon transition-colors"
            aria-label="Send email"
          >
            <FaEnvelope size={20} />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
