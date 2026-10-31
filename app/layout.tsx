import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";


const geistSans = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jhonnysilva.pt"),
  title: "<Jhonny Silva/>",
  description:
    "Portfolio de Jhonny Silva, desenvolvedor front-end especializado em criar sites e interfaces digitais.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "<Jhonny Silva/> | Desenvolvedor Front-end",
    description:
      "Portfolio de Jhonny Silva, desenvolvedor front-end especializado em criar sites e interfaces digitais.",
    locale: "pt_PT",
    type: "website",
    url: "https://jhonnysilva.pt",
    images: [
      {
        url: "/logo.jpeg",
        width: 768,
        height: 768,
        alt: "Logótipo Jhonny Silva",
      },
    ],
  },
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
