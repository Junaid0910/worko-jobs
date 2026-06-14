import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post a Job | Hire Local Trade Experts on Worko",
  description: "Create a job requirement listing. Specify the trade, location details, estimated daily budget, and duration to find verified pros immediately.",
  keywords: ["post trade gig", "hire electrician online", "post plumbing requirement", "find welder"],
};

export default function PostJobLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
