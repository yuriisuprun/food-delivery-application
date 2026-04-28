import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Italian Language AI Tutor',
  description: 'Context-aware AI tutoring system for Italian language exam preparation',
  keywords: ['Italian', 'Language', 'Learning', 'AI', 'Tutor', 'Exam'],
  authors: [{ name: 'Italian Tutor Team' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Italian Language AI Tutor',
    description: 'Context-aware AI tutoring system for Italian language exam preparation',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
