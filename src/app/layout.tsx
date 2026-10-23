import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { RevealScript } from "@/components/reveal-script";
import "./globals.css";

// Only `latin` is preloaded. The other subsets' @font-face rules still ship and
// load on demand: Ọ and Ẹ (in "Ọjà Supply") live in Google's vietnamese subset.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Geist has no ₦ (or Ṣ/ṣ). These are Inter / Noto Sans Mono cut down to just
// those glyphs; size-adjust matches Inter's cap height to Geist's.
const naira = localFont({
  src: [
    { path: "../fonts/naira-sans-500.woff2", weight: "500" },
    { path: "../fonts/naira-sans-600.woff2", weight: "600" },
  ],
  variable: "--font-naira",
  display: "swap",
  adjustFontFallback: false,
  declarations: [
    { prop: "unicode-range", value: "U+20A6, U+1E62-1E63" },
    { prop: "size-adjust", value: "97.6%" },
  ],
});

const nairaMono = localFont({
  src: [
    { path: "../fonts/naira-mono-500.woff2", weight: "500" },
    { path: "../fonts/naira-mono-600.woff2", weight: "600" },
  ],
  variable: "--font-naira-mono",
  display: "swap",
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20A6" }],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kobo.howardotuya.com"),
  title: "Kòbò — Get paid, not chased.",
  description:
    "Kòbò sends proper invoices, collects through Paystack and nudges clients for you. Built for Nigerian freelancers and small businesses.",
  openGraph: {
    type: "website",
    siteName: "Kòbò",
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${naira.variable} ${nairaMono.variable}`}
    >
      <head>
        <RevealScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
