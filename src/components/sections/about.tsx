"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar, Code2, Rocket } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cyan-400 mb-4">
            ABOUT ME
          </h2>
          <div className="w-24 h-1 mx-auto bg-linear-to-r from-cyan-400 via-purple-500 to-yellow-400 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/80 leading-relaxed"
            >
              I&apos;m <span className="text-cyan-400 font-bold">Mukesh Adhikari</span>, a passionate 
              software developer currently based in the vibrant city of Tokyo, Japan. At 26, I&apos;m 
              on a mission to revolutionize the e-commerce landscape in Nepal through innovative 
              technology solutions.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/80 leading-relaxed"
            >
              My journey in software development has equipped me with cutting-edge skills and a 
              deep understanding of modern web technologies. I specialize in creating robust, 
              scalable applications that drive business growth and enhance user experience.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/80 leading-relaxed"
            >
              Currently, I&apos;m working on an ambitious e-commerce platform project that aims to 
              transform how businesses operate in Nepal. This project combines my technical 
              expertise with my passion for empowering local entrepreneurs and connecting them 
              with global markets.
            </motion.p>

            {/* Quick Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              {[
                { icon: MapPin, label: "Location", value: "Tokyo, Japan" },
                { icon: Calendar, label: "Experience", value: "5+ Years" },
                { icon: Code2, label: "Specialty", value: "Full-Stack" },
                { icon: Rocket, label: "Focus", value: "E-commerce" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-cyan-500/20"
                >
                  <item.icon className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-white/50">{item.label}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative p-8 bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-3xl backdrop-blur-md overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Avatar */}
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(0,255,255,0.5)",
                      "0 0 40px rgba(255,0,255,0.8)",
                      "0 0 20px rgba(0,255,255,0.5)",
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-400"
                >
                  <Image
                    src="https://github.com/mukeshadhikary.png"
                    alt="Mukesh Adhikari"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">Mukesh Adhikari</h3>
                <p className="text-cyan-400 font-medium mb-4">Full-Stack Developer</p>
                
                <div className="flex items-center justify-center gap-2 text-white/60 mb-6">
                  <span>🇳🇵</span>
                  <span>Nepal</span>
                  <span className="text-cyan-400">→</span>
                  <span>🇯🇵</span>
                  <span>Tokyo</span>
                </div>

                {/* Tech Stack Preview */}
                <div className="flex flex-wrap justify-center gap-2">
                  {["React", "Node.js", "TypeScript", "AWS"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-4 -right-4 text-4xl"
            >
              ⚡
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 text-4xl"
            >
              🚀
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
