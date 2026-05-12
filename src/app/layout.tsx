import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CS125 Final Prep — Zeynep",
  description: "Yarınki CS125 finaline hazırlık. NumPy, Pandas, Matplotlib.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${jetbrains.variable} dark`}>
      <body className="min-h-screen bg-slate-950 text-slate-200 font-sans antialiased">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
