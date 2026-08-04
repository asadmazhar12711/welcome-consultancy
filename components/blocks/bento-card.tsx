import React from "react";

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
}

export function BentoCard({ children, className = "", colSpan = 1, rowSpan = 1, ...props }: BentoCardProps) {
  return (
    <div
      className={`bento-card shadow-theme-md md:col-span-${colSpan} md:row-span-${rowSpan} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
