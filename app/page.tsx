import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Engineering } from "@/components/sections/engineering"
import { Resume } from "@/components/sections/resume"
import { Contact } from "@/components/sections/contact"
import { CommandPalette } from "@/components/command-palette"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Engineering />
      <Resume />
      <Contact />
      <CommandPalette />
    </main>
  )
}
