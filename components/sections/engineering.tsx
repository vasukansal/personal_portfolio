"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Brain, Database, Shield, Layers, ChevronDown, ChevronUp, Zap, GitBranch, Clock, Server } from "lucide-react"
import { Button } from "@/components/ui/button"

type Concept = {
  id: string
  title: string
  icon: typeof Brain
  color: "primary" | "secondary"
  simpleView: string
  detailedView: {
    description: string
    techniques: string[]
    realWorldExample: string
  }
}

const concepts: Concept[] = [
  {
    id: "caching",
    title: "Caching Strategies",
    icon: Zap,
    color: "primary",
    simpleView: "Store frequently accessed data in fast storage to reduce database load and improve response times.",
    detailedView: {
      description:
        "Caching is about keeping hot data close to where it's needed. I implement multi-layer caching with Redis for distributed caching and in-memory caching for single-instance scenarios.",
      techniques: [
        "Cache-aside pattern with TTL-based invalidation",
        "Write-through caching for consistency-critical data",
        "Cache warming for predictable access patterns",
        "Distributed caching with Redis clusters",
      ],
      realWorldExample:
        "In Echo, I implemented Redis caching with rate limiting to handle high request volumes. For Khabri, I used Redis-based deduplication with 7-day TTL to prevent redundant processing of already-analyzed posts.",
    },
  },
  {
    id: "rate-limiting",
    title: "Rate Limiting",
    icon: Shield,
    color: "secondary",
    simpleView: "Control request rates to protect systems from abuse and ensure fair resource distribution.",
    detailedView: {
      description:
        "Rate limiting protects services from abuse and ensures fair usage. I implement token bucket and sliding window algorithms based on use case requirements.",
      techniques: [
        "Token bucket for bursty traffic tolerance",
        "Sliding window for precise rate control",
        "Distributed rate limiting with Redis",
        "Per-user and per-endpoint granularity",
      ],
      realWorldExample:
        "In Echo, I implemented Redis-based rate limiting to prevent spam and abuse on the anonymous posting platform. The system handles high request volumes while maintaining platform integrity.",
    },
  },
  {
    id: "data-pipelines",
    title: "Data Pipelines",
    icon: GitBranch,
    color: "primary",
    simpleView: "Transform and move data between systems reliably, ensuring correctness and handling failures gracefully.",
    detailedView: {
      description:
        "Data pipelines are the backbone of modern data systems. I design ETL workflows with idempotency, proper error handling, and monitoring to ensure data consistency.",
      techniques: [
        "Idempotent operations for safe retries",
        "Dead letter queues for failed messages",
        "Checkpoint-based recovery",
        "Schema validation at ingestion",
      ],
      realWorldExample:
        "At ZS Associates, I built and optimized ETL pipelines using Azkaban for workflow orchestration. These pipelines handle large-scale datasets with production reliability, including automated validation and error handling.",
    },
  },
  {
    id: "scalability",
    title: "Scalability Patterns",
    icon: Layers,
    color: "secondary",
    simpleView: "Design systems that grow with demand through horizontal scaling, load balancing, and efficient resource usage.",
    detailedView: {
      description:
        "Scalability is about designing systems that handle growth gracefully. I focus on stateless services, database sharding strategies, and async processing for non-critical paths.",
      techniques: [
        "Horizontal scaling with stateless services",
        "Database read replicas for query distribution",
        "Message queues for async processing",
        "Connection pooling and resource management",
      ],
      realWorldExample:
        "In Khabri, I designed concurrent processing pipelines to handle scanning 100+ posts every 30 minutes across 40+ subreddits. The system uses efficient batch processing and parallel execution for scalable data ingestion.",
    },
  },
]

function ConceptCard({ concept }: { concept: Concept }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = concept.icon
  const colorClasses =
    concept.color === "primary"
      ? { bg: "bg-primary/20", text: "text-primary", glow: "hover:glow-purple" }
      : { bg: "bg-secondary/20", text: "text-secondary", glow: "hover:glow-blue" }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`glass rounded-2xl overflow-hidden ${colorClasses.glow} transition-all duration-300`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl ${colorClasses.bg} flex items-center justify-center shrink-0`}>
            <Icon className={`w-6 h-6 ${colorClasses.text}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{concept.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{concept.simpleView}</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full justify-center ${colorClasses.text}`}
        >
          {isExpanded ? (
            <>
              <span>Simple View</span>
              <ChevronUp className="ml-2 w-4 h-4" />
            </>
          ) : (
            <>
              <span>Detailed View</span>
              <ChevronDown className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-border">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {concept.detailedView.description}
              </p>

              <h4 className={`font-semibold mb-2 ${colorClasses.text}`}>Techniques I Use:</h4>
              <ul className="space-y-1 mb-4">
                {concept.detailedView.techniques.map((technique, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className={`${colorClasses.text}`}>•</span>
                    {technique}
                  </li>
                ))}
              </ul>

              <h4 className={`font-semibold mb-2 ${colorClasses.text}`}>Real-World Application:</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {concept.detailedView.realWorldExample}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function EngineeringPrinciples() {
  const principles = [
    { icon: Clock, label: "Reliability First", description: "Systems should work correctly under all conditions" },
    { icon: Server, label: "Scalable by Design", description: "Architecture that grows with demand" },
    { icon: Database, label: "Data Integrity", description: "Correctness of data is non-negotiable" },
    { icon: Zap, label: "Performance Aware", description: "Optimize for the common case" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-strong rounded-2xl p-6 mb-12"
    >
      <h3 className="text-xl font-semibold text-center mb-6">My Engineering Principles</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {principles.map((principle, index) => (
          <motion.div
            key={principle.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-4 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <principle.icon className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="font-medium text-sm mb-1">{principle.label}</p>
            <p className="text-xs text-muted-foreground">{principle.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function Engineering() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="engineering" ref={sectionRef} className="relative py-24 sm:py-32 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Brain className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            How I <span className="text-primary">Think</span> as an Engineer
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Core concepts and patterns I apply when designing and building systems.
            Toggle between simple and detailed views.
          </p>
        </motion.div>

        <EngineeringPrinciples />

        <div className="grid md:grid-cols-2 gap-6">
          {concepts.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}
        </div>
      </div>
    </section>
  )
}
