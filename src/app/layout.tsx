import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arbaaz Khan - Software Engineer & Full Stack Developer",
  description: "1+ years of experience as a Full-Stack Developer with expertise in building scalable and high-performance web applications. Specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "Arbaaz Khan",
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Web Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "MongoDB",
    "Portfolio"
  ],
  authors: [{ name: "Arbaaz Khan" }],
  creator: "Arbaaz Khan",
  publisher: "Arbaaz Khan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://arbaazkhan.vercel.app'), // Update with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://arbaazkhan.vercel.app',
    title: 'Arbaaz Khan - Software Engineer & Full Stack Developer',
    description: '1+ years of experience as a Full-Stack Developer with expertise in building scalable and high-performance web applications.',
    siteName: 'Arbaaz Khan Portfolio',
    images: [
      {
        url: '/og-image.jpg', // You can add an OG image later
        width: 1200,
        height: 630,
        alt: 'Arbaaz Khan - Software Engineer & Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arbaaz Khan - Software Engineer & Full Stack Developer',
    description: '1+ years of experience as a Full-Stack Developer with expertise in building scalable web applications.',
    creator: '@arbaazkhan', // Update with your Twitter handle if you have one
    images: ['/og-image.jpg'],
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
    // google: 'your-google-verification-code', // Add when you have Google Search Console
    // yandex: 'your-yandex-verification-code', // Add if needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}