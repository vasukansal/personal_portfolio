"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FileText, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Resume() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="resume" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-primary">Resume</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Download my resume for a complete overview of my experience and skills
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-2xl p-8 hover:glow-purple transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Resume Preview Icon */}
            <div className="w-32 h-40 rounded-xl bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center">
              <FileText className="w-16 h-16 text-primary/50" />
            </div>

            {/* Resume Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Vasu Kansal</h3>
              <p className="text-primary font-medium mb-1">Full Stack Developer</p>
              <p className="text-muted-foreground text-sm mb-4">
                Backend Engineering | Data Pipelines | System Design
              </p>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                <span className="px-3 py-1 rounded-lg bg-secondary/20 text-secondary text-xs">
                  B.Tech Computer Science
                </span>
                <span className="px-3 py-1 rounded-lg bg-secondary/20 text-secondary text-xs">
                  DevOps Specialization
                </span>
                <span className="px-3 py-1 rounded-lg bg-secondary/20 text-secondary text-xs">
                  1.5+ Years Experience
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground glow-purple" asChild>
                  <a href="/Vasu_Kansal_Resume.pdf" download="Vasu_Kansal_Resume.pdf">
                    <Download className="mr-2 w-4 h-4" />
                    Download Resume
                  </a>
                </Button>
                <Button variant="outline" className="border-border hover:border-primary/50" asChild>
                  <a href="/Vasu_Kansal_Resume.pdf" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 w-4 h-4" />
                    View Online
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">600+</p>
              <p className="text-xs text-muted-foreground">Users Impacted</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">3</p>
              <p className="text-xs text-muted-foreground">Companies</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">2</p>
              <p className="text-xs text-muted-foreground">Major Projects</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
