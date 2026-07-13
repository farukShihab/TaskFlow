"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { Button as UIButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof UIButton> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <UIButton
      disabled={disabled || loading}
      className={cn(
        "cursor-pointer transition-all duration-200",
        "active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        leftIcon && (
          <span className="mr-2 flex items-center">
            {leftIcon}
          </span>
        )
      )}

      {children}

      {!loading && rightIcon && (
        <span className="ml-2 flex items-center">
          {rightIcon}
        </span>
      )}
    </UIButton>
  );
}