const features = [
  {
    num: "01",
    title: "MID-MARKET RATES",
    body:
      "We always use the real exchange rate — the same one banks use between themselves. No inflated spreads, no hidden markups.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-acid">
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 14h10M14 9l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "INSTANT SETTLEMENT",
    body:
      "Most transfers complete in under 60 seconds. Our rail infrastructure bypasses traditional banking queues entirely.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-acid">
        <path d="M5 14h18M18 8l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 8v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "BANK-GRADE SECURITY",
    body:
      "256-bit AES encryption, 2FA, and live fraud detection. Regulated across 40+ jurisdictions worldwide.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-acid">
        <path d="M14 3L5 7v8c0 5 4 9 9 10 5-1 9-5 9-10V7L14 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 14l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "ZERO TRANSFER FEES",
    body:
      "No transfer fees on any conversion. We earn a tiny, transparent margin on the exchange rate — that's it. Always.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-acid">
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 10h8M10 14h8M10 18h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 18l-2-2 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "05",
    title: "180+ CURRENCIES",
    body:
      "From USD to Kuwaiti Dinar to Pakistani Rupee. Every major currency, plus emerging market pairs you won't find elsewhere.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-acid">
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="14" cy="14" rx="5" ry="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 14h24" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: "06",
    title: "RATE ALERTS",
    body:
      "Set a target rate and get notified the moment your currency pair hits it. Never miss the perfect time to exchange.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-acid">
        <path d="M14 3v2M14 23v2M7 7l1.5 1.5M19.5 19.5L21 21M3 14h2M23 14h2M7 21l1.5-1.5M19.5 8.5L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="2" fill="currentColor" className="text-acid"/>
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section title */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-muted tracking-widest mb-2">WHAT WE OFFER</p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-widest text-offwhite">
              WHY <span className="text-acid">VELOX</span>
            </h2>
          </div>
          <p className="font-body text-sm text-muted max-w-xs leading-relaxed">
            Built for people who move money internationally and refuse to pay
            outdated banking fees.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-border">
          {features.map((f) => (
            <div
              key={f.num}
              className="border-r border-b border-border p-8 group hover:bg-surface transition-colors duration-300 relative overflow-hidden"
            >
              {/* Number watermark */}
              <span className="absolute -top-2 -right-2 font-display text-7xl text-border group-hover:text-acid/10 transition-colors duration-300 select-none pointer-events-none">
                {f.num}
              </span>

              <div className="mb-5">{f.icon}</div>
              <h3 className="font-display text-xl tracking-widest text-offwhite mb-3 group-hover:text-acid transition-colors duration-300">
                {f.title}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
