import type React from "react";
import { useState } from "react";
import { cn } from "@/utils";

interface CustomTooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export function CustomTooltip({
  content,
  children,
  side = "right",
  className = "",
}: CustomTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
  };

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-10 rounded-md bg-gray-900 px-2 py-1 text-sm font-medium text-white shadow-xs",
            positionClasses[side]
          )}
        >
          {content}
          <div
            className={cn(
              "absolute h-2 w-2 rotate-45 transform bg-gray-900",
              side === "top" && "bottom-[-4px] left-1/2 -translate-x-1/2",
              side === "right" && "top-1/2 left-[-4px] -translate-y-1/2",
              side === "bottom" && "top-[-4px] left-1/2 -translate-x-1/2",
              side === "left" && "top-1/2 right-[-4px] -translate-y-1/2"
            )}
          />
        </div>
      )}
    </div>
  );
}
