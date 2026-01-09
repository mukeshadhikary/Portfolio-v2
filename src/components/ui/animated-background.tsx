"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  targetY: number;
}

function createParticles(): Particle[] {
  if (typeof window === "undefined") return [];

  const width = window.innerWidth;
  const height = window.innerHeight;

  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * width,
    y: Math.random() * height,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5,
    targetY: Math.random() * -200 - 100,
  }));
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Only set particles on client after mount to prevent hydration mismatch
  useEffect(() => {
    // Use setTimeout to defer particle generation to after initial render
    const timer = setTimeout(() => {
      setParticles(createParticles());
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      suppressHydrationWarning
    >
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating particles - only render after hydration to avoid mismatch */}
      {particles.length > 0 &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [null, particle.targetY],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          />
        ))}
    </div>
  );
}
