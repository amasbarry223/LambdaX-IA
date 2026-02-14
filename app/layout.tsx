import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { ClientProviders } from '@/components/client-providers'
import { StructuredData } from './structured-data'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'LambdaX AI | Intelligence Artificielle & Conseil',
    template: '%s | LambdaX AI',
  },
  description: 'Cabinet de conseil en Intelligence Artificielle. Nous transformons vos données en avantage compétitif avec des solutions IA sur mesure.',
  keywords: ['IA', 'Intelligence Artificielle', 'Conseil', 'Data', 'Machine Learning', 'LambdaX', 'AI Consulting', 'Data Science'],
  authors: [{ name: 'LambdaX AI' }],
  creator: 'LambdaX AI',
  publisher: 'LambdaX AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lambdax.ai'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'LambdaX AI',
    title: 'LambdaX AI | Intelligence Artificielle & Conseil',
    description: 'Cabinet de conseil en Intelligence Artificielle. Nous transformons vos données en avantage compétitif avec des solutions IA sur mesure.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LambdaX AI - Intelligence Artificielle & Conseil',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LambdaX AI | Intelligence Artificielle & Conseil',
    description: 'Cabinet de conseil en Intelligence Artificielle. Nous transformons vos données en avantage compétitif avec des solutions IA sur mesure.',
    images: ['/og-image.jpg'],
    creator: '@lambdaxai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <StructuredData />
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
