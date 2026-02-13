import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RetroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export function RetroButton({ children, className, variant = "primary", ...props }: RetroButtonProps) {
  const variants = {
    primary: "bg-[#DCAE96] border-[#bd8b72] text-[#5e4134]",
    secondary: "bg-[#9CAF88] border-[#7d8f69] text-[#2d3b25]",
    danger: "bg-[#ff6b6b] border-[#d64545] text-white",
  };

  return (
    <button
      className={cn(
        "px-6 py-2 font-display text-xs uppercase tracking-widest transition-all duration-75",
        "border-b-4 border-r-4 border-t-2 border-l-2 active:border-b-2 active:border-r-2 active:translate-y-1 active:translate-x-1",
        "shadow-lg hover:-translate-y-0.5",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
