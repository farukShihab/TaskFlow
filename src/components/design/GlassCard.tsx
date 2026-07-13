import { cn } from "@/lib/utils";
import { Surface, SurfaceProps } from "./primitives/Surface";

export function GlassCard({
  className,
  ...props
}: SurfaceProps) {
  return (
    <Surface
      className={cn(
        "bg-white/5 border-white/10 backdrop-blur-2xl shadow-2xl",
        className
      )}
      {...props}
    />
  );
}