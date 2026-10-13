import { cn } from "@/lib/utils";
import * as React from "react";

export interface BackgroundGradientGlowProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const BackgroundGradientGlow = ({
  children,
  className,
  style,
}: BackgroundGradientGlowProps) => {
  return (
    <div className={cn("min-h-full w-full relative", className)} style={style}>
      {/* Aurora Dream Corner Whispers */}
      <div
        className="absolute inset-0 z-0 pointer-events-none rounded-[inherit]"
        style={{
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          willChange: "transform",
          background: `
            radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
            radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
            radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
            radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
            linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
          `,
        }}
      />
      <div className="relative z-[1] w-full">{children}</div>
    </div>
  );
};

export const Component = BackgroundGradientGlow;
export default BackgroundGradientGlow;
