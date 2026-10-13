// This is file of your component
// You can use any dependencies from npm; we import them automatically in package.json

import { cn } from "@/lib/utils";
import React, { useState } from "react";

export interface DemoProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Component = ({ children, className, style }: DemoProps) => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("min-h-screen w-full relative bg-white", className)} style={style}>
      {/* Teal Glow Right */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top right,
              rgba(56, 193, 182, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Your Content/Components */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default Component;
