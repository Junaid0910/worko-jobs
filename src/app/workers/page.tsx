"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin, Star, ShieldCheck, ArrowRight, Filter, X } from "lucide-react";
import Link from "next/link";
import SuccessModal from "@/components/SuccessModal";

export default function WorkersPage() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("ALL");
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxWage, setMaxWage] = useState<number>(2000);
  const [onlyAvailable, setOnlyAvailable] = useState(true);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/workers?trade=${selectedTrade}`);
        const data = await res.json();
        if (data.workers) {
          setWorkers(data.workers);
        }
      } catch (err) {
        console.error("Failed to fetch workers", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkers();
  }, [selectedTrade]);

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
  };

  const handleResetFilters = () => {
    setSelectedTrade("ALL");
    setMinRating(null);
    setMaxWage(2000);
    setOnlyAvailable(true);
    setSearchQuery("");
  };

  const filteredWorkers = workers.filter(worker => {
    const name = worker.user?.name || "";
    const city = worker.user?.city || "";
    const locality = worker.user?.locality || "";
    
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          worker.trade.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating = minRating === null || worker.rating >= minRating;
    const matchesWage = worker.dailyWage <= maxWage;
    const matchesAvailability = !onlyAvailable || worker.isAvailable;

    return matchesSearch && matchesRating && matchesWage && matchesAvailability;
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
                    <h3 className="text-xl font-display font-black uppercase tracking-tight text-heading">Refine Search</h3>
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
                        <option value="WELDER">Welder</option>
                      </select>
                    </FilterGroup>

                    <FilterGroup title="Minimum Rating">
                      <div className="flex gap-2">
                        {[3, 4, 4.5].map((r) => (
                          <button 
                            key={r} 
                            onClick={() => setMinRating(minRating === r ? null : r)}
                            className={`flex-1 py-2 rounded-xl border text-[10px] font-black uppercase transition-all ${
                              minRating === r ? "bg-primary text-white border-primary" : "border-secondary/10 hover:bg-primary/5 hover:text-primary"
                            }`}
                          >
                            {r}+ <Star size={8} className="inline fill-current" />
                          </button>
                        ))}
                      </div>
                    </FilterGroup>

                    <FilterGroup title={`Daily Wage Range (Max: ₹${maxWage})`}>
                      <input 
                        type="range" 
                        min="300" 
                        max="2000" 
                        step="100" 
                        value={maxWage}
                        onChange={(e) => setMaxWage(parseInt(e.target.value))}
                        className="w-full accent-primary" 
                      />
                      <div className="flex justify-between text-[10px] font-black text-muted uppercase mt-2">
                        <span>₹300</span>
                        <span>₹2000+</span>
                      </div>
                    </FilterGroup>

                    <FilterGroup title="Availability">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 rounded-md accent-primary" 
                          checked={onlyAvailable}
                          onChange={(e) => setOnlyAvailable(e.target.checked)}
                        />
                        <span className="text-sm font-bold text-heading">Available Now</span>
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
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-display font-black uppercase tracking-tight text-heading">Refine Search</h3>
                <button onClick={handleResetFilters} className="text-[10px] font-black text-primary uppercase tracking-widest">Reset</button>
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
                    <option value="WELDER">Welder</option>
                  </select>
                </FilterGroup>

                <FilterGroup title="Minimum Rating">
                  <div className="flex gap-2">
                    {[3, 4, 4.5].map((r) => (
                      <button 
                        key={r} 
                        onClick={() => setMinRating(minRating === r ? null : r)}
                        className={`flex-1 py-2 rounded-xl border text-[10px] font-black uppercase transition-all ${
                          minRating === r ? "bg-primary text-white border-primary" : "border-secondary/10 hover:bg-primary/5 hover:text-primary"
                        }`}
                      >
                        {r}+ <Star size={8} className="inline fill-current" />
                      </button>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup title={`Daily Wage Range (Max: ₹${maxWage})`}>
                  <input 
                    type="range" 
                    min="300" 
                    max="2000" 
                    step="100" 
                    value={maxWage}
                    onChange={(e) => setMaxWage(parseInt(e.target.value))}
                    className="w-full accent-primary" 
                  />
                  <div className="flex justify-between text-[10px] font-black text-muted uppercase mt-2">
                    <span>₹300</span>
                    <span>₹2000+</span>
                  </div>
                </FilterGroup>

                <FilterGroup title="Availability">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-md accent-primary" 
                      checked={onlyAvailable}
                      onChange={(e) => setOnlyAvailable(e.target.checked)}
                    />
                    <span className="text-sm font-bold text-heading">Available Now</span>
                  </label>
                </FilterGroup>
              </div>

              <button 
                onClick={handleResetFilters}
                className="w-full mt-10 bg-secondary text-white py-4 rounded-xl font-display font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-glow"
              >
                Reset Filters
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
                  Showing <span className="text-heading">{filteredWorkers.length}</span> Pros
                </div>
              </div>

              <div className="flex gap-4">
                <div className="relative flex-1 group">
                  <input 
                    type="text" 
                    placeholder="Search by name, trade or locality..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface/80 glass px-6 py-4 md:px-8 md:py-6 text-lg font-bold outline-none focus:ring-8 ring-primary/5 border-2 border-secondary/5 focus:border-primary transition-all shadow-premium rounded-2xl"
                  />
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={24} />
                </div>
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                   className="lg:hidden glass p-4 rounded-2xl border-secondary/10 flex items-center justify-center text-heading"
                >
                  <Filter size={24} />
                </button>
              </div>
            </div>

            {/* Workers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? (
                <div className="col-span-1 md:col-span-2 flex justify-center py-20">
                  <div className="w-16 h-16 border-4 border-secondary border-t-primary rounded-full animate-spin"></div>
                </div>
              ) : filteredWorkers.length === 0 ? (
                 <div className="col-span-1 md:col-span-2 text-center py-20 bg-surface/50 border-2 border-secondary/10 rounded-3xl">
                    <h3 className="text-2xl font-display font-black text-heading">NO PROS FOUND</h3>
                    <p className="text-muted mt-2">Try adjusting your filters or search terms.</p>
                  </div>
              ) : filteredWorkers.map((worker, i) => (
                <motion.div
                  key={worker.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                   className="group relative bg-surface/80 backdrop-blur-md border border-white/50 p-8 md:p-10 space-y-8 shadow-premium transition-all hover:border-primary/40 rounded-3xl overflow-hidden shine-effect"
                >
                  <div className="flex justify-between items-start relative z-10">
                    <Link href={`/workers/${worker.id}`}>
                      <motion.div 
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        className="w-20 h-20 md:w-28 md:h-28 bg-surface-dark border-4 border-white overflow-hidden relative shadow-xl rounded-2xl transition-transform flex items-center justify-center text-4xl font-display font-black text-white"
                      >
                        {worker.profilePhoto || worker.user?.image ? (
                          <img src={worker.profilePhoto || worker.user?.image} alt={worker.user?.name} className="w-full h-full object-cover" />
                        ) : (
                          worker.user?.name?.[0] || "?"
                        )}
                      </motion.div>
                    </Link>
                    <div className="flex flex-col items-end gap-2">
                      {worker.isVerified && (
                        <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest shadow-sm">
                          <ShieldCheck size={12} /> Verified
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-accent font-black text-sm">
                        <Star size={16} fill="currentColor" /> {worker.rating > 0 ? worker.rating.toFixed(1) : "New"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="bg-secondary/5 inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest text-heading rounded-full">
                          {worker.trade}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight leading-none group-hover:text-primary transition-colors line-clamp-1">
                          <Link href={`/workers/${worker.id}`}>
                            {worker.user?.name || "Anonymous"}
                          </Link>
                        </h2>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={14} className="text-primary" /> {worker.user?.locality || "Unknown"}, {worker.user?.city || "Unknown"}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-secondary/5 flex justify-between items-center relative z-10">
                    <div>
                      <div className="text-[9px] font-black text-muted uppercase tracking-widest mb-1">Min. Daily Wage</div>
                      <div className="text-3xl font-display font-black text-heading">₹{worker.dailyWage}<span className="text-xs font-medium text-muted">/day</span></div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={handleRequestQuote}
                        className="hidden sm:flex items-center justify-center bg-surface border-2 border-secondary text-heading px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary hover:text-white transition-all"
                      >
                        Request Quote
                      </button>
                      <Link 
                        href={`/workers/${worker.id}`}
                        className="w-14 h-14 bg-secondary text-white flex items-center justify-center hover:bg-primary transition-all rounded-xl shadow-premium"
                      >
                        <ArrowRight size={24} />
                      </Link>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            {!isLoading && filteredWorkers.length > 0 && (
              <div className="flex justify-center pt-12">
                <button className="group relative bg-secondary text-white px-12 py-6 text-lg font-display font-black uppercase tracking-widest overflow-hidden transition-all hover:shadow-glow rounded-2xl">
                  <span className="relative z-10">LOAD MORE EXPERTS</span>
                  <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </button>
              </div>
            )}
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
