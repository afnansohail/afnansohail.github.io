import React, { useRef } from "react";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={divRef}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
