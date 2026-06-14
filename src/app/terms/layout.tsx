import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Worko",
  description: "Read the Worko Terms of Service. By accessing our platform, you agree to our rules regarding job postings, user safety, and payment processing.",
  keywords: ["worko terms of service", "terms of use", "worko rules"],
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
