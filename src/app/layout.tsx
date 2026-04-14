import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Clouds Studio",
  description: "Award-winning architectural and interior design studio. We create elegant, modern spaces that are rigorous in their detail and construction.",
  openGraph: {
    title: "Clouds Studio",
    description: "Award-winning architectural and interior design studio. We create elegant, modern spaces that are rigorous in their detail and construction.",
    url: "https://thecloudsstudio.com",
    siteName: "Clouds Studio",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clouds Studio",
    description: "Award-winning architectural and interior design studio.",
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
    <html lang="en">
      <body
        className={`${inter.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
