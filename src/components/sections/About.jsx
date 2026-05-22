import { SkillBadge } from "../ui/SkillBadge";
import { FadeInView } from "../animations/FadeInView";
import { SectionTitle } from "../ui/SectionTitle";
import { skillCategories } from "../../data/skills";

export function About() {
  const languages = skillCategories[0];
  const backend = skillCategories[1];
  const devops = skillCategories[2];
  const cyber = skillCategories[4];

  return (
    <section id="about" className="relative py-20 px-6 md:px-12 max-w-6xl mx-auto" style={{ backgroundColor: '#0a0a0f' }}>
      <SectionTitle number="01" title="About Me" />

      <div className="grid md:grid-cols-2 gap-12 mt-12">
        {/* Bio Column */}
        <FadeInView className="flex flex-col gap-8">
          <div className="space-y-4">
            <p className="text-text-muted leading-relaxed">
              Software engineer working on production systems. 3+ years building backends, APIs, and infrastructure.
              Solid systems programming background — C, networking, and embedded — coming from 42.
            </p>
            <p className="text-text-muted leading-relaxed">
              Certified Blue Team Junior Analyst with hands-on skills in threat hunting, digital forensics, OSINT,
              and network analysis. Interested in building secure systems and defensive tooling.
            </p>
          </div>

          {/* What I do */}
          <div className="border-t border-border pt-6 space-y-2">
            <h3 className="font-mono text-sm font-semibold text-green-neon mb-4">// What I build</h3>
            {[
              "Python backend systems & REST APIs",
              "LLM agent orchestration & autonomous tools",
              "Docker infrastructure & deployment pipelines",
              "PostgreSQL databases & data synchronization",
              "Embedded systems & low-level C/C++",
              "Threat hunting & network traffic analysis",
              "Digital forensics & incident investigation",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-text-muted">
                <span className="font-mono text-green-neon">—</span>
                {item}
              </div>
            ))}
          </div>

          {/* BTJA Certificate */}
          <div className="rounded-lg border p-4" style={{ borderColor: '#1e40af40', backgroundColor: '#1e3a8a08' }}>
            <div className="flex items-center gap-2 mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span className="font-mono text-xs font-semibold" style={{ color: '#3b82f6' }}>Blue Team Junior Analyst — Security Blue Team</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              OSINT · Digital Forensics · Vulnerability Management · DarkWeb Operations · Threat Hunting · Network Analysis
            </p>
            <p className="font-mono text-xs mt-1" style={{ color: '#64748b' }}>Cert ID: 125634498 · 2025-09-25</p>
          </div>
        </FadeInView>

        {/* Skills Column */}
        <FadeInView delay={0.2}>
          <div className="space-y-10">
            {/* Languages */}
            <div>
              <h3 className="font-mono text-sm font-semibold text-green-neon mb-4">// Languages</h3>
              <div className="flex flex-wrap gap-3">
                {languages.skills.map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} />
                ))}
              </div>
            </div>

            {/* Backend & APIs */}
            <div>
              <h3 className="font-mono text-sm font-semibold text-cyan-neon mb-4">// Backend & APIs</h3>
              <div className="flex flex-wrap gap-3">
                {backend.skills.map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} />
                ))}
              </div>
            </div>

            {/* DevOps & Tools */}
            <div>
              <h3 className="font-mono text-sm font-semibold text-green-neon mb-4">// DevOps & Tools</h3>
              <div className="flex flex-wrap gap-3">
                {devops.skills.map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} />
                ))}
              </div>
            </div>

            {/* Cybersecurity */}
            <div>
              <h3 className="font-mono text-sm font-semibold mb-4" style={{ color: '#3b82f6' }}>// Cybersecurity</h3>
              <div className="flex flex-wrap gap-3">
                {cyber.skills.map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} />
                ))}
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
