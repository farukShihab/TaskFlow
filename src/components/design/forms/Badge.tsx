"use client";

import * as React from "react";
import {
  Badge as UIBadge,
  type BadgeProps as UIBadgeProps,
} from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface BadgeProps
  extends Omit<UIBadgeProps, "variant"> {
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "neutral";
}

const badgeVariants = {
  primary:
    "bg-violet-600/20 text-violet-300 border border-violet-500/20",

  secondary:
    "bg-blue-600/20 text-blue-300 border border-blue-500/20",

  success:
    "bg-emerald-600/20 text-emerald-300 border border-emerald-500/20",

  warning:
    "bg-amber-600/20 text-amber-300 border border-amber-500/20",

  danger:
    "bg-red-600/20 text-red-300 border border-red-500/20",

  neutral:
    "bg-zinc-800 text-zinc-300 border border-white/10",
};

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  return (
    <UIBadge
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </UIBadge>
  );
}