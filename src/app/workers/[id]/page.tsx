"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, Shield, Phone, MessageCircle, Calendar, Award, Languages, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function WorkerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session } = useSession();
  
  const [worker, setWorker] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/workers/${id}`);
        if (!res.ok) throw new Error("Worker profile not found");
        const data = await res.json();
        setWorker(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorker();
  }, [id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !worker) {
    return (
      <main className="min-h-screen bg-surface">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-black text-heading uppercase">Error</h1>
            <p className="text-muted">{error || "Failed to load worker profile."}</p>
            <Link href="/workers" className="inline-block bg-primary text-white px-8 py-3 font-black uppercase rounded-xl">Back to Workers</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Fallbacks
  const user = worker.user || {};
  const name = user.name || "Anonymous Worker";
  const trade = worker.trade || "OTHER";
  const experience = worker.experience || 0;
  const rating = worker.rating || 0;
  const totalReviews = worker.totalReviews || worker.reviews?.length || 0;
  const wage = worker.dailyWage || 500;
  const city = user.city || "Unknown Location";
  const locality = user.locality || "Hyperlocal Area";
  const isVerified = worker.isVerified || false;
  const bio = worker.bio || "No description provided.";
  const languages = worker.languages || ["English", "Hindi"];
  
  // Dynamic skills based on trade
  const tradeSkillsMap: any = {
    ELECTRICIAN: ["Residential Wiring", "Appliance Repair", "MCB Installation", "Circuit Testing", "AC Repair"],
    PLUMBER: ["Pipe Fitting", "Leak Repair", "Drain Cleaning", "Tap & Shower Installation", "Water Tank Repair"],
    CARPENTER: ["Furniture Assembly", "Door & Window Repair", "Cabinet Making", "Wood Polishing", "Lock Fitting"],
    PAINTER: ["Wall Painting", "Texture Painting", "Waterproofing", "Wood Painting", "Putty Application"],
    MASON: ["Brickwork", "Tiling & Flooring", "Plastering", "Concrete Work", "Wall Demolition"],
    WELDER: ["Gate & Grill Welding", "Sheet Metal Work", "Iron Structural Work", "Arc Welding", "TIG Welding"],
    OTHER: ["General Repair Work", "Troubleshooting", "Maintenance", "On-site Assistance"]
  };
  const skills = tradeSkillsMap[trade] || tradeSkillsMap["OTHER"];

  // Default images for portfolio or avatar
  const portfolioImages = worker.portfolio && worker.portfolio.length > 0 ? worker.portfolio : [
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400&h=300",
    "https://images.unsplash.com/photo-1558211583-d28f61092bf1?auto=format&fit=crop&q=80&w=400&h=300",
  ];

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <section className="pt-20">
        {/* Profile Hero */}
        <div className="bg-secondary text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="mb-6">
              <Link href="/workers" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back to Directory
              </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-64 h-64 shrink-0 border-8 border-white/10 shadow-2xl overflow-hidden rounded-2xl flex items-center justify-center bg-surface-dark"
              >
                {worker.profilePhoto || user.image ? (
                  <Image src={worker.profilePhoto || user.image} alt={name} fill className="object-cover" />
                ) : (
                  <div className="text-7xl font-display font-black text-white">{name[0]}</div>
                )}
                {worker.isAvailable && (
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-secondary animate-pulse" />
                )}
              </motion.div>

              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                    <h1 className="text-5xl md:text-6xl font-display font-black tracking-tighter uppercase">{name}</h1>
                    {isVerified && (
                      <motion.div 
                        animate={{ boxShadow: ["0 0 0px #F5C518", "0 0 20px #F5C518", "0 0 0px #F5C518"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-accent text-primary-dark p-2 rounded-full"
                      >
                        <Shield size={24} />
                      </motion.div>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-lg font-display font-bold text-accent tracking-widest uppercase">
                    <span className="flex items-center gap-2"><Award size={20} /> {trade}</span>
                    <span className="flex items-center gap-2"><MapPin size={20} /> {locality}, {city}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto md:mx-0">
                  {[
                    { label: "Rating", value: rating > 0 ? rating.toFixed(1) : "New", icon: Star },
                    { label: "Reviews", value: totalReviews, icon: MessageCircle },
                    { label: "Experience", value: `${experience} yrs`, icon: Calendar },
                    { label: "Day Wage", value: `₹${wage}`, icon: Award },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/10 p-4 border border-white/10 flex flex-col items-center">
                      <stat.icon className="text-accent mb-2" size={20} />
                      <span className="text-2xl font-display font-black">{stat.value}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs/Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-16">
              <div className="space-y-6">
                <h3 className="text-3xl font-display font-black tracking-tighter border-l-8 border-primary pl-6 uppercase text-heading">ABOUT ME</h3>
                <p className="text-xl text-muted leading-relaxed font-medium">{bio}</p>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-display font-black tracking-tighter border-l-8 border-primary pl-6 uppercase text-heading">SKILLS & SPECIALTIES</h3>
                <div className="flex flex-wrap gap-4">
                  {skills.map((skill: string) => (
                    <div key={skill} className="bg-surface border-2 border-secondary px-6 py-3 font-display font-black uppercase tracking-widest text-sm flex items-center gap-2 shadow-[4px_4px_0px_0px_#0F1C3F] text-heading">
                      <CheckCircle2 size={18} className="text-primary" /> {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-display font-black tracking-tighter border-l-8 border-primary pl-6 uppercase text-heading">PORTFOLIO WORK</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolioImages.map((img: string, i: number) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.02 }}
                      className="relative h-64 border-4 border-white shadow-xl overflow-hidden cursor-zoom-in group"
                    >
                      <Image src={img} alt={`Work ${i}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-8">
                <h3 className="text-3xl font-display font-black tracking-tighter border-l-8 border-primary pl-6 uppercase text-heading">REVIEWS ({worker.reviews?.length || 0})</h3>
                {(!worker.reviews || worker.reviews.length === 0) ? (
                  <p className="text-muted italic">No reviews yet for this worker.</p>
                ) : (
                  <div className="space-y-6">
                    {worker.reviews.map((rev: any) => (
                      <div key={rev.id} className="bg-white p-6 border-2 border-muted/10 rounded-2xl shadow-sm space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-heading">{rev.author?.name || "Customer"}</div>
                          <div className="flex items-center gap-1 text-accent font-black">
                            <Star size={14} className="fill-current" /> {rev.rating}
                          </div>
                        </div>
                        <p className="text-muted leading-relaxed font-semibold">{rev.comment}</p>
                        <div className="text-[10px] text-muted/60 font-black uppercase tracking-widest">{new Date(rev.createdAt).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Sidebar */}
            <aside className="space-y-8">
              <div className="bg-surface p-10 border-2 border-secondary shadow-[16px_16px_0px_0px_#0F1C3F] sticky top-32">
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <div className="text-sm font-black text-muted uppercase tracking-widest">Starting Price</div>
                    <div className="text-6xl font-display font-black text-primary">₹{wage}</div>
                    <div className="text-xs font-bold text-heading uppercase tracking-widest">Per 8 Hour Shift</div>
                  </div>
                  
                  <div className="h-px bg-muted/10 w-full" />
                  
                  {session ? (
                    <div className="space-y-4">
                      {user.phone ? (
                        <>
                          <a 
                            href={`tel:${user.phone}`} 
                            className="w-full bg-primary text-white py-5 text-xl font-display font-black tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-3"
                          >
                            <Phone size={24} /> CALL {name.split(" ")[0].toUpperCase()}
                          </a>
                          <a 
                            href={`https://wa.me/${user.phone.replace(/[^0-9]/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full bg-secondary text-white py-5 text-xl font-display font-black tracking-widest hover:bg-surface-dark transition-all flex items-center justify-center gap-3"
                          >
                            <MessageCircle size={24} /> WHATSAPP
                          </a>
                        </>
                      ) : (
                        <p className="text-muted font-bold text-sm">No contact details provided.</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Link 
                        href="/login" 
                        className="w-full bg-primary text-white py-5 text-xs font-display font-black tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-3"
                      >
                        LOG IN TO VIEW CONTACT
                      </Link>
                    </div>
                  )}

                  <p className="text-xs font-bold text-muted leading-relaxed">
                    By contacting, you agree to our platform terms. Never pay advance payments before work is completed.
                  </p>
                </div>
              </div>

              <div className="bg-accent/10 p-8 border-2 border-accent/30 space-y-4">
                <h4 className="font-display font-black uppercase tracking-widest flex items-center gap-2 text-heading">
                  <Languages size={20} /> Languages Known
                </h4>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang: string) => (
                    <span key={lang} className="bg-surface px-3 py-1 text-xs font-black border border-accent/50 uppercase text-heading">{lang}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
