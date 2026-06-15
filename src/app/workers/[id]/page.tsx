"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, Shield, Phone, MessageCircle, Calendar, Award, Languages, CheckCircle2, Loader2, ArrowLeft, Clock, GraduationCap, Briefcase, User } from "lucide-react";
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
      <main className="min-h-screen bg-surface mesh-gradient">
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
      <main className="min-h-screen bg-surface mesh-gradient">
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

  // Raw DB info extract
  const user = worker.user || {};
  const name = user.name || "Anonymous Worker";
  const trade = worker.trade || "OTHER";
  const customTrade = worker.customTrade || "";
  const title = worker.title || "";
  const experience = worker.experience || 0;
  const rating = worker.rating || 0;
  const totalReviews = worker.totalReviews || worker.reviews?.length || 0;
  const wage = worker.dailyWage || 500;
  const city = user.city || "";
  const locality = user.locality || "";
  const isVerified = worker.isVerified || false;
  const bio = worker.bio || "";
  const isAvailable = worker.isAvailable !== undefined ? worker.isAvailable : true;

  // Real worker data only (no dummy fallbacks)
  const languages = worker.languages || [];
  const skills = worker.skills || [];
  const education = worker.education || "";
  const certification = worker.certification || "";
  const availabilityHours = worker.availabilityHours || "";
  const portfolio = worker.portfolio || [];

  // Determine display trade category
  const displayTrade = trade === "OTHER" && customTrade ? customTrade : trade;

  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />

      <section className="pt-20">
        {/* Profile Hero */}
        <div className="bg-secondary text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="mb-6">
              <Link href="/workers" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back to Directory
              </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Profile Photo - uses standard img to avoid Next.js domain limits */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 border-8 border-white/10 shadow-2xl overflow-hidden rounded-2xl flex items-center justify-center bg-surface-dark"
              >
                {worker.profilePhoto || user.image ? (
                  <img src={worker.profilePhoto || user.image} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-6xl font-display font-black text-white">{name[0]}</div>
                )}
                {isAvailable && (
                  <div className="absolute bottom-3 right-3 w-5 h-5 bg-green-500 rounded-full border-4 border-secondary animate-pulse" />
                )}
              </motion.div>

              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter uppercase">{name}</h1>
                    {isVerified && (
                      <motion.div 
                        animate={{ boxShadow: ["0 0 0px #F5C518", "0 0 20px #F5C518", "0 0 0px #F5C518"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-accent text-primary-dark p-2 rounded-full"
                      >
                        <Shield size={20} />
                      </motion.div>
                    )}
                  </div>

                  {/* Upwork style Professional Title */}
                  {title && (
                    <p className="text-lg md:text-2xl text-accent font-semibold tracking-wide italic font-display uppercase leading-tight">
                      "{title}"
                    </p>
                  )}

                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-sm font-display font-bold text-white/80 tracking-widest uppercase">
                    <span className="flex items-center gap-2"><Award size={18} className="text-accent" /> {displayTrade}</span>
                    {(locality || city) && (
                      <span className="flex items-center gap-2">
                        <MapPin size={18} className="text-accent" /> {locality ? `${locality}, ` : ""}{city}
                      </span>
                    )}
                  </div>
                </div>

                {/* Statistics Box */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto md:mx-0 pt-2">
                  {[
                    { label: "Rating", value: rating > 0 ? `${rating.toFixed(1)} ★` : "New", icon: Star },
                    { label: "Reviews", value: totalReviews, icon: MessageCircle },
                    { label: "Experience", value: `${experience} yrs`, icon: Calendar },
                    { label: "Day Wage", value: `₹${wage}`, icon: Award },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/10 p-4 border border-white/10 flex flex-col items-center">
                      <stat.icon className="text-accent mb-2" size={18} />
                      <span className="text-xl md:text-2xl font-display font-black">{stat.value}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-60">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Sidebar Details (Left Column on Desktop, col-span-1) */}
            <aside className="space-y-8 order-2 lg:order-1">
              {/* Daily Wage & Contacts */}
              <div className="bg-white p-8 md:p-10 border border-secondary/10 shadow-premium rounded-3xl sticky top-28 space-y-6">
                <div className="text-center space-y-4">
                  <div className="space-y-1">
                    <div className="text-xs font-black text-muted uppercase tracking-widest">Daily Wage Rate</div>
                    <div className="text-5xl font-display font-black text-primary">₹{wage}</div>
                    <div className="text-[10px] font-bold text-heading uppercase tracking-widest">Per 8 Hour Shift</div>
                  </div>
                  
                  <div className="h-px bg-secondary/5 w-full" />
                  
                  {session ? (
                    <div className="space-y-3 pt-2">
                      {user.phone ? (
                        <>
                          <a 
                            href={`tel:${user.phone}`} 
                            className="w-full bg-primary text-white py-4 rounded-xl text-sm font-display font-black tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-glow"
                          >
                            <Phone size={18} /> CALL EXPERT
                          </a>
                          <a 
                            href={`https://wa.me/${user.phone.replace(/[^0-9]/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full bg-secondary text-white py-4 rounded-xl text-sm font-display font-black tracking-widest hover:bg-surface-dark transition-all flex items-center justify-center gap-2"
                          >
                            <MessageCircle size={18} /> WHATSAPP
                          </a>
                        </>
                      ) : (
                        <p className="text-muted font-bold text-xs">No contact details provided.</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <Link 
                        href="/login" 
                        className="w-full bg-primary text-white py-4 rounded-xl text-xs font-display font-black tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-glow"
                      >
                        LOG IN TO VIEW CONTACT
                      </Link>
                    </div>
                  )}

                  <p className="text-[10px] font-bold text-muted leading-relaxed">
                    By contacting, you agree to platform terms. Never pay advance payments before work is completed.
                  </p>
                </div>
              </div>

              {/* Availability Status */}
              {availabilityHours || !isAvailable ? (
                <div className="bg-white p-8 border border-secondary/10 shadow-sm rounded-3xl space-y-4">
                  <h4 className="font-display font-black uppercase tracking-widest flex items-center gap-2 text-heading text-sm">
                    <Clock size={18} className="text-primary" /> Availability
                  </h4>
                  <div className="space-y-2">
                    {availabilityHours && (
                      <p className="text-sm font-bold text-heading flex items-center gap-2">
                        <Briefcase size={14} className="text-muted" /> {availabilityHours}
                      </p>
                    )}
                    <div className="pt-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${isAvailable ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                        {isAvailable ? "Available Now" : "Busy / Booked"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Languages Known */}
              {languages.length > 0 ? (
                <div className="bg-white p-8 border border-secondary/10 shadow-sm rounded-3xl space-y-4">
                  <h4 className="font-display font-black uppercase tracking-widest flex items-center gap-2 text-heading text-sm">
                    <Languages size={18} className="text-primary" /> Languages Known
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang: string) => (
                      <span key={lang} className="bg-surface px-3 py-1.5 text-[10px] font-black border border-accent/40 rounded-lg uppercase text-heading">{lang}</span>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Education details */}
              {education ? (
                <div className="bg-white p-8 border border-secondary/10 shadow-sm rounded-3xl space-y-4">
                  <h4 className="font-display font-black uppercase tracking-widest flex items-center gap-2 text-heading text-sm">
                    <GraduationCap size={18} className="text-primary" /> Education
                  </h4>
                  <p className="text-sm font-bold text-heading leading-relaxed">{education}</p>
                </div>
              ) : null}

              {/* Certifications */}
              {certification ? (
                <div className="bg-white p-8 border border-secondary/10 shadow-sm rounded-3xl space-y-4">
                  <h4 className="font-display font-black uppercase tracking-widest flex items-center gap-2 text-heading text-sm">
                    <Shield size={18} className="text-primary" /> Certifications
                  </h4>
                  <p className="text-sm font-bold text-heading leading-relaxed">{certification}</p>
                </div>
              ) : null}
            </aside>

            {/* Main Info Area (Right Column on Desktop, col-span-2) */}
            <div className="lg:col-span-2 order-1 lg:order-2 space-y-12">
              
              {/* Bio Details */}
              {bio ? (
                <div className="glass p-8 md:p-10 rounded-3xl border-white/60 shadow-premium space-y-6">
                  <h3 className="text-2xl font-display font-black tracking-tighter border-l-6 border-primary pl-4 uppercase text-heading">ABOUT ME</h3>
                  <p className="text-lg text-muted leading-relaxed font-medium whitespace-pre-line">{bio}</p>
                </div>
              ) : null}

              {/* Skills Area */}
              {skills.length > 0 ? (
                <div className="glass p-8 md:p-10 rounded-3xl border-white/60 shadow-premium space-y-6">
                  <h3 className="text-2xl font-display font-black tracking-tighter border-l-6 border-primary pl-4 uppercase text-heading">SKILLS & SPECIALTIES</h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill: string) => (
                      <div key={skill} className="bg-white border border-secondary/10 px-5 py-3 font-display font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-sm text-heading rounded-xl hover:border-primary/40 transition-colors">
                        <CheckCircle2 size={16} className="text-primary" /> {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Portfolio Work Area */}
              {portfolio.length > 0 ? (
                <div className="glass p-8 md:p-10 rounded-3xl border-white/60 shadow-premium space-y-6">
                  <h3 className="text-2xl font-display font-black tracking-tighter border-l-6 border-primary pl-4 uppercase text-heading">PORTFOLIO WORK</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {portfolio.map((img: string, i: number) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.03 }}
                        className="relative h-64 border-2 border-white shadow-lg overflow-hidden cursor-zoom-in group rounded-2xl bg-surface-dark"
                      >
                        <img src={img} alt={`Work ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Reviews List */}
              <div className="glass p-8 md:p-10 rounded-3xl border-white/60 shadow-premium space-y-6">
                <h3 className="text-2xl font-display font-black tracking-tighter border-l-6 border-primary pl-4 uppercase text-heading">REVIEWS ({worker.reviews?.length || 0})</h3>
                {(!worker.reviews || worker.reviews.length === 0) ? (
                  <p className="text-muted italic">No reviews yet for this worker.</p>
                ) : (
                  <div className="space-y-6">
                    {worker.reviews.map((rev: any) => (
                      <div key={rev.id} className="bg-white/60 p-6 border border-secondary/5 rounded-2xl space-y-3 shadow-sm">
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-heading text-sm">{rev.author?.name || "Customer"}</div>
                          <div className="flex items-center gap-1 text-accent font-black text-xs">
                            <Star size={12} className="fill-current" /> {rev.rating}
                          </div>
                        </div>
                        <p className="text-muted text-sm leading-relaxed font-semibold">{rev.comment}</p>
                        <div className="text-[9px] text-muted/60 font-black uppercase tracking-widest">{new Date(rev.createdAt).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
