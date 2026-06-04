import { MARKET_STATS } from "../data/currencies";

export default function MarketStats() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {MARKET_STATS.map((stat, i) => (
            <div
              key={i}
              className="px-6 py-8 group hover:bg-surface-2 transition-colors duration-300"
            >
              <p className="font-mono text-[10px] tracking-widest text-muted mb-2">
                {stat.label.toUpperCase()}
              </p>
              <p className="font-display text-4xl sm:text-5xl text-offwhite group-hover:text-acid transition-colors duration-300">
                {stat.value}
              </p>
              <p className="font-body text-xs text-dim mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
