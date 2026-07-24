import type { CSSProperties, MouseEvent } from "react";
import { content } from "@/content";

interface ResumeLinkProps {
  label: string;
  style: CSSProperties;
  stopPropagation?: boolean;
}

export default function ResumeLink({
  label,
  style,
  stopPropagation,
}: ResumeLinkProps) {
  const handleClick = stopPropagation
    ? (e: MouseEvent<HTMLAnchorElement>) => e.stopPropagation()
    : undefined;

  return (
    <a
      href={encodeURI(content.resumeHref)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="tp-pill"
      style={{
        textDecoration: "none",
        color: "var(--glow-bright)",
        border: "1px solid var(--glow-dim)",
        ...style,
      }}
    >
      {label}
    </a>
  );
}
