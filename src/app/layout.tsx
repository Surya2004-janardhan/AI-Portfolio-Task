import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Snow } from "@/components/ui/snow";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Surya Janardhan ",
  description:
    "Portfolio of Surya Janardhan Chintala. AI Engineer specializing in autonomous AI agents, RAG pipelines, and production-grade full-stack applications. Deployed 20+ AI agents at GrowStack.ai.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Portfolio",
    "RAG Pipelines",
    "AI Agents",
    "Next.js",
    "TypeScript",
    "Surya Janardhan",
  ],
  openGraph: {
    title: "Surya Janardhan — AI Engineer & Full Stack Developer",
    description:
      "Portfolio of Surya Janardhan Chintala. AI Engineer specializing in autonomous AI agents and production-grade full-stack applications.",
    type: "website",
    url: "https://SuryaJanardhan.github.io/SuryaJanardhan/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surya Janardhan — AI Engineer & Full Stack Developer",
    description:
      "AI Engineer specializing in autonomous agents, RAG pipelines, and full-stack development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${mono.variable} font-sans antialiased bg-background text-foreground relative overflow-x-hidden`}
      >
        <Snow />
        <main>{children}</main>
      </body>
    </html>
  );
}
