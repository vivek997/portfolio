"use client";

import { useEffect, useState } from "react";

export default function WebcamPhoto({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 750);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`w-[120px] shrink-0 select-none sm:w-[136px] ${className}`}>
      <div className="terminal-shadow overflow-hidden rounded-lg border border-border bg-panel/90">
        <div className="flex items-center gap-1.5 border-b border-border bg-panel-alt px-2.5 py-1.5">
          <span className="h-2 w-2 rounded-full bg-red/80" />
          <span className="h-2 w-2 rounded-full bg-amber/80" />
          <span className="h-2 w-2 rounded-full bg-green/80" />
          <span className="ml-auto flex items-center gap-1 text-[9px] text-red">
            <span
              className={`h-1.5 w-1.5 rounded-full bg-red transition-opacity ${
                blink ? "opacity-100" : "opacity-25"
              }`}
            />
            REC
          </span>
        </div>
        <div className="relative aspect-square w-full overflow-hidden bg-panel-alt">
          {/* eslint-disable-next-line @next/next/no-img-element -- small local static asset, no next/image needed */}
          <img src={src} alt={alt} className="h-full w-full object-cover" loading="eager" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-green/10 via-transparent to-black/20" />
          <div className="scanlines-local pointer-events-none absolute inset-0" />
        </div>
        <div className="border-t border-border px-2 py-1 text-center font-mono text-[9px] text-muted">
          cam0 :: live
        </div>
      </div>
    </div>
  );
}
