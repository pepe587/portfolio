import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-scroll";
import { FaGithub } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start px-6 md:px-12 overflow-hidden pt-20"
      style={{ backgroundColor: '#0a0a0f' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 204, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 204, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <motion.div
        className="relative z-10 max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-cyan-neon text-lg mb-4"
        >
          &gt; Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-4 text-white leading-tight"
        >
          Jose Maria
          <br />
          Gomez Cardenas
        </motion.h1>

        {/* Animated role */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-cyan-neon text-lg">$</span>
            <TypeAnimation
              sequence={[
                "Python Backend Engineer",
                2000,
                "Production Systems Developer",
                2000,
                "Blue Team Junior Analyst",
                2000,
                "LLM Agent Architect",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="font-mono text-xl text-green-neon"
            />
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-text-muted max-w-lg mb-8 leading-relaxed"
        >
          Software engineer working on production systems and security tooling. 3+ years building backends, APIs, and infrastructure.
          Deep systems background (C, networking, embedded). Certified Blue Team Junior Analyst — interested in secure systems and defensive tooling.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 pt-4"
        >
          <Link
            to="projects"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded border-2 border-cyan-neon bg-cyan-neon/10 px-6 py-3 font-mono font-semibold text-cyan-neon hover:bg-cyan-neon/20 transition-all"
            >
              View Projects
            </motion.button>
          </Link>

          <motion.a
            href="https://github.com/pepe587"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded border-2 border-green-neon bg-green-neon/10 px-6 py-3 font-mono font-semibold text-green-neon hover:bg-green-neon/20 transition-all inline-flex items-center gap-2"
            aria-label="Visit GitHub profile"
          >
            <FaGithub size={18} />
            GitHub
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-cyan-neon rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-cyan-neon rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
