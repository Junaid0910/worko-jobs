"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin, Clock, ArrowRight, AlertCircle, TrendingUp, Briefcase, Filter, X } from "lucide-react";
import Link from "next/link";

const jobs = [
  {
    id: "1",
    title: "Bathroom Renovation Overhaul",
    trade: "PLUMBER",
    type: "ONE_TIME",
    budget: 800,
    city: "Mumbai",
    locality: "Bandra",
    createdAt: "2 hours ago",
    isUrgent: true,
    hirerName: "Mrs. Sharma",
  },
  {
    id: "2",
    title: "Weekly Electrical Maintenance",
    trade: "ELECTRICIAN",
    type: "WEEKLY",
    budget: 1500,
    city: "Delhi",
    locality: "Saket",
    createdAt: "5 hours ago",
    isUrgent: false,
    hirerName: "Capital Towers",
  },
  {
    id: "3",
    title: "Furniture Workshop Assistant",
    trade: "CARPENTER",
    type: "FULLTIME",
    budget: 1200,
    city: "Bangalore",
    locality: "Whitefield",
    createdAt: "1 day ago",
    isUrgent: false,
    hirerName: "Urban Woodworks",
  },
];

import SuccessModal from "@/components/SuccessModal";

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.trade.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />

      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        title="Application Sent!"
        message="Your application for this job has been submitted. The hirer will review your profile and contact you soon."
      />

      <div className="pt-40 md:pt-64 pb-24 md:pb-40 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-secondary/80 backdrop-blur-sm lg:hidden flex justify-end"
              >
                <motion.div 
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="w-full max-w-sm bg-surface h-full p-6 sm:p-8 overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-display font-black uppercase tracking-tight text-heading">Filters</h3>
                    <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-secondary/5 rounded-full text-heading hover:bg-secondary/10 transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    <FilterGroup title="Job Type">
                      <div className="space-y-3">
                        {["ONE_TIME", "WEEKLY", "FULLTIME"].map((type) => (
                          <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-5 h-5 rounded-md accent-primary" />
                            <span className="text-sm font-bold text-heading group-hover:text-primary transition-colors">{type.replace("_", " ")}</span>
                          </label>
                        ))}
                      </div>
                    </FilterGroup>

                    <FilterGroup title="Min. Daily Budget">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-black text-heading">₹</span>
                        <input type="number" placeholder="500" className="w-full bg-surface/50 border border-secondary/10 px-4 py-2 rounded-xl text-sm font-bold outline-none focus:border-primary" />
                      </div>
                    </FilterGroup>

                    <FilterGroup title="Trade Required">
                      <select className="w-full bg-surface/50 border border-secondary/10 px-4 py-3 rounded-xl text-sm font-bold outline-none focus:border-primary">
                        <option>All Trades</option>
                        <option>Electrician</option>
                        <option>Plumber</option>
                        <option>Carpenter</option>
                      </select>
                    </FilterGroup>

                    <FilterGroup title="Urgency">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 rounded-md accent-primary" />
                        <span className="text-sm font-bold text-heading">Urgent Jobs Only</span>
                      </label>
                    </FilterGroup>
                  </div>

                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full mt-10 bg-primary text-white py-4 rounded-xl font-display font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-glow"
                  >
                    Apply Filters
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 space-y-10">
            <div className="glass p-8 rounded-3xl border-white/60 shadow-premium sticky top-32">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-display font-black uppercase tracking-tight text-heading">Filters</h3>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest">Reset</button>
              </div>
              
              <div className="space-y-8">
                <FilterGroup title="Job Type">
                  <div className="space-y-3">
                    {["ONE_TIME", "WEEKLY", "FULLTIME"].map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 rounded-md accent-primary" />
                        <span className="text-sm font-bold text-heading group-hover:text-primary transition-colors">{type.replace("_", " ")}</span>
                      </label>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup title="Min. Daily Budget">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black text-heading">₹</span>
                    <input type="number" placeholder="500" className="w-full bg-surface/50 border border-secondary/10 px-4 py-2 rounded-xl text-sm font-bold outline-none focus:border-primary" />
                  </div>
                </FilterGroup>

                <FilterGroup title="Trade Required">
                  <select className="w-full bg-surface/50 border border-secondary/10 px-4 py-3 rounded-xl text-sm font-bold outline-none focus:border-primary">
                    <option>All Trades</option>
                    <option>Electrician</option>
                    <option>Plumber</option>
                    <option>Carpenter</option>
                  </select>
                </FilterGroup>

                <FilterGroup title="Urgency">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded-md accent-primary" />
                    <span className="text-sm font-bold text-heading">Urgent Jobs Only</span>
                  </label>
                </FilterGroup>
              </div>

              <button className="w-full mt-10 bg-primary text-white py-4 rounded-xl font-display font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-glow">
                Apply Filters
              </button>
            </div>

            {/* Post Job Card */}
            <div className="bg-secondary p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Briefcase size={80} className="text-white" />
              </div>
              <h3 className="text-2xl font-display font-black uppercase text-white leading-tight">Need to hire fast?</h3>
              <p className="text-sm text-white/60 font-medium">Post your job requirement and get responses from verified pros in minutes.</p>
              <Link href="/onboarding?role=HIRER" className="block text-center bg-surface text-heading py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                POST A GIG NOW
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {/* Header & Search */}
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-block bg-accent/20 text-primary-dark px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border border-accent/30 rounded-full"
                  >
                    <TrendingUp size={14} className="inline mr-2" /> Open Opportunities
                  </motion.div>
                  <h1 className="text-4xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none text-heading">
                    LATEST <span className="text-primary">GIGS</span>
                  </h1>
                </div>
                <button 
                  onClick={() => setIsSuccessModalOpen(true)}
                  className="bg-secondary text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-premium"
                >
                  Post a Job
                </button>
              </div>

              <div className="flex gap-4">
                <div className="relative flex-1 group">
                  <input 
                    type="text" 
                    placeholder="Search by job title, trade or city..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface/80 glass px-6 py-4 md:px-8 md:py-6 text-lg font-bold outline-none focus:ring-8 ring-primary/5 border-2 border-secondary/5 focus:border-primary transition-all shadow-premium rounded-2xl"
                  />
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={24} />
                </div>
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 gap-8">
              {filteredJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group relative bg-surface/80 backdrop-blur-md border border-white/50 p-8 md:p-12 flex flex-col md:flex-row gap-8 justify-between shadow-premium transition-all hover:border-primary/40 rounded-3xl overflow-hidden shine-effect"
                >
                  <div className="flex-1 space-y-8 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="bg-secondary text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full">
                          {job.trade}
                        </div>
                        <div className="bg-surface-dark text-muted px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full">
                          {job.type.replace("_", " ")}
                        </div>
                      </div>
                      {job.isUrgent && (
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-widest"
                        >
                          <AlertCircle size={16} /> Urgent Requirement
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight leading-none group-hover:text-primary transition-colors max-w-2xl">
                        {job.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-muted uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><MapPin size={16} className="text-primary" /> {job.locality}, {job.city}</span>
                        <span className="flex items-center gap-1.5"><Clock size={16} className="text-primary" /> {job.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-72 flex flex-col justify-center gap-8 md:border-l border-secondary/5 md:pl-12 relative z-10">
                    <div className="space-y-1">
                      <div className="text-[9px] font-black text-muted uppercase tracking-widest">Daily Budget</div>
                      <div className="text-4xl font-display font-black text-heading">₹{job.budget}</div>
                    </div>
                    
                    <button 
                      onClick={() => setIsSuccessModalOpen(true)}
                      className="group/btn relative w-full bg-secondary text-white py-5 text-[11px] font-display font-black uppercase tracking-widest flex items-center justify-center gap-2 overflow-hidden transition-all hover:shadow-glow rounded-xl"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        APPLY NOW <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" size={14} />
                      </span>
                      <motion.div 
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-primary" 
                      />
                    </button>
                  </div>

                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center pt-8">
              <button className="group relative bg-surface border-2 md:border-4 border-secondary text-heading px-12 py-6 text-lg font-display font-black uppercase tracking-widest overflow-hidden transition-all hover:text-white rounded-2xl">
                <span className="relative z-10">LOAD MORE OPPORTUNITIES</span>
                <div className="absolute inset-0 bg-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}


function FilterGroup({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-black text-muted uppercase tracking-widest">{title}</h4>
      {children}
    </div>
  );
}



