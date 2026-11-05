import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
