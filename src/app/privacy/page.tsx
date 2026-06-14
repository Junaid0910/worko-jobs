"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />

      <div className="pt-32 md:pt-40 pb-20 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="space-y-12">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-heading">
              PRIVACY POLICY
            </h1>
            <p className="text-sm text-muted font-bold tracking-widest uppercase">Last updated: June 14, 2026</p>
          </div>

          {/* Content */}
          <div className="bg-white/80 backdrop-blur-md border border-white/60 p-8 md:p-14 rounded-3xl shadow-premium space-y-8 text-muted font-medium leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-heading uppercase">1. Information We Collect</h2>
              <p>
                We collect personal information that you provide to us directly, such as your name, email address, phone number, and location data when you sign up as a user, hirer, or worker on our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-heading uppercase">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to facilitate the hiring process, connect workers with jobs, process secure payments, verify user identities, communicate updates, and continuously improve our website experience.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-heading uppercase">3. Data Sharing & Trust</h2>
              <p>
                Your contact details (such as your phone number) are only shared with a registered worker or hirer once a job application is accepted or unlocked through a verification process. We do not sell or lease your personal information to third parties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-heading uppercase">4. Security Standards</h2>
              <p>
                We employ industry-standard encryption and security protocols to safeguard your personal data, payment information, and database transactions against unauthorized access.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
