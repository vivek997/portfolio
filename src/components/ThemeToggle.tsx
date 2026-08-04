"use client";

import { useEffect, useState } from "react";
import {
  applyTheme,
  getStoredTheme,
  nextTheme,
  THEME_EVENT,
  THEME_SWATCH,
  type ThemeName,
} from "@/lib/theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>("green");

  useEffect(() => {
    // One-time sync of client-only state (localStorage) after mount. Server
    // and first client render both use the "green" default, so this can't
    // cause a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(getStoredTheme());
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ThemeName>).detail;
      if (detail) setTheme(detail);
    };
    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);

  const cycle = () => applyTheme(nextTheme(theme));

  return (
    <button
      type="button"
      onClick={cycle}
      title={`CRT mode: ${theme} (click to cycle)`}
      aria-label={`Switch CRT color theme, currently ${theme}`}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-border bg-panel/90 px-3 py-2 text-[11px] text-muted shadow-lg backdrop-blur-sm transition-colors hover:border-current"
      style={{ color: THEME_SWATCH[theme] }}
    >
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: THEME_SWATCH[theme], boxShadow: `0 0 8px ${THEME_SWATCH[theme]}` }}
      />
      <span className="font-mono">{theme}</span>
    </button>
  );
}
