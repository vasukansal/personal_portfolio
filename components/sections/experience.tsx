"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion"
import { Building2, Calendar, ChevronRight, TrendingUp } from "lucide-react"

type Experience = {
  company: string
  role: string
  duration: string
  location: string
  highlights: string[]
  metrics: { label: string; value: string }[]
}

const experiences: Experience[] = [
  {
    company: "ZS Associates",
    role: "Business Technology and Solutions Associate",
    duration: "Aug 2025 – Present",
    location: "Pune",
    highlights: [
      "Built automation workflows using Python & SQL for data validation, transformation, and reporting",
      "Designed and maintained data pipelines handling large-scale datasets with production reliability",
      "Automated report generation and email delivery for 600+ users, reducing operational dependency",
      "Optimized data workflows by identifying bottlenecks and improving query efficiency",
      "Resolved production issues via root cause analysis, improving system stability",
    ],
    metrics: [
      { label: "Users Impacted", value: "600+" },
      { label: "Pipeline Scale", value: "Large-scale" },
    ],
  },
  {
    company: "ZS Associates",
    role: "Business Technology and Solutions Associate Intern",
    duration: "Feb 2025 – Jul 2025",
    location: "Pune",
    highlights: [
      "Analyzed large datasets using SQL, Python, and Spark to generate actionable insights",
      "Built and optimized ETL pipelines using Azkaban for workflow orchestration",
      "Monitored distributed systems and validated data pipelines for production stability",
    ],
    metrics: [
      { label: "Tech Stack", value: "SQL, Python, Spark" },
      { label: "Orchestration", value: "Azkaban" },
    ],
  },
  {
    company: "Barclays",
    role: "Technical Intern",
    duration: "Jun 2024 – Jul 2024",
    location: "Pune",
    highlights: [
      "Developed RESTful APIs using C#, .NET, and ASP.NET with microservice-style architecture",
      "Implemented caching using Entity Framework with concurrency handling",
      "Applied design patterns (Facade, Factory, Singleton) for modular and maintainable services",
      "Collaborated in agile environment using Jira and Confluence for sprint-based delivery",
    ],
    metrics: [
      { label: "Architecture", value: "Microservices" },
      { label: "Patterns", value: "Factory, Facade, Singleton" },
    ],
  },
]

function TimelineItem({ experience, index }: { experience: Experience; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 mb-12 last:mb-0"
    >
      {/* Timeline line - individual segment */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border/30 md:-translate-x-1/2" />

      {/* Static marker dot - smaller, muted */}
      <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-muted-foreground/30 border border-border md:-translate-x-1/2 -translate-x-1/2" />

      {/* Content - alternating sides on desktop */}
      <div className={`${index % 2 === 0 ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}`}>
        <div className="glass rounded-2xl p-6 hover:glow-purple transition-all duration-300">
          <div className="flex items-center gap-2 mb-2 md:justify-start">
            {index % 2 === 0 ? (
              <>
                <Building2 className="w-5 h-5 text-primary md:order-2" />
                <span className="font-semibold text-lg text-foreground">{experience.company}</span>
              </>
            ) : (
              <>
                <Building2 className="w-5 h-5 text-primary" />
                <span className="font-semibold text-lg text-foreground">{experience.company}</span>
              </>
            )}
          </div>

          <p className="text-primary font-medium mb-2">{experience.role}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 flex-wrap md:justify-start">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {experience.duration}
            </span>
            <span>{experience.location}</span>
          </div>

          {/* Metrics */}
          <div className="flex flex-wrap gap-2 mb-4 md:justify-start">
            {experience.metrics.map((metric) => (
              <div
                key={metric.label}
                className="px-3 py-1 rounded-lg bg-primary/10 text-xs"
              >
                <span className="text-muted-foreground">{metric.label}: </span>
                <span className="text-primary font-medium">{metric.value}</span>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <ul className="space-y-2">
            {experience.highlights.map((highlight, i) => (
              <li
                key={i}
                className={`flex items-start gap-2 text-sm text-muted-foreground ${index % 2 === 0 ? "md:justify-end md:text-right" : ""
                  }`}
              >
                {index % 2 === 0 ? (
                  <>
                    <span>{highlight}</span>
                    <ChevronRight className="w-4 h-4 text-secondary mt-0.5 shrink-0 md:order-first md:rotate-180" />
                  </>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <span>{highlight}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Empty space for alternating layout */}
      {index % 2 === 0 ? (
        <div className="hidden md:block" />
      ) : (
        <div className="hidden md:block md:col-start-1 md:row-start-1" />
      )}
    </motion.div>
  )
}

function ScrollingDot({
  top,
  scale,
  opacity
}: {
  top: MotionValue<string>
  scale: MotionValue<number>
  opacity: MotionValue<number>
}) {
  return (
    <motion.div
      style={{ top, scale, opacity }}
      className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-primary glow-purple md:-translate-x-1/2 -translate-x-1/2 z-10 pointer-events-none"
    >
      {/* Inner glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/50"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  )
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Scroll tracking for the animated dot - must be in same component as ref
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  })

  // Transform scroll progress to vertical position (0% to 100%)
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Scale the dot based on scroll - larger in middle, smaller at edges
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])

  // Opacity based on scroll position
  const dotOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5])

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Work <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Building production systems and solving real-world engineering challenges
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Main timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-primary/50 md:-translate-x-1/2" />

          {/* Scrolling animated dot */}
          <ScrollingDot top={dotTop} scale={dotScale} opacity={dotOpacity} />

          {experiences.map((exp, index) => (
            <TimelineItem key={`${exp.company}-${exp.role}`} experience={exp} index={index} />
          ))}
        </div>

        {/* Education Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="glass-strong rounded-2xl p-6 max-w-md text-center">
            <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Education</h4>
            <p className="text-muted-foreground text-sm">
              University of Petroleum and Energy Studies
            </p>
            <p className="text-primary text-sm font-medium">
              B.Tech (Hons.) - Computer Science, DevOps Specialization
            </p>
            <p className="text-muted-foreground text-xs mt-1">CGPA: 7.96 | 2021 – 2025</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
