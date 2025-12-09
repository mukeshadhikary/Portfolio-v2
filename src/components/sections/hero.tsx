"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Sparkles, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stats } from "@/lib/constants";

export function HeroSection() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Profile Image with animated rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative inline-block mb-8"
          >
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-full border-2 border-dashed border-purple-500/30"
            />
            {/* Middle rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full"
              style={{
                background: "linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff)",
                padding: "2px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            {/* Profile image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.5)]"
            >
              <Image
                src="https://github.com/mukeshadhikary.png"
                alt="Mukesh Adhikari"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            {/* Floating sparkle */}
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4">
              <span className="bg-linear-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
                MUKESH ADHIKARI
              </span>
            </h1>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl text-white/80 font-light mb-6"
            >
              Software Developer & E-commerce Innovator
            </motion.h2>
          </motion.div>

          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <MapPin className="w-5 h-5 text-cyan-400" />
            <span className="text-white/70">Tokyo, Japan</span>
            <span className="text-white/40">•</span>
            <Briefcase className="w-5 h-5 text-purple-400" />
            <span className="text-white/70">Available for hire</span>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10"
          >
            {[
              { icon: "💻", label: "Full-Stack Developer" },
              { icon: "🚀", label: "E-commerce Innovator" },
              { icon: "🌏", label: "Global Perspective" },
            ].map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm"
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-sm sm:text-base font-medium text-white/90">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mb-10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-black/30 border border-cyan-500/20 rounded-xl backdrop-blur-sm"
              >
                <motion.span
                  className="block text-2xl sm:text-3xl font-black text-cyan-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-xs sm:text-sm text-white/60">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => handleScrollTo("contact")}
            >
              Get In Touch
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleScrollTo("projects")}
            >
              View Projects
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.button
              onClick={() => handleScrollTo("about")}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-400/10 transition-colors"
            >
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
