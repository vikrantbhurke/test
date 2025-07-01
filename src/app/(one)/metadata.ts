import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to Bookverse",
  description:
    "Discover, save, and discuss books in a powerful reader-friendly platform.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon-180x180.png",
  },
  openGraph: {
    title: "Welcome to Bookverse",
    description: "Explore and share books with readers worldwide.",
    url: process.env.APP_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome to Bookverse",
    description: "Join a community of book lovers.",
  },
};
