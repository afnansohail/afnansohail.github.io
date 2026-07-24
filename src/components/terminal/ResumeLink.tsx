import type { MouseEvent } from "react";
import { content } from "@/content";

interface ResumeLinkProps {
  label: string;
  className?: string;
  stopPropagation?: boolean;
}

export default function ResumeLink({
  label,
  className,
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
      className={`tp-pill no-underline border border-(--glow-dim) text-(--glow-bright) ${className ?? ""}`}
    >
      {label}
    </a>
  );
}
