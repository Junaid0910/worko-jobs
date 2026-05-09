import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "KaamMitr | Bharat ke Kaarigar, Ab Digital",
  description: "Hyperlocal skilled trades job board for India. Find electricians, plumbers, carpenters and more.",
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
