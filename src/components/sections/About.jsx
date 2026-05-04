import { SkillBadge } from "../ui/SkillBadge";
import { FadeInView } from "../animations/FadeInView";
import { SectionTitle } from "../ui/SectionTitle";
import { skillCategories } from "../../data/skills";

export function About() {
  const languages = skillCategories[0];
  const backend = skillCategories[1];
  const devops = skillCategories[2];

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
              I ship faster with Claude Code: architecture, refactoring, testing, and deployment pipelines.
              Lately spending more time on LLM agents and autonomous tooling.
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
              "Production debugging & monitoring",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-text-muted">
                <span className="font-mono text-green-neon">—</span>
                {item}
              </div>
            ))}
          </div>

          {/* Claude Code highlight */}
          <div className="rounded-lg border p-4" style={{ borderColor: '#00ffcc30', backgroundColor: '#00ffcc08' }}>
            <div className="font-mono text-xs font-semibold mb-1" style={{ color: '#00ffcc' }}>Claude Code power user</div>
            <p className="text-xs text-text-muted leading-relaxed">
              Daily driver for architecture design, code reviews, rapid prototyping, and refactoring.
              Not just coding faster — better architecture, fewer bugs, cleaner systems.
            </p>
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
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
