"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, MapPin, IndianRupee, Clock, ChevronRight, Check, FileText } from "lucide-react";

export default function PostJobPage() {
  const [step, setStep] = useState(1);

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase text-heading">POST A REQUIREMENT</h1>
            <p className="text-xl text-muted font-medium">Connect with the best skilled tradespeople in minutes</p>
          </div>

          {/* Progress bar */}
          <div className="h-4 bg-surface border-2 border-secondary overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              className="h-full bg-primary"
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-surface p-10 md:p-16 border-2 border-secondary shadow-[16px_16px_0px_0px_#E8410A]"
              >
                <div className="space-y-8">
                  <div className="flex items-center gap-4 border-b-4 border-secondary pb-4">
                    <Briefcase size={32} className="text-primary" />
                    <h2 className="text-3xl font-display font-black uppercase text-heading">JOB BASICS</h2>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-heading">Job Title</label>
                      <input type="text" required placeholder="e.g. Bathroom plumbing overhaul" className="w-full bg-surface border-2 border-muted/20 px-6 py-4 font-bold outline-none focus:border-primary text-lg" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-heading">Category / Trade</label>
                        <select className="w-full bg-surface border-2 border-muted/20 px-6 py-4 font-bold outline-none focus:border-primary appearance-none">
                          <option>PLUMBER</option>
                          <option>ELECTRICIAN</option>
                          <option>CARPENTER</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-heading">Job Type</label>
                        <select className="w-full bg-surface border-2 border-muted/20 px-6 py-4 font-bold outline-none focus:border-primary appearance-none">
                          <option>ONE_TIME</option>
                          <option>WEEKLY</option>
                          <option>FULLTIME</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-secondary text-white py-6 text-xl font-display font-black tracking-widest flex items-center justify-center gap-3 hover:bg-surface-dark transition-colors">
                      CONTINUE TO LOCATION <ChevronRight size={24} />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-surface p-10 md:p-16 border-2 border-secondary shadow-[16px_16px_0px_0px_#F5C518]"
              >
                <div className="space-y-8">
                  <div className="flex items-center gap-4 border-b-4 border-secondary pb-4">
                    <MapPin size={32} className="text-primary" />
                    <h2 className="text-3xl font-display font-black uppercase text-heading">LOCATION & DETAILS</h2>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-heading">City</label>
                        <input type="text" required placeholder="Mumbai" className="w-full bg-surface border-2 border-muted/20 px-6 py-4 font-bold outline-none focus:border-primary" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-heading">Locality</label>
                        <input type="text" required placeholder="Bandra West" className="w-full bg-surface border-2 border-muted/20 px-6 py-4 font-bold outline-none focus:border-primary" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-heading">Description</label>
                      <textarea rows={5} required placeholder="Detail your requirements here..." className="w-full bg-surface border-2 border-muted/20 px-6 py-4 font-bold outline-none focus:border-primary resize-none" />
                    </div>

                    <div className="flex gap-4">
                      <button type="button" onClick={() => setStep(1)} className="flex-1 border-4 border-secondary py-5 text-lg font-display font-black tracking-widest text-heading hover:bg-secondary hover:text-white transition-colors">BACK</button>
                      <button type="submit" className="flex-[2] bg-primary text-white py-5 text-xl font-display font-black tracking-widest hover:bg-primary-dark transition-colors">CONTINUE TO BUDGET</button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface p-10 md:p-16 border-2 border-secondary shadow-[16px_16px_0px_0px_#0F1C3F]"
              >
                <div className="space-y-8">
                  <div className="flex items-center gap-4 border-b-4 border-secondary pb-4">
                    <IndianRupee size={32} className="text-primary" />
                    <h2 className="text-3xl font-display font-black uppercase text-heading">BUDGET & FINALIZE</h2>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-heading">Budget Per Day (INR)</label>
                        <input type="number" placeholder="800" className="w-full bg-surface border-2 border-muted/20 px-6 py-4 font-bold outline-none focus:border-primary text-2xl text-primary" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-heading">Duration (Days)</label>
                        <input type="text" placeholder="3-5 Days" className="w-full bg-surface border-2 border-muted/20 px-6 py-4 font-bold outline-none focus:border-primary" />
                      </div>
                    </div>

                    <div className="p-8 bg-surface border-2 border-muted/10 space-y-6">
                      <h4 className="font-display font-black uppercase tracking-widest text-heading">Preferences</h4>
                      <div className="space-y-4">
                        <label className="flex items-center gap-4 cursor-pointer group">
                          <div className="w-6 h-6 border-2 border-secondary group-hover:border-primary flex items-center justify-center">
                            <div className="w-3 h-3 bg-primary" />
                          </div>
                          <span className="font-bold text-sm uppercase tracking-widest">Mark as Urgent (Higher visibility)</span>
                        </label>
                        <label className="flex items-center gap-4 cursor-pointer group">
                          <div className="w-6 h-6 border-2 border-secondary group-hover:border-primary flex items-center justify-center">
                            <div className="w-3 h-3 bg-primary" />
                          </div>
                          <span className="font-bold text-sm uppercase tracking-widest">Allow WhatsApp messages</span>
                        </label>
                      </div>
                    </div>

                    <button className="w-full bg-secondary text-white py-8 text-3xl font-display font-black tracking-tighter hover:bg-surface-dark transition-all flex items-center justify-center gap-4 shadow-[8px_8px_0px_0px_#E8410A]">
                      <FileText size={32} /> POST JOB NOW
                    </button>
                  </div>
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
