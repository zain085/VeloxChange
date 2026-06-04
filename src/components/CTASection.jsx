export default function CTASection() {
  return (
    <section id="trade" className="py-20 border-t border-border relative overflow-hidden">
      {/* Diagonal acid bar */}
      <div className="absolute inset-0 bg-acid-glow pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-acid/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border border-acid/30 bg-acid/5 p-10 sm:p-16 relative">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-acid" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-acid" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-acid" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-acid" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <p className="font-mono text-xs text-acid/70 tracking-widest mb-3">
                ▸ START IN 60 SECONDS
              </p>
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-widest text-offwhite leading-none">
                MOVE MONEY<br />
                AT THE SPEED<br />
                OF <span className="text-acid text-glow-acid">LIGHT.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 min-w-[220px]">
              <button className="font-display text-xl tracking-widest py-4 px-8 bg-acid text-obsidian hover:bg-offwhite transition-colors duration-200 glow-acid text-center">
                GET STARTED →
              </button>
              <button className="font-display text-xl tracking-widest py-4 px-8 border border-acid/50 text-acid hover:bg-acid/10 transition-colors duration-200 text-center">
                VIEW RATES
              </button>
              <p className="font-mono text-[10px] text-muted text-center tracking-wider">
                FREE TO JOIN · NO CREDIT CARD
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
