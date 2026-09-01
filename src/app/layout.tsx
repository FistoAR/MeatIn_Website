import type { Metadata } from 'next';
import { Poppins, Chau_Philomene_One, Manrope, Inter, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/layout/Preloader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const chau = Chau_Philomene_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-chau',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://meatinfoods.com'),
  title: {
    default: 'MEATIn | Premium Meat Experience',
    template: '%s | MEATIn'
  },
  description: 'Fresh meat delivered with trust. Discover premium cuts, hygienic processing, and ethical sourcing with MEATIn.',
  keywords: ['fresh meat', 'premium cuts', 'buy meat online', 'hygienic meat', 'ethical sourcing', 'MEATIn', 'meat delivery', 'fresh chicken', 'fresh mutton', 'fresh fish'],
  authors: [{ name: 'MEATIn Foods' }],
  creator: 'MEATIn Foods',
  publisher: 'MEATIn Foods',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.webp',
  },
  openGraph: {
    title: 'MEATIn | Premium Meat Experience',
    description: 'Fresh meat delivered with trust. Discover premium cuts, hygienic processing, and ethical sourcing with MEATIn.',
    url: 'https://meatinfoods.com',
    siteName: 'MEATIn',
    images: [
      {
        url: '/assets/logo-image.webp',
        width: 800,
        height: 600,
        alt: 'MEATIn Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MEATIn | Premium Meat Experience',
    description: 'Fresh meat delivered with trust. Discover premium cuts, hygienic processing, and ethical sourcing with MEATIn.',
    images: ['/assets/logo-image.webp'],
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
};

import SmoothScroll from '@/components/layout/SmoothScroll';
import ScrollToTop from '@/components/layout/ScrollToTop';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'MEATIn',
    'url': 'https://meatinfoods.com',
    'logo': 'https://meatinfoods.com/assets/logo-image.webp',
    'sameAs': [
      'https://www.facebook.com/meatinfoods',
      'https://www.instagram.com/meatinfoods',
    ],
    'description': 'Fresh meat delivered with trust. Discover premium cuts, hygienic processing, and ethical sourcing with MEATIn.',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+91-XXXXXXXXXX', // Fallback or template contact
      'contactType': 'customer service',
    }
  };

  return (
    <html 
      lang="en" 
      className={`${poppins.variable} ${chau.variable} ${manrope.variable} ${inter.variable} ${barlow.variable}`} 
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-manrope bg-white text-slate-900 min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <Preloader />
        <Navbar />
        <main className="flex-1 w-full">
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
