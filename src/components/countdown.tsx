"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  /** ISO 8601 kick-off time. */
  target: string;
}

function parts(msRemaining: number) {
  const total = Math.max(0, Math.floor(msRemaining / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/**
 * Matchday countdown (§50). Renders nothing until mounted so the server and
 * client markup cannot disagree, and stops ticking once kick-off passes.
 */
export function Countdown({ target }: CountdownProps) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const kickoff = new Date(target).getTime();
    const tick = () => setRemaining(kickoff - Date.now());

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (remaining === null) {
    return <div className="h-20" aria-hidden />;
  }

  if (remaining <= 0) {
    return (
      <p className="display text-2xl text-gold-300 sm:text-3xl">Kick-off</p>
    );
  }

  const { days, hours, minutes, seconds } = parts(remaining);
  const units = [
    { value: days, label: "Days" },
    { value: hours, label: "Hrs" },
    { value: minutes, label: "Min" },
    { value: seconds, label: "Sec" },
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="min-w-16 rounded-lg border border-cream/12 bg-cream/[0.04] px-3 py-3 text-center sm:min-w-20 sm:px-4"
        >
          <span className="display block text-2xl text-cream tabular-nums sm:text-3xl">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="mt-1 block text-[0.5625rem] font-bold uppercase tracking-[0.16em] text-cream/40">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
