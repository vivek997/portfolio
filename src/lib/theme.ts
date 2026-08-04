export type ThemeName = "green" | "amber" | "cyan";

export const THEME_ORDER: ThemeName[] = ["green", "amber", "cyan"];

export const THEME_SWATCH: Record<ThemeName, string> = {
  green: "#39d97a",
  amber: "#f2b84a",
  cyan: "#22d3ee",
};

const STORAGE_KEY = "terminal-theme";
export const THEME_EVENT = "vr-themechange";

export function isThemeName(value: string): value is ThemeName {
  return (THEME_ORDER as string[]).includes(value);
}

export function getStoredTheme(): ThemeName {
  if (typeof window === "undefined") return "green";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && isThemeName(stored) ? stored : "green";
}

export function applyTheme(theme: ThemeName) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(new CustomEvent<ThemeName>(THEME_EVENT, { detail: theme }));
}

export function nextTheme(current: ThemeName): ThemeName {
  const idx = THEME_ORDER.indexOf(current);
  return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
}
