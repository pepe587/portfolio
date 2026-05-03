export function SkillBadge({ name }) {
  return (
    <div className="rounded-full border border-cyan-neon/40 bg-cyan-neon/5 px-4 py-2 text-sm font-mono text-cyan-neon/90 hover:border-cyan-neon hover:bg-cyan-neon/10 transition-all">
      {name}
    </div>
  );
}
