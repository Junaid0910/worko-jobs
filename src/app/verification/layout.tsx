import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verification Center | Get Verified on Worko",
  description: "Link your identity cards, upload trade certifications or ITI diplomas, and get the green verified badge to unlock premium jobs and higher trust on Worko.",
  keywords: ["worko verification", "verified tradesperson", "iti verification", "trust badge"],
};

export default function VerificationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
