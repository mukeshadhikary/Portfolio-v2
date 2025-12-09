"use client";

import { cn } from "@/lib/utils";
import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = "text", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-bold text-cyan-400">
            {label}
            {props.required && <span className="text-pink-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-xl text-white placeholder:text-white/50",
            "focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.5)]",
            "transition-all duration-300",
            error && "border-pink-500 focus:border-pink-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-pink-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
