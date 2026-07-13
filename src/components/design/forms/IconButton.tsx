"use client";

import * as React from "react";
import { Button, ButtonProps } from "./Button";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends Omit<ButtonProps, "size"> {
  "aria-label": string;
}

export function IconButton({
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <Button
      size="icon"
      className={cn(
        "rounded-xl transition-all duration-200 hover:scale-105 active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}