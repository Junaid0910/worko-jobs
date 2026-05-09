"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin, Star, ShieldCheck, ArrowRight, Filter, X } from "lucide-react";
import Link from "next/link";

const workers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    trade: "ELECTRICIAN",
    rating: 4.9,
    reviews: 124,
    city: "Mumbai",
    locality: "Andheri",
    wage: 800,
    isVerified: true,
  },
  {
    id: "2",
    name: "Amit Singh",
    trade: "PLUMBER",
    rating: 4.8,
    reviews: 89,
    city: "Delhi",
    locality: "Saket",
    wage: 700,
    isVerified: true,
  },
  {
    id: "3",
    name: "Vikram Carpenter",
    trade: "CARPENTER",
    rating: 4.7,
    reviews: 45,
    city: "Bangalore",
    locality: "HSR Layout",
    wage: 1000,
    isVerified: false,
  },
];

import SuccessModal from "@/components/SuccessModal";

export default function WorkersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("ALL");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
  };

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          worker.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          worker.trade.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrade = selectedTrade === "ALL" || worker.trade === selectedTrade;
    return matchesSearch && matchesTrade;
  });

  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />
      
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)}
        title="Request Sent!"
        message="Your request for a quote has been sent successfully. The expert will contact you shortly."
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
                    <h3 className="text-xl font-display font-black uppercase tracking-tight text-secondary">Refine Search</h3>
                    <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-secondary/5 rounded-full text-secondary hover:bg-secondary/10 transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="space-y-8">
                    <FilterGroup title="Trade Category">
                      <select 
                        value={selectedTrade}
                        onChange={(e) => setSelectedTrade(e.target.value)}
                        className="w-full bg-white/50 border border-secondary/10 px-4 py-3 rounded-xl text-sm font-bold outline-none focus:border-primary transition-all"
                      >
                        <option value="ALL">All Trades</option>
                        <option value="ELECTRICIAN">Electrician</option>
                        <option value="PLUMBER">Plumber</option>
                        <option value="CARPENTER">Carpenter</option>
                        <option value="PAINTER">Painter</option>
                        <option value="MASON">Mason</option>
                      </select>
                    </FilterGroup>

                    <FilterGroup title="Minimum Rating">
                      <div className="flex gap-2">
                        {[3, 4, 4.5].map((r) => (
                          <button key={r} className="flex-1 py-2 rounded-xl border border-secondary/10 text-[10px] font-black uppercase hover:bg-primary hover:text-white transition-all">
                            {r}+ <Star size={8} className="inline fill-current" />
                          </button>
                        ))}
                      </div>
                    </FilterGroup>

                    <FilterGroup title="Daily Wage Range">
                      <input type="range" min="300" max="2000" step="100" className="w-full accent-primary" />
                      <div className="flex justify-between text-[10px] font-black text-muted uppercase mt-2">
                        <span>₹300</span>
                        <span>₹2000+</span>
                      </div>
                    </FilterGroup>

                    <FilterGroup title="Availability">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 rounded-md accent-primary" defaultChecked />
                        <span className="text-sm font-bold text-secondary">Available Now</span>
                      </label>
                    </FilterGroup>
                  </div>

                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full mt-10 bg-secondary text-white py-4 rounded-xl font-display font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-glow"
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
              <h3 className="text-xl font-display font-black uppercase tracking-tight text-secondary mb-8">Refine Search</h3>
              
              <div className="space-y-8">
                <FilterGroup title="Trade Category">
                  <select 
                    value={selectedTrade}
                    onChange={(e) => setSelectedTrade(e.target.value)}
                    className="w-full bg-white/50 border border-secondary/10 px-4 py-3 rounded-xl text-sm font-bold outline-none focus:border-primary transition-all"
                  >
                    <option value="ALL">All Trades</option>
                    <option value="ELECTRICIAN">Electrician</option>
                    <option value="PLUMBER">Plumber</option>
                    <option value="CARPENTER">Carpenter</option>
                    <option value="PAINTER">Painter</option>
                    <option value="MASON">Mason</option>
                  </select>
                </FilterGroup>

                <FilterGroup title="Minimum Rating">
                  <div className="flex gap-2">
                    {[3, 4, 4.5].map((r) => (
                      <button key={r} className="flex-1 py-2 rounded-xl border border-secondary/10 text-[10px] font-black uppercase hover:bg-primary hover:text-white transition-all">
                        {r}+ <Star size={8} className="inline fill-current" />
                      </button>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup title="Daily Wage Range">
                  <input type="range" min="300" max="2000" step="100" className="w-full accent-primary" />
                  <div className="flex justify-between text-[10px] font-black text-muted uppercase mt-2">
                    <span>₹300</span>
                    <span>₹2000+</span>
                  </div>
                </FilterGroup>

                <FilterGroup title="Availability">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded-md accent-primary" defaultChecked />
                    <span className="text-sm font-bold text-secondary">Available Now</span>
                  </label>
                </FilterGroup>
              </div>

              <button className="w-full mt-10 bg-secondary text-white py-4 rounded-xl font-display font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-glow">
                Apply Filters
              </button>
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
                    className="inline-block bg-primary text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full shadow-glow"
                  >
                    Verified Talent Pool
                  </motion.div>
                  <h1 className="text-4xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none">
                    FIND <span className="text-primary">EXPERTS</span>
                  </h1>
                </div>
                <div className="text-sm font-bold text-muted uppercase tracking-widest">
                  Showing <span className="text-secondary">{filteredWorkers.length}</span> Pros
                </div>
              </div>

              <div className="flex gap-4">
                <div className="relative flex-1 group">
                  <input 
                    type="text" 
                    placeholder="Search by name, trade or locality..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/80 glass px-6 py-4 md:px-8 md:py-6 text-lg font-bold outline-none focus:ring-8 ring-primary/5 border-2 border-secondary/5 focus:border-primary transition-all shadow-premium rounded-2xl"
                  />
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={24} />
                </div>
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden glass p-4 rounded-2xl border-secondary/10 flex items-center justify-center text-secondary"
                >
                  <Filter size={24} />
                </button>
              </div>
            </div>

            {/* Workers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredWorkers.map((worker, i) => (
                <motion.div
                  key={worker.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group relative bg-white/80 backdrop-blur-md border border-white/50 p-8 md:p-10 space-y-8 shadow-premium transition-all hover:border-primary/40 rounded-3xl overflow-hidden shine-effect"
                >
                  <div className="flex justify-between items-start relative z-10">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: -2 }}
                      className="w-20 h-20 md:w-28 md:h-28 bg-surface-dark border-4 border-white overflow-hidden relative shadow-xl rounded-2xl transition-transform"
                    >
                      <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center text-4xl font-display font-black text-secondary">
                        {worker.name[0]}
                      </div>
                    </motion.div>
                    <div className="flex flex-col items-end gap-2">
                      {worker.isVerified && (
                        <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest shadow-sm">
                          <ShieldCheck size={12} /> Verified
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-accent font-black text-sm">
                        <Star size={16} fill="currentColor" /> {worker.rating}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="bg-secondary/5 inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest text-secondary rounded-full">
                          {worker.trade}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight leading-none group-hover:text-primary transition-colors">
                          {worker.name}
                        </h2>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={14} className="text-primary" /> {worker.locality}, {worker.city}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-secondary/5 flex justify-between items-center relative z-10">
                    <div>
                      <div className="text-[9px] font-black text-muted uppercase tracking-widest mb-1">Min. Daily Wage</div>
                      <div className="text-3xl font-display font-black text-secondary">₹{worker.wage}<span className="text-xs font-medium text-muted">/day</span></div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={handleRequestQuote}
                        className="hidden sm:flex items-center justify-center bg-white border-2 border-secondary text-secondary px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary hover:text-white transition-all"
                      >
                        Request Quote
                      </button>
                      <button 
                        onClick={() => setIsSuccessModalOpen(true)}
                        className="w-14 h-14 bg-secondary text-white flex items-center justify-center hover:bg-primary transition-all rounded-xl shadow-premium"
                      >
                        <ArrowRight size={24} />
                      </button>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center pt-12">
              <button className="group relative bg-secondary text-white px-12 py-6 text-lg font-display font-black uppercase tracking-widest overflow-hidden transition-all hover:shadow-glow rounded-2xl">
                <span className="relative z-10">LOAD MORE EXPERTS</span>
                <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
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

