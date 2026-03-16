import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cluso Infolink — Let's Make It Transparent",
  description:
    "Cluso Infolink provides comprehensive background verification and screening services. Trust, accuracy, and transparency are our top priorities.",
  keywords: [
    "background verification",
    "screening services",
    "employment verification",
    "identity check",
    "Cluso Infolink",
  ],
  icons: {
    icon: "/icon.png?v=20260316",
    shortcut: "/icon.png?v=20260316",
    apple: "/apple-icon.png?v=20260316",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased font-body`}
      >
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
