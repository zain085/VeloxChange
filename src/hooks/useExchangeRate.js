import { useState, useEffect, useCallback } from "react";
import { getLiveRate } from "../data/currencies";

export function useExchangeRate(from, to) {
  const [rate, setRate]       = useState(() => getLiveRate(from, to));
  const [prevRate, setPrev]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const refresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setPrev(rate);
      const next = getLiveRate(from, to);
      setRate(next);
      setLastUpdate(new Date());
      setLoading(false);
    }, 600);
  }, [from, to, rate]);

  // Auto-refresh every 8 seconds to simulate live feed
  useEffect(() => {
    const id = setInterval(refresh, 8000);
    return () => clearInterval(id);
  }, [refresh]);

  // Recalculate immediately when pair changes
  useEffect(() => {
    setPrev(null);
    setRate(getLiveRate(from, to));
    setLastUpdate(new Date());
  }, [from, to]);

  const direction = prevRate === null ? null : rate > prevRate ? "up" : rate < prevRate ? "down" : "flat";

  return { rate, prevRate, loading, refresh, lastUpdate, direction };
}
