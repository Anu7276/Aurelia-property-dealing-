import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aurelia-estates.vercel.app"),
  title: "Aurelia — Where architecture meets possibility",
  description:
    "A tranquil collection of modernist sanctuaries sculpted with timeless proportion, light, and materiality.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Aurelia — Where architecture meets possibility",
    description:
      "A tranquil collection of modernist sanctuaries sculpted with timeless proportion, light, and materiality.",
    type: "website",
    images: [
      {
        url: "/assets/images/hero-poster.jpg",
        width: 1920,
        height: 1080,
        alt: "Aurelia Architectural Residence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurelia — Where architecture meets possibility",
    description:
      "A tranquil collection of modernist sanctuaries sculpted with timeless proportion, light, and materiality.",
    images: ["/assets/images/hero-poster.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F1E8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} scroll-smooth`}
      style={{ scrollPaddingTop: "5rem" }}
    >
      <head>
        <link rel="preload" as="image" href="/assets/images/hero-poster.jpg" />
      </head>
      <body className="bg-[#F5F1E8] text-[#1B1A17] antialiased selection:bg-[#1B1A17] selection:text-[#F5F1E8]">
        {children}
      </body>
    </html>
  );
}
