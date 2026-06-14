import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Access Your Worko Dashboard",
  description: "Sign in to your Worko account to manage your hiring lists, apply to open jobs, upload certification, or delete your account.",
  keywords: ["login worko", "worko sign in", "access dashboard"],
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
