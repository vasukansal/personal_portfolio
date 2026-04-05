"use client"

import { useEffect, useState, useCallback } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Home,
  User,
  Code2,
  Briefcase,
  Brain,
  FileText,
  Mail,
  Github,
  Linkedin,
  ArrowUp,
} from "lucide-react"

const navigationItems = [
  { icon: Home, label: "Home", href: "#hero" },
  { icon: User, label: "About", href: "#about" },
  { icon: Code2, label: "Skills", href: "#skills" },
  { icon: Briefcase, label: "Projects", href: "#projects" },
  { icon: Briefcase, label: "Experience", href: "#experience" },
  { icon: Brain, label: "Engineering", href: "#engineering" },
  { icon: FileText, label: "Resume", href: "#resume" },
  { icon: Mail, label: "Contact", href: "#contact" },
]

const quickActions = [
  {
    icon: FileText,
    label: "Download Resume",
    action: () => {
      // Trigger resume download
      document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" })
    },
  },
  {
    icon: Mail,
    label: "Send Email",
    action: () => {
      window.open("mailto:vasu12b8075@gmail.com", "_blank")
    },
  },
  {
    icon: Github,
    label: "Open GitHub",
    action: () => {
      window.open("https://github.com/vasukansal", "_blank")
    },
  },
  {
    icon: Linkedin,
    label: "Open LinkedIn",
    action: () => {
      window.open("https://www.linkedin.com/in/vasu-kansal/", "_blank")
    },
  },
  {
    icon: ArrowUp,
    label: "Back to Top",
    action: () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
  },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleNavigation = useCallback((href: string) => {
    setOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const handleAction = useCallback((action: () => void) => {
    setOpen(false)
    action()
  }, [])

  return (
    <>
      {/* Keyboard shortcut hint */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 glass-strong rounded-xl px-4 py-2 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <span>Press</span>
        <kbd className="px-2 py-1 rounded bg-muted text-xs font-mono">Ctrl</kbd>
        <span>+</span>
        <kbd className="px-2 py-1 rounded bg-muted text-xs font-mono">K</kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command Palette"
        description="Navigate or run quick actions"
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => handleNavigation(item.href)}
                className="cursor-pointer"
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Quick Actions">
            {quickActions.map((item) => (
              <CommandItem
                key={item.label}
                onSelect={() => handleAction(item.action)}
                className="cursor-pointer"
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
