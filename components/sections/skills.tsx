"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Server, Database, Layout, Settings, X } from "lucide-react"

type Skill = {
  name: string
  description: string
}

type SkillCategory = {
  title: string
  icon: typeof Server
  color: "primary" | "secondary"
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Backend & APIs",
    icon: Server,
    color: "primary",
    skills: [
      { name: "Node.js", description: "Building RESTful APIs and backend services with Express.js" },
      { name: "Python", description: "Data processing, automation workflows, and ETL pipelines" },
      { name: "C# / .NET", description: "Enterprise APIs with ASP.NET following microservice patterns" },
      { name: "Express.js", description: "Fast, unopinionated web framework for Node.js applications" },
      { name: "REST APIs", description: "Designing scalable APIs with proper versioning and documentation" },
    ],
  },
  {
    title: "Data Engineering",
    icon: Database,
    color: "secondary",
    skills: [
      { name: "PostgreSQL", description: "Complex queries, indexing, and database optimization" },
      { name: "MongoDB", description: "Document-based storage for flexible data models" },
      { name: "Redis", description: "Caching, rate limiting, deduplication with TTL strategies" },
      { name: "SQL", description: "Advanced queries, joins, and performance optimization" },
      { name: "Spark", description: "Large-scale data processing and analytics" },
      { name: "ETL Pipelines", description: "Data transformation workflows with Azkaban orchestration" },
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    color: "primary",
    skills: [
      { name: "React.js", description: "Building interactive UIs with hooks and modern patterns" },
      { name: "Next.js", description: "Full-stack React framework with SSR and API routes" },
      { name: "TypeScript", description: "Type-safe JavaScript for maintainable codebases" },
      { name: "JavaScript", description: "ES6+ features, async programming, and DOM manipulation" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Settings,
    color: "secondary",
    skills: [
      { name: "AWS S3", description: "Object storage for files and static assets" },
      { name: "AWS Glue", description: "Serverless ETL service for data preparation" },
      { name: "Docker", description: "Containerization for consistent development and deployment" },
      { name: "Git", description: "Version control, branching strategies, and collaboration" },
      { name: "Jenkins", description: "CI/CD pipelines for automated testing and deployment" },
      { name: "Prisma", description: "Type-safe ORM for database access in Node.js" },
    ],
  },
]

function SkillCard({
  category,
  onSkillClick,
}: {
  category: SkillCategory
  onSkillClick: (skill: Skill) => void
}) {
  const Icon = category.icon
  const colorClasses =
    category.color === "primary"
      ? { bg: "bg-primary/20", hover: "hover:bg-primary/30", text: "text-primary", glow: "hover:glow-purple" }
      : { bg: "bg-secondary/20", hover: "hover:bg-secondary/30", text: "text-secondary", glow: "hover:glow-blue" }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`glass rounded-2xl p-6 ${colorClasses.glow} transition-all duration-300`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-12 h-12 rounded-xl ${colorClasses.bg} flex items-center justify-center`}
        >
          <Icon className={`w-6 h-6 ${colorClasses.text}`} />
        </div>
        <h3 className="text-xl font-semibold">{category.title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <motion.button
            key={skill.name}
            onClick={() => onSkillClick(skill)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-lg ${colorClasses.bg} ${colorClasses.hover} ${colorClasses.text} text-sm font-medium transition-all duration-200 cursor-pointer`}
          >
            {skill.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

function SkillModal({ skill, onClose }: { skill: Skill | null; onClose: () => void }) {
  if (!skill) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="glass-strong rounded-2xl p-8 max-w-md w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <h3 className="text-2xl font-bold text-primary mb-4">{skill.name}</h3>
          <p className="text-muted-foreground leading-relaxed">{skill.description}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click on any skill to learn more about my real-world experience with it
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillCard category={category} onSkillClick={setSelectedSkill} />
            </motion.div>
          ))}
        </div>
      </div>

      <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
    </section>
  )
}
