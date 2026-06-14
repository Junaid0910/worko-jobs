import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Latest Gigs & Jobs | Worko",
  description: "Find open trade opportunities near you. Browse job listings for electricians, painters, welders, and carpenters. Apply directly and earn fair wages.",
  keywords: ["skilled trade jobs", "electrician vacancies", "plumber gigs", "local trade opportunities"],
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
