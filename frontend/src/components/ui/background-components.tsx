import { cn } from "@/lib/utils";
import React, { useState } from "react";

export interface BackgroundComponentProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glow?: "yellow" | "teal" | "both";
}

export const Component = ({
  children,
  className,
  style,
  glow = "both",
}: BackgroundComponentProps) => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("min-h-screen w-full relative bg-white", className)} style={style}>
      {/* Soft Yellow Glow */}
      {(glow === "yellow" || glow === "both") && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(255, 249, 145, 0.6) 0%, transparent 70%)
            `,
            opacity: 0.35,
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* Teal Glow Right */}
      {(glow === "teal" || glow === "both") && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at top right,
                rgba(56, 193, 182, 0.45),
                transparent 70%
              )
            `,
            filter: "blur(80px)",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {/* Your Content/Components */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export const BackgroundComponent = Component;
export default Component;
