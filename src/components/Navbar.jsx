import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const menuItems = [
    { name: "Exchange", id: "hero" },
    { name: "Markets", id: "market" },
    { name: "Features", id: "features" },
    { name: "Trade Now", id: "trade" },
  ];

  useEffect(() => {
    const sections = menuItems.map(item => document.getElementById(item.id)).filter(Boolean);

    const options = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // 3. Observe each section
    sections.forEach((section) => observer.observe(section));

    // Cleanup observer on component unmount
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-obsidian/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="w-7 h-7 bg-acid flex items-center justify-center rounded-sm rotate-12 group-hover:rotate-0 transition-transform duration-300">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="#080808" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="font-display text-xl tracking-widest text-offwhite">
            VELOX<span className="text-acid">CHANGE</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={`#${item.id}`}
                className={`font-heading text-sm font-400 tracking-wider transition-colors duration-200 relative ${
                  isActive ? "text-acid" : "text-muted hover:text-acid"
                }`}
              >
                {item.name.toUpperCase()}
                {/* Optional: Subtle underline indicator for the active link */}
                {isActive && (
                  <span className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-acid" />
                )}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="font-heading text-sm tracking-wider text-silver hover:text-acid transition-colors">
            SIGN IN
          </button>
          <button className="font-heading text-sm tracking-wider px-4 py-2 bg-acid text-obsidian font-600 hover:bg-offwhite transition-colors duration-200 rounded-sm">
            GET STARTED
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-silver hover:text-acid transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor">
            <rect width="22" height="2" rx="1"/>
            <rect y="7" width={menuOpen ? 16 : 22} height="2" rx="1"/>
            <rect y="14" width="22" height="2" rx="1"/>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-ink px-4 py-4 space-y-3 animate-slide-up">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block font-heading text-sm tracking-widest py-1 transition-colors ${
                  isActive ? "text-acid border-l-2 border-acid pl-2" : "text-silver hover:text-acid"
                }`}
              >
                {item.name.toUpperCase()}
              </a>
            );
          })}
          <div className="pt-3 border-t border-border flex gap-3">
            <button className="flex-1 font-heading text-sm tracking-wider py-2 border border-border text-silver hover:border-acid hover:text-acid transition-all rounded-sm">
              SIGN IN
            </button>
            <button className="flex-1 font-heading text-sm tracking-wider py-2 bg-acid text-obsidian font-600 rounded-sm">
              START
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}