export type ThemeKey = "nocturne" | "phosphor" | "pink" | "red";

export interface ThemeDef {
  glow: string;
  bright: string;
  dim: string;
  rgb: string;
  star: string;
  bg: string;
  accent: string;
}

export const DEFAULT_THEME: ThemeKey = "nocturne";

export const THEMES: Record<ThemeKey, ThemeDef> = {
  nocturne: {
    glow: "#9184d9",
    bright: "#b5abfc",
    dim: "#5d5294",
    rgb: "145,132,217",
    star: "178,171,252",
    bg: "radial-gradient(1200px 800px at 70% -10%, #1d2036 0%, #131522 55%, #0e0f18 100%)",
    accent: "#7ee0a8",
  },
  phosphor: {
    glow: "#4fd6a8",
    bright: "#93f0cf",
    dim: "#2c7d63",
    rgb: "79,214,168",
    star: "147,240,207",
    bg: "radial-gradient(1200px 800px at 70% -10%, #10251d 0%, #0a1712 55%, #060f0b 100%)",
    accent: "#f2c14e",
  },
  pink: {
    glow: "#d968b0",
    bright: "#f5abd8",
    dim: "#7d3a63",
    rgb: "217,104,176",
    star: "245,171,216",
    bg: "radial-gradient(1200px 800px at 70% -10%, #2a1521 0%, #170d16 55%, #0e0a0d 100%)",
    accent: "#6fe3d9",
  },
  red: {
    glow: "#e0615a",
    bright: "#f39690",
    dim: "#8a332e",
    rgb: "224,97,90",
    star: "243,150,144",
    bg: "radial-gradient(1200px 800px at 70% -10%, #2a1613 0%, #170c0a 55%, #0e0706 100%)",
    accent: "#6fb3f2",
  },
};
