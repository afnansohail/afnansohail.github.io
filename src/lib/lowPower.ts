const STORAGE_KEY = "terminal-portfolio:low-power";

const storedValue =
  typeof window !== "undefined"
    ? window.localStorage.getItem(STORAGE_KEY)
    : null;

let enabled: boolean | null =
  storedValue === "1" ? true : storedValue === "0" ? false : null;

export function getLowPowerPreference() {
  return enabled;
}

export function isLowPowerEnabled() {
  return enabled === true;
}

export function setLowPowerEnabled(next: boolean) {
  enabled = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  }
}
