export const CURRENCIES = [
  { code: "USD", name: "US Dollar",        flag: "🇺🇸", symbol: "$"  },
  { code: "EUR", name: "Euro",             flag: "🇪🇺", symbol: "€"  },
  { code: "GBP", name: "British Pound",    flag: "🇬🇧", symbol: "£"  },
  { code: "JPY", name: "Japanese Yen",     flag: "🇯🇵", symbol: "¥"  },
  { code: "AED", name: "UAE Dirham",       flag: "🇦🇪", symbol: "د.إ"},
  { code: "CHF", name: "Swiss Franc",      flag: "🇨🇭", symbol: "Fr" },
  { code: "CAD", name: "Canadian Dollar",  flag: "🇨🇦", symbol: "CA$"},
  { code: "AUD", name: "Australian Dollar",flag: "🇦🇺", symbol: "A$" },
  { code: "CNY", name: "Chinese Yuan",     flag: "🇨🇳", symbol: "¥"  },
  { code: "INR", name: "Indian Rupee",     flag: "🇮🇳", symbol: "₹"  },
  { code: "PKR", name: "Pakistani Rupee",  flag: "🇵🇰", symbol: "₨"  },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", symbol: "S$" },
  { code: "SAR", name: "Saudi Riyal",      flag: "🇸🇦", symbol: "﷼"  },
  { code: "KWD", name: "Kuwaiti Dinar",    flag: "🇰🇼", symbol: "K.D"},
  { code: "TRY", name: "Turkish Lira",     flag: "🇹🇷", symbol: "₺"  },
  { code: "MXN", name: "Mexican Peso",     flag: "🇲🇽", symbol: "$"  },
  { code: "BRL", name: "Brazilian Real",   flag: "🇧🇷", symbol: "R$" },
  { code: "ZAR", name: "South African Rand",flag:"🇿🇦", symbol: "R"  },
];

// Base rates relative to USD (realistic mid-market approximations)
export const BASE_RATES_USD = {
  USD: 1,
  EUR: 0.9215,
  GBP: 0.7894,
  JPY: 149.82,
  AED: 3.6725,
  CHF: 0.8923,
  CAD: 1.3612,
  AUD: 1.5234,
  CNY: 7.2418,
  INR: 83.42,
  PKR: 278.50,
  SGD: 1.3445,
  SAR: 3.7500,
  KWD: 0.3081,
  TRY: 32.18,
  MXN: 16.74,
  BRL: 4.9734,
  ZAR: 18.63,
};

export const TRENDING_PAIRS = [
  { from: "USD", to: "EUR", change: +0.12 },
  { from: "GBP", to: "USD", change: -0.08 },
  { from: "USD", to: "JPY", change: +0.34 },
  { from: "EUR", to: "GBP", change: +0.05 },
  { from: "USD", to: "PKR", change: +0.61 },
  { from: "USD", to: "AED", change:  0.00 },
  { from: "USD", to: "INR", change: +0.22 },
  { from: "BTC", to: "USD", change: +1.82 },
];

export const MARKET_STATS = [
  { label: "Daily Volume",   value: "$6.6T",  sub: "Global FX market" },
  { label: "Active Pairs",   value: "180+",   sub: "Tradeable currencies" },
  { label: "Avg Spread",     value: "0.02%",  sub: "Mid-market rate" },
  { label: "Transfer Speed", value: "<2 min", sub: "Instant settlement" },
];

// Simulate a slight drift in live rates
export function getLiveRate(from, to) {
  const fromUsd = BASE_RATES_USD[from] ?? 1;
  const toUsd   = BASE_RATES_USD[to]   ?? 1;
  const base = toUsd / fromUsd;
  // tiny random drift ±0.15%
  const drift = 1 + (Math.random() - 0.5) * 0.003;
  return base * drift;
}
