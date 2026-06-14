import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Worko",
  description: "Read the Worko Privacy Policy to understand how we collect, use, protect, and handle your personal profile and transaction information.",
  keywords: ["worko privacy policy", "privacy", "data protection"],
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
