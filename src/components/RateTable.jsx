import { useState, useEffect } from "react";
import { CURRENCIES, getLiveRate } from "../data/currencies";

const BASE = "USD";

export default function RateTable() {
  const display = CURRENCIES.filter((c) => c.code !== BASE).slice(0, 12);

  const [rates, setRates] = useState(() =>
    Object.fromEntries(display.map((c) => [c.code, getLiveRate(BASE, c.code)]))
  );
  const [prev, setPrev] = useState({});
  const [flash, setFlash] = useState({});

  useEffect(() => {
    const id = setInterval(() => {
      const next = Object.fromEntries(
        display.map((c) => [c.code, getLiveRate(BASE, c.code)])
      );
      setPrev(rates);
      setRates(next);
      // flash changed cells
      const changed = display
        .filter((c) => Math.abs(next[c.code] - rates[c.code]) > 0.0001)
        .map((c) => c.code);
      setFlash(Object.fromEntries(changed.map((k) => [k, true])));
      setTimeout(() => setFlash({}), 600);
    }, 5000);
    return () => clearInterval(id);
  }, [rates]);

  return (
    <section id="market" className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs text-muted tracking-widest mb-2">
              LIVE · UPDATES EVERY 5s
            </p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-widest text-offwhite">
              MARKET <span className="text-acid">RATES</span>
            </h2>
          </div>
          <span className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted border border-border px-3 py-1.5">
            <span className="w-1.5 h-1.5 bg-acid rounded-full animate-pulse2" />
            BASE: USD
          </span>
        </div>

        <div className="border border-border overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-4 sm:grid-cols-5 bg-surface-2 border-b border-border px-4 py-3">
            {["CURRENCY", "CODE", "RATE", "24H", "ACTION"].map((h, i) => (
              <p
                key={h}
                className={`font-mono text-[10px] tracking-widest text-muted ${
                  i === 4 ? "hidden sm:block text-right" : ""
                } ${i === 3 ? "text-right" : ""}`}
              >
                {h}
              </p>
            ))}
          </div>

          {/* Rows */}
          {display.map((cur, i) => {
            const rate = rates[cur.code] ?? 1;
            const prevRate = prev[cur.code] ?? rate;
            const isUp = rate >= prevRate;
            const diff = (((rate - prevRate) / prevRate) * 100).toFixed(3);
            const isFlashing = flash[cur.code];

            return (
              <div
                key={cur.code}
                className={`grid grid-cols-4 sm:grid-cols-5 px-4 py-3.5 border-b border-border items-center transition-colors duration-500 group hover:bg-surface-2 ${
                  isFlashing ? (isUp ? "bg-acid/5" : "bg-rose-500/5") : ""
                }`}
              >
                {/* Name */}
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cur.flag}</span>
                  <span className="font-body text-xs text-muted hidden sm:block">
                    {cur.name}
                  </span>
                </div>

                {/* Code */}
                <p className="font-mono text-sm text-offwhite">{cur.code}</p>

                {/* Rate */}
                <p className={`font-mono text-sm transition-all duration-300 ${
                  isFlashing ? (isUp ? "text-acid" : "text-rose-400") : "text-offwhite"
                }`}>
                  {rate >= 100 ? rate.toFixed(2) : rate >= 1 ? rate.toFixed(4) : rate.toFixed(6)}
                </p>

                {/* 24h change */}
                <p className={`font-mono text-xs text-right ${isUp ? "text-acid" : "text-rose-400"}`}>
                  {isUp ? "+" : ""}{diff}%
                </p>

                {/* Buy button */}
                <div className="hidden sm:flex justify-end">
                  <button className="font-mono text-[10px] tracking-widest px-3 py-1.5 border border-border text-muted hover:border-acid hover:text-acid transition-all rounded-sm opacity-0 group-hover:opacity-100">
                    EXCHANGE →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <button className="font-mono text-xs tracking-widest text-muted hover:text-acid transition-colors border border-border hover:border-acid px-6 py-2.5 rounded-sm">
            VIEW ALL 180+ CURRENCIES
          </button>
        </div>
      </div>
    </section>
  );
}
