import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Join Worko Team",
  description: "Explore career opportunities at Worko. Join us in building the digital marketplace that empowers thousands of skilled tradespeople across India.",
  keywords: ["worko careers", "jobs at worko", "join worko team", "tech jobs india"],
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
