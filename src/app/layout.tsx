import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/Header/Header'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Here comes another devlog...',
  description: '車輪の大開発',
  openGraph: {
    title: 'Kachan tried code',
    images: '/images/man_study.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-fixed bg-center bg-cover bg-[url('/images/sea.jpg')] dark:bg-[url('/images/bg-dark-fixed.jpg')] ",
          inter.className
        )}
      >
        <div className="">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
