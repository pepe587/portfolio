import { Link } from "react-scroll";
import { FaGithub, FaEnvelope } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 px-6 md:px-12 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Left - Copyright */}
          <div className="flex flex-col justify-end">
            <p className="text-sm text-text-muted">
              © {currentYear} Jose Maria Gomez Cardenas
            </p>
            <p className="text-xs text-text-muted/60 mt-2">
              Built with React, Vite, Tailwind CSS & Framer Motion
            </p>
          </div>

          {/* Center - Nav Links */}
          <div className="flex flex-col items-center justify-end gap-4">
            <Link
              to="hero"
              smooth={true}
              duration={500}
              className="cursor-pointer font-mono text-sm text-text-muted hover:text-cyan-neon transition-colors"
            >
              Home
            </Link>
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

          {/* Right - Social Links */}
          <div className="flex flex-col items-end justify-end gap-4">
            <div className="flex gap-4">
              <a
                href="https://github.com/pepe587"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-cyan-neon transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="mailto:pepegocar14@gmail.com"
                className="text-text-muted hover:text-cyan-neon transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="font-mono text-xs text-text-muted/40">
            &gt; echo "Thanks for visiting!"
          </p>
        </div>
      </div>
    </footer>
  );
}
