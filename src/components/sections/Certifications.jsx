import { FadeInView } from "../animations/FadeInView";
import { SectionTitle } from "../ui/SectionTitle";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-20 px-6 md:px-12 max-w-6xl mx-auto" style={{ backgroundColor: '#0a0a0f' }}>
      <SectionTitle number="03" title="Certifications" />

      <div className="mt-12 max-w-3xl">
        <FadeInView>
          <div
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: '#1e40af40' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4" style={{ backgroundColor: '#0f172a' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <div>
                <p className="font-mono text-sm font-semibold" style={{ color: '#3b82f6' }}>Blue Team Junior Analyst</p>
                <p className="font-mono text-xs" style={{ color: '#64748b' }}>Security Blue Team · Sep 2025 · ID 125634498</p>
              </div>
              <a
                href="/btja-cert.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto font-mono text-xs px-3 py-1 rounded border transition-all"
                style={{ borderColor: '#1e40af60', color: '#3b82f6' }}
              >
                View PDF ↗
              </a>
            </div>

            {/* Certificate embed */}
            <div style={{ aspectRatio: '16/9', backgroundColor: '#0f1729' }}>
              <iframe
                src="/btja-cert.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                title="Blue Team Junior Analyst Certificate"
                width="100%"
                height="100%"
                style={{ border: 'none', display: 'block' }}
              />
            </div>

            {/* Skills covered */}
            <div className="px-5 py-4" style={{ backgroundColor: '#0f172a', borderTop: '1px solid #1e40af20' }}>
              <p className="font-mono text-xs mb-2" style={{ color: '#64748b' }}>// Areas covered</p>
              <div className="flex flex-wrap gap-2">
                {["OSINT", "Digital Forensics", "Vulnerability Management", "DarkWeb Operations", "Threat Hunting", "Network Analysis"].map((area) => (
                  <span
                    key={area}
                    className="font-mono text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: '#1e3a8a20', color: '#93c5fd', border: '1px solid #1e40af30' }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
