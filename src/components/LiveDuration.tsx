"use client";

import { useEffect, useState } from "react";
import { formatClock, formatYearsMonths } from "@/lib/duration";

/**
 * Renders a duration between `since` and either a fixed `until` (completed,
 * static) or the current moment, ticking every second (ongoing/"present").
 */
export default function LiveDuration({
  since,
  until,
  showClock = true,
  className = "",
}: {
  since: Date;
  /** Omit for an ongoing/"present" duration that ticks live. */
  until?: Date;
  /** Whether to append a live d/h/m/s readout after the years/months summary. */
  showClock?: boolean;
  className?: string;
}) {
  const isLive = !until;
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    if (!isLive) return;
    const update = () => setNow(new Date());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [isLive]);

  if (isLive && !now) {
    return <span className={className}>calculating...</span>;
  }

  const end = until ?? (now as Date);
  const calendar = formatYearsMonths(since, end);

  if (!isLive || !showClock) {
    return <span className={className}>{calendar}</span>;
  }

  return (
    <span className={className}>
      {calendar} <span className="opacity-70">({formatClock(since, end)})</span>
    </span>
  );
}
