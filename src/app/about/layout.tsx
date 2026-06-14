import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Worko - Hyperlocal Skilled Trades",
  description: "Learn more about Worko's story, core values, and our mission to empower India's skilled trade professionals through digital connectivity.",
  keywords: ["about worko", "skilled trade marketplace", "hyperlocal jobs India", "worko mission"],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
