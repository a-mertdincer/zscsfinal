"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20",
  ghost: "bg-transparent hover:bg-slate-800/60 text-slate-200",
  outline: "border border-slate-700 hover:bg-slate-800/60 text-slate-200",
  secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200",
  danger: "bg-rose-600 hover:bg-rose-500 text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
