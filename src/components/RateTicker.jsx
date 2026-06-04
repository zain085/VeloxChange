import { TRENDING_PAIRS, BASE_RATES_USD } from "../data/currencies";

export default function RateTicker() {
  const pairs = [...TRENDING_PAIRS, ...TRENDING_PAIRS]; // doubled for seamless loop

  return (
    <div className="bg-surface border-b border-border overflow-hidden ticker-pause h-9 flex items-center">
      <div className="ticker-inner flex gap-0 animate-ticker-left whitespace-nowrap">
        {pairs.map((pair, i) => {
          const fromRate = BASE_RATES_USD[pair.from] ?? 1;
          const toRate   = BASE_RATES_USD[pair.to]   ?? 1;
          const rate     = (toRate / fromRate).toFixed(pair.to === "JPY" || pair.to === "PKR" || pair.to === "INR" ? 2 : 4);
          const isUp = pair.change > 0;
          const isFlat = pair.change === 0;

          return (
            <span key={i} className="inline-flex items-center gap-2 px-6 border-r border-border">
              <span className="font-mono text-xs text-muted">
                {pair.from}/{pair.to}
              </span>
              <span className="font-mono text-xs text-offwhite font-500">{rate}</span>
              {!isFlat && (
                <span
                  className={`font-mono text-[10px] font-500 ${isUp ? "text-acid" : "text-rose-400"}`}
                >
                  {isUp ? "▲" : "▼"} {Math.abs(pair.change).toFixed(2)}%
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
