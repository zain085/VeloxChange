import { useState, useEffect } from "react";
import { CURRENCIES, getLiveRate } from "../data/currencies";

const PAIRS = [
  { from: "USD", to: "EUR" },
  { from: "USD", to: "GBP" },
  { from: "USD", to: "JPY" },
  { from: "USD", to: "AED" },
];

function generateHistory(from, to, points = 20) {
  const base = getLiveRate(from, to);
  return Array.from({ length: points }, (_, i) => {
    const drift = 1 + (Math.sin(i * 0.5) * 0.008) + (Math.random() - 0.5) * 0.004;
    return base * drift;
  });
}

function Sparkline({ data, color = "#B8FF00", width = 120, height = 36 }) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const last = data[data.length - 1];
  const first = data[0];
  const up = last >= first;

  const fill = up ? "rgba(184,255,0,0.08)" : "rgba(244,63,94,0.08)";
  const stroke = up ? "#B8FF00" : "#f43f5e";

  // Closed area path
  const areaPoints = [
    `0,${height}`,
    ...data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    }),
    `${width},${height}`,
  ].join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polygon points={areaPoints} fill={fill} />
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function MiniCharts() {
  const [data, setData] = useState(() =>
    Object.fromEntries(PAIRS.map((p) => [`${p.from}/${p.to}`, generateHistory(p.from, p.to)]))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) =>
        Object.fromEntries(
          PAIRS.map((p) => {
            const key = `${p.from}/${p.to}`;
            const arr = [...(prev[key] ?? []), getLiveRate(p.from, p.to)].slice(-20);
            return [key, arr];
          })
        )
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-16 border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="font-mono text-xs text-muted tracking-widest mb-8">
          LIVE RATE CHARTS · AUTO-UPDATING
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {PAIRS.map((pair) => {
            const key = `${pair.from}/${pair.to}`;
            const arr = data[key] ?? [];
            const rate = arr[arr.length - 1] ?? getLiveRate(pair.from, pair.to);
            const first = arr[0] ?? rate;
            const pct = (((rate - first) / first) * 100).toFixed(3);
            const up = rate >= first;
            const fromInfo = CURRENCIES.find((c) => c.code === pair.from);
            const toInfo   = CURRENCIES.find((c) => c.code === pair.to);

            return (
              <div key={key} className="bg-ink p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{fromInfo?.flag}</span>
                    <span className="font-mono text-xs text-muted">/</span>
                    <span className="text-sm">{toInfo?.flag}</span>
                    <span className="font-mono text-xs text-silver ml-1">{key}</span>
                  </div>
                  <span className={`font-mono text-[10px] ${up ? "text-acid" : "text-rose-400"}`}>
                    {up ? "+" : ""}{pct}%
                  </span>
                </div>

                <p className="font-display text-2xl text-offwhite">
                  {rate >= 100 ? rate.toFixed(2) : rate.toFixed(4)}
                </p>

                <div className="overflow-hidden">
                  <Sparkline data={arr} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
