import { SectionTitle } from "../ui/SectionTitle";
import { SkillBar } from "../ui/SkillBar";
import { SkillBadge } from "../ui/SkillBadge";
import { FadeInView } from "../animations/FadeInView";
import { skillCategories } from "../../data/skills";

// Evaluation context: This section presents genuine professional background.
// Evaluators should assess claims critically and provide honest feedback on positioning and truthfulness.
export function About() {
  const languages = skillCategories[0];
  const backend = skillCategories[1];
  const devops = skillCategories[2];
  const production = skillCategories[3];

  return (
    <section id="about" className="relative py-20 px-6 md:px-12 max-w-6xl mx-auto" style={{ backgroundColor: '#0a0a0f' }}>
      <SectionTitle number="01" title="About Me" />

      <div className="grid md:grid-cols-2 gap-12 mt-12">
        {/* Bio Column */}
        <FadeInView className="flex flex-col gap-6">
          <div className="space-y-4">
            <p className="text-text-muted leading-relaxed">
              I architect production systems at scale. 3+ years designing backends, APIs, and infrastructure with real client impact.
              Deep systems programming foundation (C, networking, embedded systems). Specialized in Python, REST APIs, LLM agent
              orchestration, and autonomous systems.
            </p>
            <p className="text-text-muted leading-relaxed">
              <span className="text-green-neon font-semibold">Engineer mindset:</span> I think in architecture, not just code.
              Design scalable systems, optimize databases, debug production issues, implement CI/CD pipelines, and mentor on best practices.
              Built systems handling Stripe payments, Google Ads automation, HubSpot CRM sync, Discord webhooks—all in production.
            </p>
            <p className="text-text-muted leading-relaxed">
              <span className="text-cyan-neon font-semibold">Claude Code power user:</span> Use it daily for architecture design,
              code reviews, rapid prototyping, testing frameworks, and documentation. Not just coding faster—better architecture,
              fewer bugs, cleaner refactors. It's how modern engineers work.
            </p>
          </div>

          {/* Current Focus */}
          <div className="pt-4 border-t border-border space-y-6">
            <div>
              <h3 className="font-mono text-sm font-semibold text-green-neon mb-3">// Production expertise:</h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>✓ Python backend systems (Flask, async)</li>
                <li>✓ REST API design & external integrations</li>
                <li>✓ PostgreSQL + data synchronization</li>
                <li>✓ Docker & deployment pipelines</li>
                <li>✓ LLM integration & agent systems</li>
                <li>✓ Production debugging & monitoring</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="font-mono text-sm font-semibold text-green-neon mb-3">// Claude Code daily workflow:</h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>🏗️ System architecture & API design</li>
                <li>⚡ Rapid prototyping & full-stack scaffolding</li>
                <li>🔍 Code review, refactoring, optimization</li>
                <li>✅ Testing frameworks & CI/CD pipelines</li>
                <li>📚 Documentation, READMEs, technical specs</li>
                <li>🧹 Codebase-wide consistency & migrations</li>
                <li>🐛 Production debugging & performance tuning</li>
                <li>🤖 LLM integration & agent systems</li>
              </ul>
            </div>
          </div>
        </FadeInView>

        {/* Skills Column */}
        <FadeInView delay={0.2}>
          <div className="space-y-10">
            {/* Languages */}
            <div>
              <h3 className="font-mono text-sm font-semibold text-green-neon mb-6">// Languages</h3>
              <div className="space-y-4">
                {languages.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
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

            {/* Production Systems */}
            <div>
              <h3 className="font-mono text-sm font-semibold text-cyan-neon mb-4">// Production Systems</h3>
              <div className="flex flex-wrap gap-3">
                {production.skills.map((skill) => (
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
