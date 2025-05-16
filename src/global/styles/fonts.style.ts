import { Geist, Geist_Mono, Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap", // optional: reduces layout shift
  variable: "--font-inter", // optional: CSS variable for use in Tailwind or global CSS
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
