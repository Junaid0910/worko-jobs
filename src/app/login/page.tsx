"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async () => {
    // Mock OTP Sending since Firebase requires Blaze plan
    setIsLoading(true);
    setError("");
    
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      // Automatically pre-fill for demo purposes
      setOtp("123456");
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      const response = await signIn("credentials", {
        phone,
        otp,
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid OTP or server error");
      } else {
        router.push("/dashboard/hirer"); // Redirect to dashboard
      }
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />

      <div className="pt-40 pb-32 max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl glass p-8 md:p-16 space-y-12 shadow-premium border-white/50"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-heading">
              WELCOME <span className="text-primary">BACK</span>
            </h1>
            <p className="text-lg text-muted font-medium">Enter your credentials to continue.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-xl text-sm font-bold text-center">
              {error}
            </div>
          )}

          <div className="space-y-8">
            {step === 1 ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-muted" size={20} />
                    <input 
                      type="tel" 
                      placeholder="Enter 10-digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-surface/50 border-2 border-secondary/10 px-16 py-5 text-lg font-bold outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <button 
                  onClick={handleSendOtp}
                  disabled={isLoading || phone.length < 10}
                  className="w-full bg-secondary text-white py-6 text-xl font-display font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isLoading ? "SENDING..." : "SEND OTP"} <ArrowRight size={24} />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Verification Code</label>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-muted" size={20} />
                    <input 
                      type="text" 
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-surface/50 border-2 border-secondary/10 px-16 py-5 text-lg font-bold outline-none focus:border-primary transition-all tracking-[0.5em] text-center"
                    />
                  </div>
                  <p className="text-xs text-center text-primary font-bold mt-2">Demo Mode: OTP is 123456</p>
                </div>
                <button 
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length < 6}
                  className="w-full bg-primary text-white py-6 text-xl font-display font-black uppercase tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isLoading ? "VERIFYING..." : "VERIFY & LOGIN"} <ShieldCheck size={24} />
                </button>
                <button 
                  onClick={() => setStep(1)}
                  className="w-full text-sm font-bold text-muted uppercase tracking-widest hover:text-heading transition-colors"
                >
                  Change Phone Number
                </button>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-secondary/5 text-center">
            <p className="text-sm font-medium text-muted">
              Don't have an account?{" "}
              <Link href="/onboarding" className="text-heading font-black hover:text-primary transition-colors">
                JOIN NOW
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
