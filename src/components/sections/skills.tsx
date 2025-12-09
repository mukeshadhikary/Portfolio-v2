"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { skills } from "@/lib/constants";

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-20 sm:py-32 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cyan-400 mb-4">
            TECHNICAL ARSENAL
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and high-performance applications
          </p>
          <div className="w-24 h-1 mx-auto mt-4 bg-linear-to-r from-cyan-400 via-purple-500 to-yellow-400 rounded-full" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full text-center group">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl mb-4"
                >
                  {skill.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {skill.title}
                </h3>
                <p className="text-white/60 text-sm">{skill.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 overflow-hidden"
        >
          <div className="relative">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-[#0a0a0a] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[#0a0a0a] to-transparent z-10" />
            
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-8"
            >
              {[
                "React", "Next.js", "TypeScript", "Node.js", "Python", "Go",
                "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Kubernetes",
                "GraphQL", "Tailwind", "Prisma", "Supabase",
                "React", "Next.js", "TypeScript", "Node.js", "Python", "Go",
                "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Kubernetes",
              ].map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="px-6 py-3 bg-white/5 border border-cyan-500/20 rounded-full text-white/70 whitespace-nowrap font-medium"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
