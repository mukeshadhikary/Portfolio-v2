"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Wrench, FolderOpen, Mail } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Home,
  User,
  Wrench,
  Folder: FolderOpen,
  Mail,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-black/90 backdrop-blur-xl shadow-[0_5px_30px_rgba(0,255,255,0.2)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl sm:text-2xl font-black bg-linear-to-r from-cyan-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
                {siteConfig.name.split(" ")[0].toUpperCase()}
              </span>
              <motion.div
                className="absolute -inset-2 bg-linear-to-r from-cyan-400/20 to-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 bg-black/30 backdrop-blur-md rounded-full p-1 border border-cyan-500/20">
              {navLinks.map((link) => {
                const Icon = iconMap[link.icon];
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                      isActive
                        ? "bg-linear-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_20px_rgba(0,255,255,0.5)]"
                        : "text-white hover:bg-white/10"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{link.label}</span>
                  </motion.a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-cyan-500/30"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-cyan-400" />
              ) : (
                <Menu className="w-6 h-6 text-cyan-400" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Gradient border */}
        <div
          className={cn(
            "h-0.5 transition-opacity duration-500",
            isScrolled ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: "linear-gradient(90deg, #00ffff, #ff00ff, #ffff00)",
          }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <div className="bg-black/95 backdrop-blur-xl border-b border-cyan-500/30 p-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => {
                  const Icon = iconMap[link.icon];
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-semibold transition-all",
                        isActive
                          ? "bg-linear-to-r from-cyan-400 to-blue-500 text-black"
                          : "text-white hover:bg-white/10"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
