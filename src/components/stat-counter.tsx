"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  /** "plain" prints the number verbatim (years should not count up from zero). */
  format?: "count" | "plain";
  durationMs?: number;
}

/**
 * Number counter (§49). Counts once when scrolled into view, respects
 * `prefers-reduced-motion`, and always renders the final value as text so it is
 * correct for screen readers and with JavaScript disabled.
 */
export function StatCounter({
  value,
  suffix = "",
  format = "count",
  durationMs = 1400,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(format === "plain" ? value : 0);

  useEffect(() => {
    if (format === "plain") return;

    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // Readers who ask for reduced motion get the final number immediately.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(value);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          // easeOutExpo
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setDisplay(Math.round(eased * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs, format]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
