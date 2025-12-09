"use client";

import { motion } from "framer-motion";
import { Heart, Github, Twitter, Facebook, Mail } from "lucide-react";
import { siteConfig } from "@/lib/constants";

const socialLinks = [
  { icon: Github, href: siteConfig.links.github, label: "GitHub" },
  { icon: Twitter, href: siteConfig.links.twitter, label: "Twitter" },
  { icon: Facebook, href: siteConfig.links.facebook, label: "Facebook" },
  { icon: Mail, href: `mailto:${siteConfig.links.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-cyan-500/30 bg-black/50 backdrop-blur-xl">
      {/* Gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #00ffff, #ff00ff, #ffff00, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-black bg-linear-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
              MUKESH
            </h3>
            <p className="text-white/60 mt-2">
              Building the future, one line of code at a time.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-4"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl bg-white/5 border border-cyan-500/30 text-white/70 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-white/60 flex items-center justify-center md:justify-end gap-2">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
            <p className="text-white/40 text-sm mt-1 flex items-center justify-center md:justify-end gap-1">
              Crafted with <Heart className="w-4 h-4 text-pink-500 animate-pulse" /> in Tokyo, Japan
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
