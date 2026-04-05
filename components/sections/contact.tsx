"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Linkedin, Github, ArrowUpRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "vasu12b8075@gmail.com",
    href: "mailto:vasu12b8075@gmail.com",
    color: "primary" as const,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/vasu-kansal",
    href: "https://www.linkedin.com/in/vasu-kansal/",
    color: "secondary" as const,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/vasukansal",
    href: "https://github.com/vasukansal",
    color: "primary" as const,
  },
]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 sm:py-32 bg-card/30">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s <span className="text-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            I&apos;m always open to discussing new opportunities, interesting projects, or just having a conversation about technology.
          </p>
          <p className="text-2xl sm:text-3xl font-semibold text-foreground">
            Let&apos;s build something <span className="text-secondary text-glow-blue">impactful</span>
          </p>
        </motion.div>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {contactLinks.map((link, index) => {
            const colorClasses =
              link.color === "primary"
                ? { bg: "bg-primary/20", hover: "hover:bg-primary/30", text: "text-primary", glow: "hover:glow-purple" }
                : { bg: "bg-secondary/20", hover: "hover:bg-secondary/30", text: "text-secondary", glow: "hover:glow-blue" }

            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`glass rounded-2xl p-6 flex flex-col items-center text-center group ${colorClasses.glow} transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl ${colorClasses.bg} ${colorClasses.hover} flex items-center justify-center mb-4 transition-colors`}>
                  <link.icon className={`w-7 h-7 ${colorClasses.text}`} />
                </div>
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  {link.label}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground break-all">{link.value}</p>
              </motion.a>
            )
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-purple px-10 py-6 text-lg"
            asChild
          >
            <a href="mailto:vasu12b8075@gmail.com">
              <Mail className="mr-2 w-5 h-5" />
              Send me an email
            </a>
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-20 pt-8 border-t border-border text-center"
        >
          <p className="text-sm text-muted-foreground">
            Designed and built by <span className="text-primary">Vasu Kansal</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Built with Next.js, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  )
}
