"use client";

import * as React from "react";
import { Textarea as UITextarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.ComponentPropsWithoutRef<typeof UITextarea> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ label, helperText, error, className, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-zinc-200">
          {label}
        </label>
      )}

      <UITextarea
        ref={ref}
        className={cn(
          "min-h-28 rounded-xl border-white/10 bg-zinc-900 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        {...props}
      />

      {error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : helperText ? (
        <p className="text-sm text-zinc-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Textarea.displayName = "Textarea";