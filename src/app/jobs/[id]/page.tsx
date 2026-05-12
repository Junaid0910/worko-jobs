"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, ArrowRight, Shield, AlertCircle, Calendar, Briefcase, IndianRupee, CheckCircle2, Loader2 } from "lucide-react";
import SuccessModal from "@/components/SuccessModal";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [job, setJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/jobs/${params.id}`);
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        setJob(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [params.id]);

  const handleApply = async () => {
    if (!session) {
      setError("You must be logged in to apply.");
      return;
    }
    
    try {
      setIsApplying(true);
      setError("");
      
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job.id }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to apply");
      }

      setIsSuccessModalOpen(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      </main>
    );
  }

  if (error && !job) {
    return (
      <main className="min-h-screen bg-surface">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-black text-heading">ERROR</h1>
            <p className="text-muted">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />

      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        title="Application Sent!"
        message="Your application for this job has been submitted. The hirer will review your profile and contact you soon."
      />

      <div className="pt-32 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {error && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-xl text-sm font-bold border border-red-500/20 text-center">
              {error}
            </div>
          )}

          {/* Header */}
          <div className="glass p-8 md:p-12 rounded-3xl border-white/60 shadow-premium space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Briefcase size={120} />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap gap-3">
                <div className="bg-secondary text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {job.trade}
                </div>
                <div className="bg-surface-dark text-muted px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {job.jobType}
                </div>
                {job.isUrgent && (
                  <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest px-2 py-1.5">
                    <AlertCircle size={14} /> Urgent Requirement
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase leading-none text-heading">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-muted uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-primary" /> {job.locality}, {job.city}</span>
                <span className="flex items-center gap-1.5"><Clock size={16} className="text-primary" /> {new Date(job.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center gap-1.5"><Calendar size={16} className="text-primary" /> Expires: {new Date(job.expiresAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <div className="glass p-8 md:p-10 rounded-3xl border-white/60 shadow-sm space-y-6">
                <h3 className="text-xl font-display font-black tracking-tight uppercase text-heading">Job Description</h3>
                <div className="space-y-4 text-muted font-medium leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="glass p-8 rounded-3xl border-white/60 shadow-sm space-y-8">
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-muted uppercase tracking-widest">Estimated Budget</div>
                  <div className="text-4xl font-display font-black text-heading flex items-center gap-1">
                    <IndianRupee size={32} /> {job.budgetPerDay} <span className="text-sm text-muted">/day</span>
                  </div>
                </div>

                <button 
                  onClick={handleApply}
                  disabled={isApplying || session?.user?.role === "HIRER"}
                  className="group relative w-full bg-secondary text-white py-5 text-xs font-display font-black uppercase tracking-widest flex items-center justify-center gap-2 overflow-hidden transition-all shadow-premium rounded-xl hover:shadow-glow disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isApplying ? "APPLYING..." : session?.user?.role === "HIRER" ? "HIRERS CANNOT APPLY" : "APPLY FOR THIS JOB"} 
                    {!isApplying && session?.user?.role !== "HIRER" && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />}
                  </span>
                  {!isApplying && session?.user?.role !== "HIRER" && (
                    <motion.div 
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-primary" 
                    />
                  )}
                </button>
                
                <div className="pt-6 border-t border-secondary/10 space-y-4">
                  <h4 className="text-[10px] font-black text-muted uppercase tracking-widest">About the Hirer</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black font-display uppercase">
                      {job.hirer?.user?.name?.[0] || "?"}
                    </div>
                    <div>
                      <div className="font-bold text-heading">{job.hirer?.user?.name || "Anonymous"}</div>
                      <div className="flex items-center gap-1 text-[10px] font-black text-green-600 uppercase tracking-widest mt-1">
                        <Shield size={12} /> Payment Verified
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
