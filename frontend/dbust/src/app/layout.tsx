import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '700'],  // Choose the weights you need
  style: ['normal', 'italic'],    // Choose the styles you need
  subsets: ['latin'],             // Choose the character subsets you need
  variable: '--font-roboto-condensed',
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Deepfake Detection",
  description: "Detects possibility of forging for images.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={robotoCondensed.variable}>
      <body>{children}</body>
    </html>
  )
}
