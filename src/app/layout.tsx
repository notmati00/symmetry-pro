import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/language";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Symmetry Pro - Professional Facial & Body Symmetry Training",
  description: "Transform your appearance with professional facial and body symmetry training. Guided exercises, progress tracking, and expert guidance to help you achieve your symmetry goals through consistent practice.",
  keywords: ["symmetry", "facial symmetry", "body symmetry", "posture", "facial exercises", "lookmaxing", "jawline", "cheek exercises", "posture correction", "fitness", "wellness", "self-improvement"],
  authors: [{ name: "Symmetry Pro Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Symmetry Pro - Professional Symmetry Training",
    description: "Achieve your best look with professional facial and body symmetry training",
    url: "https://chat.z.ai",
    siteName: "Symmetry Pro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Symmetry Pro - Professional Symmetry Training",
    description: "Transform your appearance with guided symmetry exercises and progress tracking",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
