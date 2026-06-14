"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
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
              TERMS OF SERVICE
            </h1>
            <p className="text-sm text-muted font-bold tracking-widest uppercase">Last updated: June 14, 2026</p>
          </div>

          {/* Content */}
          <div className="bg-white/80 backdrop-blur-md border border-white/60 p-8 md:p-14 rounded-3xl shadow-premium space-y-8 text-muted font-medium leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-heading uppercase">1. Agreement to Terms</h2>
              <p>
                By accessing or using the Worko platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-heading uppercase">2. User Accounts</h2>
              <p>
                To utilize certain features, you must register for an account. You are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-heading uppercase">3. Platform Rules & Engagement</h2>
              <p>
                Worko acts as a direct network connecting hirers and workers. Users must treat one another with respect, negotiate honestly, and comply with all local laws and safety standards when performing or hiring for services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-heading uppercase">4. Payments & Service Fees</h2>
              <p>
                Payments are securely managed between the hirer and the worker. Service unlock fees (such as purchasing worker details) are non-refundable and managed safely through our platform guidelines.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
