import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ArchNavbar from "@/components/arch/ArchNavbar";
import GlobalCursor from "@/components/GlobalCursor";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thecloudsstudio.com"),
  title: {
    default: "Clouds Studio",
    template: "%s | Clouds Studio",
  },
  description: "Award-winning architectural and interior design studio. We create elegant, modern spaces that are rigorous in their detail and construction.",
  keywords: ["architecture studio", "interior design", "minimalist architecture", "residential design", "commercial architecture", "India", "Chennai", "Bangalore", "Kerala"],
  openGraph: {
    title: "Clouds Studio",
    description: "Award-winning architectural and interior design studio.",
    url: "https://thecloudsstudio.com",
    siteName: "Clouds Studio",
    locale: "en_IN",
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
      <body className={`${inter.variable} antialiased font-sans cursor-none`}>
        <GlobalCursor />
        <ArchNavbar />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
