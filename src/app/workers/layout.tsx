import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Skilled Professionals | Worko",
  description: "Browse verified local electricians, plumbers, painters, carpenters, and other skilled experts. Read reviews, check wages, and request quotes directly.",
  keywords: ["find electricians", "hire plumbers", "local carpenters near me", "verified painters"],
};

export default function WorkersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
