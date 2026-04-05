"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Server, Database, Zap, TrendingUp } from "lucide-react"

const stats = [
  { label: "Users Impacted", value: 600, suffix: "+" },
  { label: "Data Pipelines", value: 10, suffix: "+" },
  { label: "Production Systems", value: 5, suffix: "+" },
  { label: "Months Experience", value: 18, suffix: "+" },
]

const focusAreas = [
  {
    icon: Server,
    title: "Backend Engineering",
    description:
      "Building robust RESTful APIs, microservices, and backend systems using Node.js, Python, and C#/.NET with focus on clean architecture and design patterns.",
  },
  {
    icon: Database,
    title: "Data Pipelines",
    description:
      "Designing and optimizing ETL pipelines for large-scale datasets using SQL, Spark, and orchestration tools like Azkaban with production reliability.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Implementing caching strategies with Redis, query optimization, rate limiting, and concurrent processing to handle high request volumes efficiently.",
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold text-primary text-glow-purple">
      {count}
      {suffix}
    </span>
  )
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            I&apos;m a Full Stack Developer with a passion for building scalable backend systems and
            efficient data pipelines. Currently working at ZS Associates, I focus on creating
            production-ready solutions that handle real-world scale and complexity. My expertise spans
            from designing RESTful APIs to optimizing ETL workflows and implementing caching strategies
            that improve system performance.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:glow-purple transition-all duration-300"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Focus Areas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-10">
            Focus <span className="text-secondary">Areas</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                className="group glass rounded-2xl p-8 hover:glow-blue transition-all duration-300 cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors">
                  <area.icon className="w-7 h-7 text-secondary" />
                </div>
                <h4 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {area.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Highlight Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="glass-strong rounded-full px-6 py-3 flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              Focused on building systems that scale and deliver real impact
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
