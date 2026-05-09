"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, Briefcase, Users, Star, IndianRupee, MapPin, Clock, ChevronRight, UserCheck } from "lucide-react";
import Link from "next/link";

export default function HirerDashboard() {
  const [activeJobs, setActiveJobs] = useState([
    { id: "1", title: "Bathroom Plumber Needed", applicants: 8, budget: "800/day", status: "ACTIVE" },
    { id: "2", title: "Electrician for Office", applicants: 3, budget: "1200/day", status: "ACTIVE" },
  ]);

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-2">
              <div className="inline-block bg-accent/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary-dark border border-accent/30">
                Hirer Portal
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none">
                MANAGE HIRING
              </h1>
              <p className="text-xl text-muted font-medium">Post new jobs and track applicants in one place</p>
            </div>
            
            <Link href="/post-job" className="bg-primary text-white px-10 py-5 text-xl font-display font-black rounded-none shadow-[8px_8px_0px_0px_#0F1C3F] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2">
              <Plus size={24} /> POST NEW JOB
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Active Jobs List */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-3xl font-display font-black tracking-tighter uppercase border-l-8 border-secondary pl-6">ACTIVE LISTINGS</h3>
              
              <div className="space-y-6">
                {activeJobs.map((job) => (
                  <motion.div 
                    key={job.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white border-2 border-secondary p-8 flex flex-col md:flex-row justify-between gap-8 shadow-[8px_8px_0px_0px_#F5C518] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h4 className="text-2xl font-display font-black tracking-tight">{job.title}</h4>
                        <div className="flex items-center gap-4 text-xs font-bold text-muted uppercase tracking-widest">
                          <span className="flex items-center gap-1"><IndianRupee size={12} /> {job.budget}</span>
                          <span className="flex items-center gap-1 text-green-500"><div className="w-2 h-2 bg-green-500 rounded-full" /> {job.status}</span>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-surface px-4 py-2 border border-muted/10">
                          <span className="text-lg font-black text-secondary">{job.applicants}</span>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-widest ml-2">Applicants</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 justify-center">
                      <Link href={`/dashboard/hirer/jobs/${job.id}`} className="bg-secondary text-white px-8 py-3 text-xs font-display font-black uppercase tracking-widest text-center hover:bg-surface-dark transition-colors">
                        VIEW APPLICANTS
                      </Link>
                      <button className="text-[10px] font-black text-muted uppercase tracking-widest hover:text-primary transition-colors">
                        Close Listing
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar Stats & Featured */}
            <aside className="space-y-10">
              <div className="bg-white p-8 border-2 border-muted/10 space-y-8">
                <h4 className="font-display font-black uppercase tracking-widest text-secondary">HIRING STATS</h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center"><Briefcase size={20} /></div>
                      <span className="text-xs font-bold text-muted uppercase tracking-widest">Total Jobs</span>
                    </div>
                    <span className="text-xl font-display font-black">14</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary/10 text-secondary flex items-center justify-center"><Users size={20} /></div>
                      <span className="text-xs font-bold text-muted uppercase tracking-widest">Pros Hired</span>
                    </div>
                    <span className="text-xl font-display font-black">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-accent/20 text-primary-dark flex items-center justify-center"><Star size={20} /></div>
                      <span className="text-xs font-bold text-muted uppercase tracking-widest">Hirer Rating</span>
                    </div>
                    <span className="text-xl font-display font-black">4.9</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary p-8 text-white relative overflow-hidden group">
                <div className="relative z-10 space-y-6">
                  <h4 className="text-2xl font-display font-black tracking-tighter uppercase leading-tight">UNLOCK DIRECT CONTACTS</h4>
                  <p className="text-xs text-muted leading-relaxed italic">Pay just ₹29 to unlock a verified worker's phone number and WhatsApp directly.</p>
                  <button className="bg-primary text-white w-full py-4 text-xs font-display font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all">
                    BUY CREDITS
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
              </div>
            </aside>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
