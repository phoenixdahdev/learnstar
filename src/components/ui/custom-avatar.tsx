import Image from "next/image";
import type React from "react";
import { cn } from "@/utils";

interface CustomAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string;
  size?: "sm" | "md" | "lg";
  src?: string;
  width?: number;
  height?: number;
}

export function CustomAvatar({
  initials,
  size = "md",
  src,
  className,
  width = 40,
  height = 40,
  ...props
}: CustomAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground relative flex items-center justify-center rounded-full font-semibold",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={initials}
          className="h-full w-full rounded-full object-cover"
          width={width}
          height={height}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
