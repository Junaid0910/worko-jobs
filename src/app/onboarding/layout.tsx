import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Onboarding | Worko",
  description: "Complete your user registration details. Define whether you want to work or hire, set your city, and select your primary trade category.",
  keywords: ["worko onboarding", "register worko", "join skilled trade network"],
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
