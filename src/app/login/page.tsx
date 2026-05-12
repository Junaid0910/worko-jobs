"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Lock, ArrowRight, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Login Flow
        const response = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (response?.error) {
          setError(response.error);
        } else {
          router.push("/dashboard/hirer"); // Default dashboard
        }
      } else {
        // Sign Up Flow
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to register");
        }

        // Auto login after sign up
        const loginRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginRes?.error) {
          setError("Account created, but failed to log in.");
        } else {
          router.push("/onboarding"); // Take new users to onboarding
        }
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    signIn(provider, { callbackUrl: "/dashboard/hirer" });
  };

  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />

      <div className="pt-40 pb-32 max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl glass p-8 md:p-14 space-y-10 shadow-premium border-white/50 rounded-[2.5rem]"
        >
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase text-heading">
              {isLogin ? (
                <>WELCOME <span className="text-primary">BACK</span></>
              ) : (
                <>CREATE <span className="text-primary">ACCOUNT</span></>
              )}
            </h1>
            <p className="text-sm md:text-base text-muted font-medium">
              {isLogin ? "Enter your details to access your account." : "Join thousands of pros and hirers today."}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="bg-red-500/10 text-red-500 p-4 rounded-2xl text-sm font-bold text-center border border-red-500/20"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-6">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => handleOAuthLogin('google')}
                disabled={isLoading}
                className="w-full bg-white text-gray-800 border border-gray-200 py-4 text-sm font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all disabled:opacity-50 shadow-sm"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleOAuthLogin('facebook')}
                  disabled={isLoading}
                  className="w-full bg-[#1877F2] text-white py-4 text-sm font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#1864D9] transition-all disabled:opacity-50 shadow-sm"
                >
                  <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-5 h-5 invert" />
                  Facebook
                </button>
                <button 
                  onClick={() => handleOAuthLogin('instagram')}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white py-4 text-sm font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 shadow-sm"
                >
                  <img src="https://www.svgrepo.com/show/452229/instagram-1.svg" alt="Instagram" className="w-5 h-5 invert" />
                  Instagram
                </button>
              </div>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-secondary/10"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-black uppercase text-muted tracking-widest">OR</span>
              <div className="flex-grow border-t border-secondary/10"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-5">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={!isLogin}
                        className="w-full bg-surface/50 border-2 border-secondary/10 px-14 py-4 text-sm font-bold outline-none focus:border-primary rounded-2xl transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-surface/50 border-2 border-secondary/10 px-14 py-4 text-sm font-bold outline-none focus:border-primary rounded-2xl transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted">Password</label>
                  {isLogin && <Link href="#" className="text-[10px] font-black text-primary hover:underline">Forgot?</Link>}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-surface/50 border-2 border-secondary/10 px-14 py-4 text-sm font-bold outline-none focus:border-primary rounded-2xl transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-secondary text-white py-5 mt-4 text-sm font-display font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-3 disabled:opacity-50 rounded-2xl shadow-glow"
              >
                {isLoading ? "PROCESSING..." : isLogin ? "LOGIN SECURELY" : "CREATE ACCOUNT"} 
                <ShieldCheck size={20} />
              </button>
            </form>
          </div>

          <div className="pt-8 border-t border-secondary/5 text-center">
            <p className="text-sm font-medium text-muted">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-heading font-black hover:text-primary transition-colors"
              >
                {isLogin ? "JOIN NOW" : "LOG IN"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
