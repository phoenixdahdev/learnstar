import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/utils";
import type React from "react";
import { Toaster } from "sonner";
import { Providers } from "./provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "LearnStar.AI - Transform Your School with AI-Powered Education",
    template: "%s | LearnStar.AI",
  },
  description:
    "LearnStar.AI offers cutting-edge AI-powered tools to revolutionize education. Boost revenue, enhance student performance, and elevate your school's reputation.",
  keywords: [
    "education technology",
    "AI in education",
    "school management",
    "student performance",
    "revenue generation",
    "digital learning",
  ],
  authors: [{ name: "LearnStar.AI Team" }],
  creator: "LearnStar.AI",
  publisher: "LearnStar.AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://learnstar.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LearnStar.AI - Revolutionize Education with AI",
    description:
      "Empower your school with AI-driven tools for enhanced learning, efficient management, and increased revenue.",
    url: "https://learnstar.ai",
    siteName: "LearnStar.AI",
    images: [
      {
        url: "https://learnstar.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "LearnStar.AI - Transforming Education",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnStar.AI - AI-Powered Education Solutions",
    description:
      "Revolutionize your school with LearnStar.AI's innovative educational tools and strategies.",
    images: ["https://learnstar.ai/twitter-image.png"],
    creator: "@learnstarai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  // manifest: "/site.webmanifest",
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 1,
  // },
  category: "Education Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("relative antialiased", inter.className)}>
        <Providers>
          <main className="relative min-h-dvh w-full bg-cream text-black">
            {children}
            <Toaster richColors expand={true} position="top-right" />
          </main>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
