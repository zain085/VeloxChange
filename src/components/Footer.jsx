export default function Footer() {
  const links = {
    PRODUCT: ["Exchange", "Rate Alerts", "Mass Payouts", "API Access"],
    COMPANY: ["About", "Blog", "Careers", "Press Kit"],
    LEGAL:   ["Privacy", "Terms", "Cookie Policy", "Compliance"],
    SUPPORT: ["Help Center", "Contact", "Status", "Developers"],
  };

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Top row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 pb-12 border-b border-border">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 bg-acid flex items-center justify-center rounded-sm">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="#080808" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="font-display text-lg tracking-widest text-offwhite">
                VELOX<span className="text-acid">CHANGE</span>
              </span>
            </div>
            <p className="font-body text-xs text-muted leading-relaxed mb-4 max-w-[180px]">
              The world's fastest currency exchange platform. Zero fees. Real rates.
            </p>
            <div className="flex gap-3">
              {["twitter", "linkedin", "github"].map((s) => (
                <a key={s} href="#" className="w-7 h-7 border border-border hover:border-acid flex items-center justify-center text-muted hover:text-acid transition-all rounded-sm">
                  <span className="font-mono text-[8px]">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-mono text-[10px] tracking-widest text-muted mb-4">{group}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="font-body text-xs text-silver hover:text-acid transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-muted tracking-wider">
            © 2025 VELOXCHANGE INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-acid rounded-full animate-pulse2" />
            <span className="font-mono text-[10px] text-muted tracking-wider">
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
          <p className="font-mono text-[10px] text-dim tracking-wider">
            REGULATED · INSURED · ENCRYPTED
          </p>
        </div>
      </div>
    </footer>
  );
}
