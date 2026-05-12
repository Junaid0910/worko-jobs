"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, ArrowRight, Shield, AlertCircle, Calendar, Briefcase, IndianRupee, CheckCircle2 } from "lucide-react";
import SuccessModal from "@/components/SuccessModal";
import { motion } from "framer-motion";

export default function JobDetailsPage() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
          {/* Header */}
          <div className="glass p-8 md:p-12 rounded-3xl border-white/60 shadow-premium space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Briefcase size={120} />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap gap-3">
                <div className="bg-secondary text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full">
                  PLUMBER
                </div>
                <div className="bg-surface-dark text-muted px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full">
                  ONE TIME
                </div>
                <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest px-2 py-1.5">
                  <AlertCircle size={14} /> Urgent Requirement
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase leading-none text-heading">
                Bathroom Renovation Overhaul
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-muted uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-primary" /> Bandra, Mumbai</span>
                <span className="flex items-center gap-1.5"><Clock size={16} className="text-primary" /> Posted 2 hours ago</span>
                <span className="flex items-center gap-1.5"><Calendar size={16} className="text-primary" /> Starts: Immediate</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <div className="glass p-8 md:p-10 rounded-3xl border-white/60 shadow-sm space-y-6">
                <h3 className="text-xl font-display font-black tracking-tight uppercase text-heading">Job Description</h3>
                <div className="space-y-4 text-muted font-medium leading-relaxed">
                  <p>
                    We are looking for an experienced plumber to completely overhaul the plumbing in our master bathroom. The current system is old and experiencing leaks.
                  </p>
                  <p>
                    Responsibilities include:
                  </p>
                  <ul className="space-y-2 list-inside">
                    <li className="flex items-start gap-3"><CheckCircle2 size={20} className="text-primary shrink-0" /> Removing old pipes and fixtures.</li>
                    <li className="flex items-start gap-3"><CheckCircle2 size={20} className="text-primary shrink-0" /> Installing new copper and PVC piping.</li>
                    <li className="flex items-start gap-3"><CheckCircle2 size={20} className="text-primary shrink-0" /> Connecting new shower, toilet, and sink fixtures.</li>
                    <li className="flex items-start gap-3"><CheckCircle2 size={20} className="text-primary shrink-0" /> Testing the system for leaks and proper water pressure.</li>
                  </ul>
                  <p>
                    All materials will be provided by us. You just need to bring your tools and expertise. This is an urgent requirement, and we expect the work to be completed within 3 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="glass p-8 rounded-3xl border-white/60 shadow-sm space-y-8">
                <div className="space-y-2">
                  <div className="text-[10px] font-black text-muted uppercase tracking-widest">Estimated Budget</div>
                  <div className="text-4xl font-display font-black text-heading flex items-center gap-1">
                    <IndianRupee size={32} /> 800 <span className="text-sm text-muted">/day</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsSuccessModalOpen(true)}
                  className="group relative w-full bg-secondary text-white py-5 text-xs font-display font-black uppercase tracking-widest flex items-center justify-center gap-2 overflow-hidden transition-all shadow-premium rounded-xl hover:shadow-glow"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    APPLY FOR THIS JOB <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                  </span>
                  <motion.div 
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-primary" 
                  />
                </button>
                
                <div className="pt-6 border-t border-secondary/10 space-y-4">
                  <h4 className="text-[10px] font-black text-muted uppercase tracking-widest">About the Hirer</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black font-display">
                      MS
                    </div>
                    <div>
                      <div className="font-bold text-heading">Mrs. Sharma</div>
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
