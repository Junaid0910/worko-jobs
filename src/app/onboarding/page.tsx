"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, ArrowRight, ChevronLeft, MapPin, Hammer, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function OnboardingPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  
  const [role, setRole] = useState<"WORKER" | "HIRER" | null>(null);
  const [step, setStep] = useState(1);
  
  const [name, setName] = useState(session?.user?.name || "");
  const [city, setCity] = useState("");
  const [trade, setTrade] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name || !city || (role === "WORKER" && !trade)) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, city, trade }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to complete onboarding");
      }

      // Update session to reflect new role
      await update({ role: role });
      
      router.push(data.redirect || "/");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />

      <div className="pt-40 md:pt-64 pb-32 max-w-7xl mx-auto px-6 lg:px-8 min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-5xl space-y-16">
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-secondary/5 relative overflow-hidden rounded-full">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              className="absolute top-0 left-0 h-full bg-primary"
            />
          </div>

          <AnimatePresence mode="wait">
            {!role ? (
              <motion.div 
                key="role-selection"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="space-y-16 text-center"
              >
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85] text-heading">
                    CHOOSE YOUR <span className="text-primary">PATH</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-muted font-medium">How do you want to use the Worko platform?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <RoleCard 
                    title="I WANT TO WORK"
                    desc="I'm a skilled tradesperson looking for hyperlocal gigs and verified status."
                    icon={Hammer}
                    onClick={() => { setRole("WORKER"); setStep(2); }}
                    highlight={true}
                  />
                  <RoleCard 
                    title="I WANT TO HIRE"
                    desc="I'm looking for verified pros to help with my home or business projects."
                    icon={User}
                    onClick={() => { setRole("HIRER"); setStep(2); }}
                    highlight={false}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="onboarding-form"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="glass p-8 md:p-20 space-y-12 shadow-premium border-white/60 rounded-3xl md:rounded-5xl"
              >
                <button 
                  onClick={() => { setRole(null); setStep(1); }}
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted hover:text-primary transition-colors bg-secondary/5 px-4 py-2 rounded-full w-fit"
                >
                  <ChevronLeft size={16} /> Back to selection
                </button>

                <div className="space-y-12">
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase">
                      TELL US <span className="text-primary">ABOUT YOU</span>
                    </h2>
                    <p className="text-lg text-muted font-medium">We'll use this to personalize your experience.</p>
                  </div>
                  
                  {error && (
                    <div className="bg-red-500/10 text-red-500 p-4 rounded-xl text-sm font-bold border border-red-500/20">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Full Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rajesh Kumar" 
                        className="w-full bg-white/50 border-2 border-secondary/5 px-8 py-5 text-lg font-bold outline-none focus:border-primary focus:ring-8 ring-primary/5 transition-all rounded-2xl" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Primary City</label>
                      <div className="relative">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={20} />
                        <input 
                          type="text" 
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Mumbai" 
                          className="w-full bg-white/50 border-2 border-secondary/5 px-14 py-5 text-lg font-bold outline-none focus:border-primary focus:ring-8 ring-primary/5 transition-all rounded-2xl" 
                        />
                      </div>
                    </div>
                    {role === "WORKER" && (
                      <div className="space-y-3 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted ml-2">Your Primary Trade</label>
                        <select 
                          value={trade}
                          onChange={(e) => setTrade(e.target.value)}
                          className="w-full bg-surface/50 border-2 border-secondary/5 px-8 py-5 text-lg font-bold outline-none focus:border-primary focus:ring-8 ring-primary/5 transition-all appearance-none rounded-2xl"
                        >
                          <option value="">Select your skill...</option>
                          <option value="ELECTRICIAN">Electrician</option>
                          <option value="PLUMBER">Plumber</option>
                          <option value="CARPENTER">Carpenter</option>
                          <option value="PAINTER">Painter</option>
                          <option value="MASON">Mason</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-secondary text-white py-6 md:py-8 text-xl font-display font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-4 rounded-2xl shadow-premium disabled:opacity-50"
                  >
                    {isLoading ? (
                      <><Loader2 className="animate-spin" size={28} /> SAVING...</>
                    ) : (
                      <>COMPLETE PROFILE <ArrowRight size={28} /></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function RoleCard({ title, desc, icon: Icon, onClick, highlight }: any) {
  return (
    <button 
      onClick={onClick}
      className={`group relative p-12 text-left space-y-8 transition-all duration-500 overflow-hidden rounded-3xl md:rounded-4xl border-4 ${
        highlight 
          ? "bg-secondary text-white border-secondary shadow-premium" 
          : "bg-surface text-heading border-secondary/5 hover:border-primary/50"
      }`}
    >
      <div className={`${highlight ? "bg-white/10" : "bg-secondary/5 group-hover:bg-primary/10 group-hover:text-primary"} w-20 h-20 flex items-center justify-center rounded-2xl transition-colors`}>
        <Icon size={40} />
      </div>
      <div className="space-y-4 relative z-10">
        <h3 className="text-3xl md:text-4xl font-display font-black tracking-tighter uppercase leading-none">{title}</h3>
        <p className={`text-base md:text-lg font-medium leading-relaxed ${highlight ? "text-white/70" : "text-muted group-hover:text-heading/80"}`}>{desc}</p>
      </div>
      <div className={`absolute bottom-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-10`}>
        <ArrowRight size={48} className={highlight ? "text-white" : "text-primary"} />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
