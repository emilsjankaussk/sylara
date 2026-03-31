import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SYLARA - Soft Strength. Timeless Skin.",
  description: "Luxury skin and body care powered by bioactive prebiotics, botanical extracts, and hyaluronic acid.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SYLARA - Soft Strength. Timeless Skin.",
    description: "Luxury skin and body care powered by bioactive prebiotics, botanical extracts, and hyaluronic acid.",
    url: "https://sylara.eu",
    siteName: "SYLARA",
    images: [
      {
        url: "/assets/images/gen2.webp",
        width: 1200,
        height: 630,
        alt: "SYLARA Skincare",
      },
    ],
    locale: "en_EU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased font-body bg-[#FDFBF7] text-[#2A2A2A]`}>
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
