import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaShieldAlt, FaCalculator, FaBitcoin, FaServer, FaGamepad, FaDollarSign, FaVideo, FaSearch, FaMicrochip, FaBook } from "react-icons/fa";
import { ProjectImagePlaceholder } from "./ProjectImagePlaceholder";
import { TechTag } from "./TechTag";

const iconMap = {
  shield: FaShieldAlt,
  calculator: FaCalculator,
  coin: FaBitcoin,
  server: FaServer,
  gamepad: FaGamepad,
  target: FaDollarSign,
  video: FaVideo,
  search: FaSearch,
  cpu: FaMicrochip,
  book: FaBook,
};

export function ProjectCard({
  id,
  title,
  description,
  tech,
  github,
  demo,
  featured,
  placeholderType,
  accentColor,
  builtWith,
  icon,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-lg border border-border bg-surface hover:border-cyan-neon/60 transition-all duration-300"
      style={{
        "--hover-color": accentColor,
      }}
    >
      {/* Image Placeholder */}
      <ProjectImagePlaceholder type={placeholderType} accentColor={accentColor} title={title} />

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="text-cyan-neon/80">
                {React.createElement(iconMap[icon], { size: 20 })}
              </span>
            )}
            <h3 className="font-mono text-lg font-bold">{title}</h3>
          </div>
          {builtWith && (
            <span className="ml-2 text-xs font-mono px-2 py-1 rounded bg-green-neon/10 text-green-neon whitespace-nowrap">
              {builtWith}
            </span>
          )}
        </div>
        <p className="mb-4 text-sm text-text-muted leading-relaxed">{description}</p>

        {/* Tech tags */}
        <div className="mb-5 flex flex-wrap gap-2">
          {tech.map((t) => (
            <TechTag key={t} label={t} />
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 rounded border border-cyan-neon/40 bg-cyan-neon/5 px-3 py-2 text-sm font-mono text-cyan-neon/90 hover:border-cyan-neon hover:bg-cyan-neon/15 transition-all"
            aria-label={`View ${title} on GitHub`}
          >
            <FaGithub size={16} />
            GitHub
          </motion.a>

          {demo && (
            <motion.a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded border border-green-neon/40 bg-green-neon/5 px-3 py-2 text-sm font-mono text-green-neon/90 hover:border-green-neon hover:bg-green-neon/15 transition-all"
              aria-label={`View ${title} demo`}
            >
              <FaExternalLinkAlt size={14} />
              Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
