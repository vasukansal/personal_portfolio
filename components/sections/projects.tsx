"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ChevronRight, X, ArrowRight, Database, Zap, Bell, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

type Project = {
  id: string
  title: string
  tagline: string
  description: string
  problem: string
  architecture: string
  techStack: string[]
  impact: string[]
  featured: boolean
  hasFlowDiagram: boolean
  githubUrl?: string
  liveUrl?: string
}

const projects: Project[] = [
  {
    id: "khabri",
    title: "Khabri",
    tagline: "Real-Time Market Intelligence Agent",
    description:
      "An automated system that scans 100+ posts every 30 minutes across 40+ subreddits to detect real-time market signals and deliver structured alerts.",
    problem:
      "Manual monitoring of social media for market intelligence is time-consuming and prone to missing critical signals. Traders and analysts need automated, filtered, and timely insights.",
    architecture:
      "Multi-stage pipeline: Data ingestion from Reddit via PRAW, relevance scoring using Google Gemini API, Redis-based deduplication with 7-day TTL, and structured Telegram notifications.",
    techStack: ["Python", "Flask", "Google Gemini API", "PRAW", "Redis", "Telegram API", "Railway"],
    impact: [
      "Scans 100+ posts every 30 minutes",
      "Monitors 40+ subreddits in real-time",
      "Relevance scoring threshold of 6/10 filters noise",
      "7-day TTL prevents redundant processing",
    ],
    featured: true,
    hasFlowDiagram: true,
    githubUrl: "https://github.com/vasukansal/Khabri",
  },
  {
    id: "echo",
    title: "Echo",
    tagline: "Anonymous Campus Microblogging Platform",
    description:
      "A campus-exclusive platform enabling anonymous posting and interaction within isolated college communities, with verified onboarding via institutional email domains.",
    problem:
      "Students lack safe spaces for anonymous discussion within their campus community. Existing platforms either lack anonymity or proper verification.",
    architecture:
      "Next.js with TypeScript frontend, PostgreSQL for data persistence, Redis for caching and rate limiting, hashed identity mapping for anonymity preservation.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    impact: [
      "10+ college email domains integrated",
      "Hashed identity mapping preserves anonymity",
      "Redis-based rate limiting prevents abuse",
      "Optimized pagination for scalable feeds",
    ],
    featured: true,
    hasFlowDiagram: false,
  },
]

function FlowDiagram() {
  const steps = [
    { icon: Database, label: "Reddit Data", sublabel: "40+ subreddits" },
    { icon: Zap, label: "Processing", sublabel: "Gemini API scoring" },
    { icon: Shield, label: "Deduplication", sublabel: "Redis with 7-day TTL" },
    { icon: Bell, label: "Telegram Alert", sublabel: "Structured notifications" },
  ]

  return (
    <div className="w-full py-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mb-2 hover:bg-primary/30 transition-colors">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{step.label}</span>
              <span className="text-xs text-muted-foreground">{step.sublabel}</span>
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 + 0.1 }}
                className="hidden md:block mx-4"
              >
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="glass-strong rounded-2xl p-8 max-w-3xl w-full relative my-8 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="mb-6">
            <h3 className="text-3xl font-bold text-primary mb-2">{project.title}</h3>
            <p className="text-xl text-muted-foreground">{project.tagline}</p>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-secondary">Problem Solved</h4>
              <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-secondary">Architecture Overview</h4>
              <p className="text-muted-foreground leading-relaxed">{project.architecture}</p>
            </div>

            {project.hasFlowDiagram && (
              <div>
                <h4 className="text-lg font-semibold mb-2 text-secondary">System Flow</h4>
                <div className="glass rounded-xl p-4">
                  <FlowDiagram />
                </div>
              </div>
            )}

            <div>
              <h4 className="text-lg font-semibold mb-3 text-secondary">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3 text-secondary">Key Impact</h4>
              <ul className="space-y-2">
                {project.impact.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <ChevronRight className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function FeaturedProjectCard({
  project,
  onClick,
}: {
  project: Project
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl p-8 cursor-pointer group hover:glow-purple transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
              Featured
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-lg text-secondary mb-4">{project.tagline}</p>
          <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-secondary/20 text-secondary text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground group-hover:glow-purple">
              View Details
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
            {project.githubUrl && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
                asChild
                onClick={(e) => e.stopPropagation()}
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {project.hasFlowDiagram && (
          <div className="hidden lg:block lg:w-1/3">
            <div className="glass rounded-xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {[Database, Zap, Shield, Bell].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="aspect-square rounded-lg bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.2)" }}
                  >
                    <Icon className="w-8 h-8 text-primary/70" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl p-6 cursor-pointer group hover:glow-blue transition-all duration-300"
      onClick={onClick}
    >
      <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">
        {project.title}
      </h3>
      <p className="text-secondary text-sm mb-3">{project.tagline}</p>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 rounded-md bg-secondary/20 text-secondary text-xs"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center text-sm text-muted-foreground group-hover:text-secondary transition-colors">
        <span>View project</span>
        <ChevronRight className="ml-1 w-4 h-4" />
      </div>
    </motion.div>
  )
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-world projects showcasing backend engineering, data pipelines, and scalable system design
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-12">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-2xl font-semibold mb-8"
            >
              Other <span className="text-secondary">Projects</span>
            </motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
