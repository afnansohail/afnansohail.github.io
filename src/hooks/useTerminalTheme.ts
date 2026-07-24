import { useEffect, useState, type RefObject } from "react";
import {
  THEMES,
  DEFAULT_THEME,
  type ThemeKey,
} from "@/components/terminal/themes";

export function useTerminalTheme(rootRef: RefObject<HTMLDivElement | null>) {
  const [theme, setTheme] = useState<ThemeKey>(DEFAULT_THEME);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const t = THEMES[theme];
    el.style.setProperty("--glow", t.glow);
    el.style.setProperty("--glow-bright", t.bright);
    el.style.setProperty("--glow-dim", t.dim);
    el.style.setProperty("--glow-rgb", t.rgb);
    el.style.setProperty("--line", `rgba(${t.rgb},.20)`);
    el.style.setProperty("--accent", t.accent);
    el.style.background = t.bg;
    window.dispatchEvent(new Event("themechange"));
  }, [theme, rootRef]);

  return [theme, setTheme] as const;
}
