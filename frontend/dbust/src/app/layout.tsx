import type { Metadata } from "next";
import Header from '../components/Header'
import "./globals.css";


import { Roboto_Condensed } from 'next/font/google'

const robotoCondensed = Roboto_Condensed({
  weight: ['300', '400', '700'],  // Choose the weights you need
  style: ['normal', 'italic'],    // Choose the styles you need
  subsets: ['latin'],             // Choose the character subsets you need
  variable: '--font-roboto-condensed',
})

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
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
