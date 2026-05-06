import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bodoni_Moda, Playfair_Display } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "Nehil Chandrakar",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: siteConfig.name,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  icons: {
    icon: "/icon.png",
  },
};

import { LayoutShell } from "@/components/layout-shell"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bodoni.variable} ${playfair.variable} antialiased selection:bg-zinc-800 selection:text-white bg-white text-black font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.name,
              url: siteConfig.url,
              jobTitle: siteConfig.currentRole.title,
              worksFor: {
                "@type": "Organization",
                name: siteConfig.currentRole.company,
              },
            }),
          }}
        />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
