import { useState, useRef, useEffect } from "react";
import { CURRENCIES } from "../data/currencies";
import { useExchangeRate } from "../hooks/useExchangeRate";

function CurrencySelect({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = CURRENCIES.find((c) => c.code === value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div id="hero" className="relative" ref={ref}>
      <p className="font-heading text-xs tracking-widest text-muted mb-2">{label}</p>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full bg-surface-3 border border-border hover:border-acid/50 transition-colors px-4 py-3 rounded-sm group"
      >
        <span className="text-2xl">{selected?.flag}</span>
        <div className="flex-1 text-left">
          <p className="font-display text-2xl tracking-widest text-offwhite leading-none">{selected?.code}</p>
          <p className="font-body text-xs text-muted mt-0.5">{selected?.name}</p>
        </div>
        <svg
          className={`w-4 h-4 text-muted group-hover:text-acid transition-all ${open ? "rotate-180" : ""}`}
          viewBox="0 0 16 16" fill="none"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-surface-3 border border-border-2 rounded-sm shadow-2xl max-h-64 overflow-y-auto">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => { onChange(c.code); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface text-left transition-colors ${
                c.code === value ? "bg-acid/10 border-l-2 border-acid" : ""
              }`}
            >
              <span className="text-lg">{c.flag}</span>
              <span className="font-mono text-sm text-offwhite">{c.code}</span>
              <span className="font-body text-xs text-muted ml-auto">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AnimatedRate({ rate, direction }) {
  const [display, setDisplay] = useState(rate);
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    setAnimClass("scale-110 text-acid text-glow-acid");
    const t = setTimeout(() => {
      setDisplay(rate);
      setAnimClass("");
    }, 200);
    return () => clearTimeout(t);
  }, [rate]);

  return (
    <span
      className={`font-display transition-all duration-300 ${animClass}`}
      style={{ display: "inline-block" }}
    >
      {display}
    </span>
  );
}

export default function Hero() {
  const [fromCur, setFromCur] = useState("USD");
  const [toCur,   setToCur]   = useState("PKR");
  const [amount,  setAmount]  = useState("1000");

  const { rate, loading, refresh, lastUpdate, direction } = useExchangeRate(fromCur, toCur);

  const numAmount = parseFloat(amount.replace(/,/g, "")) || 0;
  const converted = (numAmount * rate).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const fromInfo = CURRENCIES.find((c) => c.code === fromCur);
  const toInfo   = CURRENCIES.find((c) => c.code === toCur);

  const swap = () => {
    setFromCur(toCur);
    setToCur(fromCur);
  };

  const dirColor =
    direction === "up" ? "text-acid" : direction === "down" ? "text-rose-400" : "text-silver";
  const dirArrow = direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  return (
    <section className="relative min-h-screen pt-14 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />
      {/* Acid glow top */}
      <div className="absolute inset-0 bg-acid-glow pointer-events-none" />

      {/* Corner marks */}
      <div className="absolute top-20 left-4 w-6 h-6 border-t-2 border-l-2 border-acid/30" />
      <div className="absolute top-20 right-4 w-6 h-6 border-t-2 border-r-2 border-acid/30" />
      <div className="absolute bottom-8 left-4 w-6 h-6 border-b-2 border-l-2 border-acid/20" />
      <div className="absolute bottom-8 right-4 w-6 h-6 border-b-2 border-r-2 border-acid/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Typography hero */}
          <div className="space-y-6 animate-fade-in">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 border border-acid/30 bg-acid/5 px-3 py-1.5 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse2" />
              <span className="font-mono text-xs text-acid tracking-widest">LIVE RATES ACTIVE</span>
            </div>

            <h1 className="font-display text-[4.5rem] sm:text-[6rem] lg:text-[7.5rem] leading-none tracking-widest text-offwhite">
              INSTANT<br />
              <span className="text-acid text-glow-acid">EXCHANGE</span><br />
              ANYWHERE
            </h1>

            <p className="font-body text-sm text-muted leading-relaxed max-w-md">
              Real-time mid-market rates. Zero hidden fees.
              Transfer money across 180+ currencies at the speed of light.
            </p>

            {/* Live rate display */}
            <div className="flex items-end gap-4 pt-2">
              <div>
                <p className="font-mono text-xs text-muted mb-1 tracking-widest">1 {fromCur} =</p>
                <div className={`font-display text-5xl text-offwhite ${loading ? "opacity-40" : ""}`}>
                  <AnimatedRate rate={rate.toFixed(rate >= 100 ? 2 : 4)} direction={direction} />
                  {" "}
                  <span className="text-silver">{toCur}</span>
                </div>
              </div>
              <div className={`flex flex-col items-start pb-1 font-mono text-sm ${dirColor}`}>
                <span>{dirArrow}</span>
              </div>
            </div>

            {/* Refresh + timestamp */}
            <div className="flex items-center gap-4">
              <button
                onClick={refresh}
                disabled={loading}
                className="flex items-center gap-2 font-mono text-xs text-muted hover:text-acid transition-colors disabled:opacity-40"
              >
                <svg className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 8A5.5 5.5 0 1 1 8 2.5v0a5.5 5.5 0 0 1 4.243 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12.5 2v2.5H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {loading ? "REFRESHING..." : "REFRESH"}
              </button>
              <span className="font-mono text-xs text-dim">
                {lastUpdate.toLocaleTimeString()}
              </span>
            </div>

            {/* Stats row */}
            <div className="flex gap-6 pt-4 border-t border-border">
              {["180+ Currencies", "0% Hidden Fees", "~60s Transfer"].map((s, i) => (
                <div key={i}>
                  <p className="font-mono text-[10px] text-muted tracking-widest">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Converter card */}
          <div className="relative animate-slide-up" style={{ animationDelay: "0.15s" }}>
            {/* Accent line */}
            <div className="absolute -top-px left-0 right-0 h-px bg-acid" />

            <div className="bg-ink border border-border p-6 sm:p-8 space-y-5 relative">
              {/* Card header */}
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg tracking-widest text-offwhite">CONVERT</h2>
                <span className="font-mono text-xs text-muted tracking-widest px-2 py-1 border border-border rounded-sm">
                  MID-MARKET
                </span>
              </div>

              {/* Amount input */}
              <div>
                <p className="font-heading text-xs tracking-widest text-muted mb-2">AMOUNT</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-xl text-acid">
                    {fromInfo?.symbol}
                  </span>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9.]/g, "");
                      setAmount(v);
                    }}
                    className="w-full bg-surface-3 border border-border hover:border-acid/40 focus:border-acid outline-none transition-colors px-4 py-3 pl-10 font-mono text-xl text-offwhite rounded-sm placeholder-dim"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* From / Swap / To */}
              <div className="space-y-3">
                <CurrencySelect value={fromCur} onChange={setFromCur} label="FROM" />

                {/* Swap button */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <button
                    onClick={swap}
                    className="w-9 h-9 border border-border hover:border-acid bg-surface-3 hover:bg-acid/10 flex items-center justify-center text-muted hover:text-acid transition-all rounded-sm group"
                  >
                    <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v12M4 5l4-3 4 3M4 11l4 3 4-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <CurrencySelect value={toCur} onChange={setToCur} label="TO" />
              </div>

              {/* Result */}
              <div className="bg-surface-3 border border-border-2 p-4 rounded-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-xs text-muted tracking-widest mb-1">YOU RECEIVE</p>
                    <div className={`font-display text-3xl sm:text-4xl text-acid transition-all duration-300 ${loading ? "opacity-40" : ""}`}>
                      {toInfo?.symbol} {converted}
                    </div>
                    <p className="font-mono text-xs text-muted mt-2">
                      Rate: 1 {fromCur} = {rate.toFixed(rate >= 100 ? 2 : 4)} {toCur}
                    </p>
                  </div>
                  <span className="text-3xl">{toInfo?.flag}</span>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full py-4 bg-acid text-obsidian font-display text-lg tracking-widest hover:bg-offwhite transition-colors duration-200 rounded-sm glow-acid">
                TRANSFER NOW →
              </button>

              <p className="font-mono text-[10px] text-dim text-center tracking-wider">
                NO TRANSFER FEES · SECURE · INSTANT
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
