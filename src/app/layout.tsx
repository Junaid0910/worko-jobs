import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "Worko | India's Skilled Trades, Now Digital",
    template: "%s | Worko"
  },
  description: "Hyperlocal skilled trades job board for India. Find verified electricians, plumbers, carpenters, painters, masons and welders directly in your locality.",
  keywords: [
    "Worko",
    "skilled trades India",
    "blue-collar jobs",
    "hyperlocal services",
    "hire electrician Mumbai",
    "plumber near me",
    "carpenter job board",
    "verified painters India",
    "local welders",
    "tradespeople directory"
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'https://worko.co'),
  openGraph: {
    title: "Worko | India's Skilled Trades, Now Digital",
    description: "Hyperlocal skilled trades job board for India. Find verified electricians, plumbers, carpenters, painters, masons and welders directly in your locality.",
    url: "/",
    siteName: "Worko",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>
          <div className="flex-1 w-full overflow-x-hidden">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
