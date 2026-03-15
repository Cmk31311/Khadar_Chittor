import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khadarchittor.vercel.app"),
  title: "Khadar Chittor ✌️",
  description: "I write code the way I make coffee - strong, slightly chaotic, but it gets the job done. I thrive on turning ideas into interactive, scalable solutions.",
  keywords: "Khadar Chittor, Software Engineer, Python, GenAI, Cloud, React, TypeScript, Next.js",
  authors: [{ name: "Khadar Chittor" }],
  creator: "Khadar Chittor",
  publisher: "Khadar Chittor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Khadar Chittor - Software Engineer",
    description: "Crafting digital experiences with precision, passion, and elegance.",
    url: "https://khadarchittor.dev",
    siteName: "Khadar Chittor's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khadar Chittor - Software Engineer",
    description: "Crafting digital experiences with precision, passion, and elegance.",
  },
  verification: {
    google: "GsRYY-ivL0F_VKkfs5KAeToliqz0gCrRAJKKmFkAxBA",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId={'G-7WD4HM3XRE'}/>
    </html>
  );
}
