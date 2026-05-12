import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "emerald" | "sky" | "amber" | "violet" | "rose" | "slate";
}

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-slate-800 text-slate-200 border-slate-700",
  emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  sky: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  violet: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  rose: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  slate: "bg-slate-800/60 text-slate-300 border-slate-700",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
