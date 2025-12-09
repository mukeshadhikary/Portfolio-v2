"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Rocket, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/constants";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cyan-400 mb-4">
            FEATURED PROJECTS
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Transforming ideas into impactful digital solutions
          </p>
          <div className="w-24 h-1 mx-auto mt-4 bg-linear-to-r from-cyan-400 via-purple-500 to-yellow-400 rounded-full" />
        </motion.div>

        {/* Main Project Showcase */}
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            <div className="relative p-8 sm:p-12 bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-3xl backdrop-blur-md overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                {/* Project Header */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="p-4 bg-linear-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl border border-cyan-500/30"
                  >
                    <Rocket className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                      {project.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 px-3 py-1 mt-2 text-sm bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-white/80 mb-8 max-w-3xl">
                  {project.description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {project.features.map((feature, fIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: fIndex * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                      <span className="text-white/70">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white/5 border border-cyan-500/20 rounded-full text-sm font-medium text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <span className="flex items-center gap-2">
                      Collaborate With Me
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      View Code
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* More Projects Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/50 text-lg">
            More exciting projects coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
