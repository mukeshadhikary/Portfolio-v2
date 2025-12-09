"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: "default" | "glass";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={cn(
          "relative p-6 rounded-2xl backdrop-blur-md transition-all duration-300",
          {
            "bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 hover:shadow-[0_20px_40px_rgba(0,255,255,0.3)]":
              variant === "default",
            "bg-black/20 border border-white/10 hover:border-cyan-500/50":
              variant === "glass",
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export { Card };
