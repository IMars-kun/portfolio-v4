import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://imarskun.my.id'),
  title: { default: 'imarskun — Full Stack Developer', template: '%s | Portfolio' },
  description: 'Full Stack Developer & Cloud Architect. Building scalable systems & beautiful interfaces.',
  keywords: ['developer','portfolio','react','nextjs','cloud','devops','typescript'],
  openGraph: {
    type: 'website',
    title: 'IMarskun — Full Stack Developer',
    description: 'Building robust, scalable systems — from microservices to pixel-perfect interfaces.',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', creator: '@imarskun' },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#05050A' },
    { media: '(prefers-color-scheme: light)', color: '#F5F5F8' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
