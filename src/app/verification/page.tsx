"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, CheckCircle, FileText, Smartphone, UserCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function VerificationPage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />

      <div className="pt-32 md:pt-40 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-20">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-block bg-accent/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary-dark border border-accent/30">
              Worko Trust & Safety
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none text-heading">
              VERIFICATION CENTER
            </h1>
            <p className="text-xl text-muted font-medium">Verify your skills and identity to stand out and unlock higher-paying jobs.</p>
          </div>

          {/* Three Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-md border border-white/60 p-8 md:p-10 rounded-3xl shadow-sm space-y-4 relative">
              <span className="text-6xl font-display font-black text-secondary/5 absolute top-4 right-4">01</span>
              <Smartphone className="text-primary" size={36} />
              <h3 className="text-2xl font-display font-black text-heading uppercase">IDENTITY CHECK</h3>
              <p className="text-sm text-muted font-medium">Link your Aadhaar/PAN card to confirm your official identity and complete mobile verification.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-white/60 p-8 md:p-10 rounded-3xl shadow-sm space-y-4 relative">
              <span className="text-6xl font-display font-black text-secondary/5 absolute top-4 right-4">02</span>
              <FileText className="text-primary" size={36} />
              <h3 className="text-2xl font-display font-black text-heading uppercase">TRADE CERTIFICATES</h3>
              <p className="text-sm text-muted font-medium">Upload trade certifications, ITI diplomas, or references to prove your field experience.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-white/60 p-8 md:p-10 rounded-3xl shadow-sm space-y-4 relative">
              <span className="text-6xl font-display font-black text-secondary/5 absolute top-4 right-4">03</span>
              <UserCheck className="text-primary" size={36} />
              <h3 className="text-2xl font-display font-black text-heading uppercase">GET VERIFIED BADGE</h3>
              <p className="text-sm text-muted font-medium">Receive the green "Verified Pro" badge on your profile to unlock direct bookings from premium hirers.</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-secondary text-white p-10 md:p-14 rounded-3xl space-y-8 shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase">READY TO GET VERIFIED?</h2>
              <p className="text-lg text-white/80 leading-relaxed font-medium">
                Identity and skill verification is entirely free. Log into your dashboard to start the verification process now.
              </p>
            </div>

            {session?.user ? (
              <Link 
                href={session.user.role === "WORKER" ? "/dashboard/worker/profile" : "/dashboard/hirer"} 
                className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-10 py-5 text-sm font-display font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 rounded-xl transition-all shadow-glow"
              >
                Go to Profile <ArrowRight size={14} />
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-10 py-5 text-sm font-display font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 rounded-xl transition-all shadow-glow"
              >
                Log In to Verify <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
