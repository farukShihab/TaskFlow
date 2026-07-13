import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const surfaceVariants = cva(
  [
    "rounded-2xl",
    "border",
    "border-white/10",
    "bg-zinc-900/80",
    "backdrop-blur-xl",
    "shadow-lg",
    "transition-all",
    "duration-200",
  ],
  {
    variants: {
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-5",
        lg: "p-6",
      },
      hover: {
        true: "hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl",
        false: "",
      },
    },
    defaultVariants: {
      padding: "lg",
      hover: false,
    },
  }
);

export interface SurfaceProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceVariants> {}

export function Surface({
  className,
  padding,
  hover,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(surfaceVariants({ padding, hover }), className)}
      {...props}
    />
  );
}