import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: 'Vasu Kansal | Full Stack Developer',
  description: 'Full Stack Developer specializing in backend engineering, data pipelines, and scalable systems. Building production-ready solutions with real-world impact.',
  keywords: ['Full Stack Developer', 'Backend Engineer', 'Data Pipelines', 'System Design', 'React', 'Next.js', 'Node.js', 'Python'],
  authors: [{ name: 'Vasu Kansal' }],
  openGraph: {
    title: 'Vasu Kansal | Full Stack Developer',
    description: 'Full Stack Developer specializing in backend engineering, data pipelines, and scalable systems.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1625',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
