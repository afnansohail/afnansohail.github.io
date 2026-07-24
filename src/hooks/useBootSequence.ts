import { useEffect, useState } from "react";
import { content, options } from "@/content";

const BOOT_SESSION_KEY = "terminal-portfolio:booted";

function hasBootedThisSession() {
  return window.sessionStorage.getItem(BOOT_SESSION_KEY) === "1";
}

export function useBootSequence() {
  const sessionBooted = hasBootedThisSession();
  const [booting, setBooting] = useState(() => !sessionBooted);
  const [lineIdx, setLineIdx] = useState(() =>
    sessionBooted ? content.bootLines.length : 0,
  );
  const [progress, setProgress] = useState(() => (sessionBooted ? 100 : 0));
  const [ready, setReady] = useState(() => sessionBooted);

  useEffect(() => {
    if (hasBootedThisSession()) return;
    const speed = Math.max(60, Math.min(600, options.bootSpeedMs));
    const total = content.bootLines.length;
    if (total === 0) {
      setLineIdx(0);
      setProgress(100);
      setBooting(false);
      setReady(true);
      window.sessionStorage.setItem(BOOT_SESSION_KEY, "1");
      return;
    }

    let count = 0;
    let bootTimeout: number | null = null;
    const timer = window.setInterval(() => {
      count += 1;
      setLineIdx(count);
      setProgress(Math.min(100, Math.round((count / total) * 100)));
      if (count >= total) {
        window.clearInterval(timer);
        bootTimeout = window.setTimeout(() => {
          setBooting(false);
          setReady(true);
          window.sessionStorage.setItem(BOOT_SESSION_KEY, "1");
        }, 650);
      }
    }, speed);
    return () => {
      window.clearInterval(timer);
      if (bootTimeout !== null) window.clearTimeout(bootTimeout);
    };
  }, []);

  return { booting, lineIdx, progress, ready };
}
