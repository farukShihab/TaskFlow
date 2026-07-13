"use client";

import * as React from "react";
import { Input as UIInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof UIInput> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-zinc-200">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              {leftIcon}
            </div>
          )}

          <UIInput
            ref={ref}
            className={cn(
              "h-11 rounded-xl border-white/10 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-zinc-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";