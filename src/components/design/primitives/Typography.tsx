import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Heading({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-4xl font-bold tracking-tight text-white",
        className
      )}
      {...props}
    />
  );
}

export function Title({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-2xl font-semibold tracking-tight text-white",
        className
      )}
      {...props}
    />
  );
}

export function Subtitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-medium text-zinc-200",
        className
      )}
      {...props}
    />
  );
}

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  muted?: boolean;
}

export function Text({
  muted,
  className,
  ...props
}: TextProps) {
  return (
    <p
      className={cn(
        "text-sm leading-6",
        muted ? "text-zinc-400" : "text-white",
        className
      )}
      {...props}
    />
  );
}

export function Caption({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-xs text-zinc-500",
        className
      )}
      {...props}
    />
  );
}