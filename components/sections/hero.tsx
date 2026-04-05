"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, FileText, Mail } from "lucide-react"

const taglines = [
  "Building scalable backend systems",
  "Designing efficient data pipelines",
  "Optimizing for production reliability",
  "Crafting performant APIs",
]

function TypewriterText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const tagline = taglines[currentIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < tagline.length) {
            setCurrentText(tagline.slice(0, currentText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % taglines.length)
          }
        }
      },
      isDeleting ? 30 : 50
    )
    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentIndex])

  return (
    <span className="text-primary">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 grid-background opacity-40">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  )
}

function FloatingOrbs() {
  return (
    <>
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  )
}

function MouseFollowGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </div>
  )
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedGrid />
      <FloatingOrbs />
      <MouseFollowGlow />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="text-muted-foreground text-sm tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to my portfolio
          </motion.p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Vasu</span>{" "}
            <span className="text-primary text-glow-purple">Kansal</span>
          </h1>

          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Full Stack Developer | Backend & Systems Specialist
          </motion.p>

          <motion.div
            className="h-8 sm:h-10 text-lg sm:text-xl md:text-2xl font-mono mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <TypewriterText />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-purple px-8 py-6 text-lg"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-card hover:border-primary/50 px-8 py-6 text-lg"
              asChild
            >
              <a href="/Vasu_Kansal_Resume.pdf" download="Vasu_Kansal_Resume.pdf">
                <FileText className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="hover:bg-card hover:text-primary px-8 py-6 text-lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer p-2 rounded-full border border-border/50 hover:border-primary/50 transition-colors"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
