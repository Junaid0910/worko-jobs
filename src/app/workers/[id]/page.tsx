"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, Shield, Phone, MessageCircle, Calendar, Award, Languages, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function WorkerProfilePage({ params }: { params: { id: string } }) {
  const worker = {
    id: params.id,
    name: "Rajesh Kumar",
    trade: "ELECTRICIAN",
    experience: 8,
    rating: 4.9,
    reviews: 124,
    wage: 600,
    city: "Mumbai",
    locality: "Andheri West",
    isVerified: true,
    isAvailable: true,
    bio: "Certified electrician with 8 years of experience in residential and commercial wiring, appliance repair, and industrial maintenance. Committed to safety and quality work.",
    languages: ["Hindi", "Marathi", "English"],
    skills: ["Residential Wiring", "Appliance Repair", "MCB Installation", "Circuit Testing", "AC Repair"],
    portfolio: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400&h=300",
      "https://images.unsplash.com/photo-1558211583-d28f61092bf1?auto=format&fit=crop&q=80&w=400&h=300",
      "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=400&h=300",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=400&h=300",
    ],
    image: "https://images.unsplash.com/photo-1540560485459-c219e99c1b08?auto=format&fit=crop&q=80&w=400&h=400",
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <section className="pt-20">
        {/* Profile Hero */}
        <div className="bg-secondary text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-64 h-64 shrink-0 border-8 border-white/10 shadow-2xl"
              >
                <Image src={worker.image} alt={worker.name} fill className="object-cover grayscale" />
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-secondary animate-pulse" />
              </motion.div>

              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                    <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase">{worker.name}</h1>
                    {worker.isVerified && (
                      <motion.div 
                        animate={{ boxShadow: ["0 0 0px #F5C518", "0 0 20px #F5C518", "0 0 0px #F5C518"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-accent text-primary-dark p-2 rounded-full"
                      >
                        <Shield size={32} />
                      </motion.div>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-xl font-display font-bold text-accent tracking-widest">
                    <span className="flex items-center gap-2"><Award size={24} /> {worker.trade}</span>
                    <span className="flex items-center gap-2"><MapPin size={24} /> {worker.locality}, {worker.city}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                  {[
                    { label: "Rating", value: worker.rating, icon: Star },
                    { label: "Reviews", value: worker.reviews, icon: MessageCircle },
                    { label: "Experience", value: `${worker.experience}yr`, icon: Calendar },
                    { label: "Day Wage", value: `₹${worker.wage}`, icon: Award },
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
                <p className="text-xl text-muted leading-relaxed italic">{worker.bio}</p>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-display font-black tracking-tighter border-l-8 border-primary pl-6 uppercase text-heading">SKILLS & SPECIALTIES</h3>
                <div className="flex flex-wrap gap-4">
                  {worker.skills.map((skill) => (
                    <div key={skill} className="bg-surface border-2 border-secondary px-6 py-3 font-display font-black uppercase tracking-widest text-sm flex items-center gap-2 shadow-[4px_4px_0px_0px_#0F1C3F] text-heading">
                      <CheckCircle2 size={18} className="text-primary" /> {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-display font-black tracking-tighter border-l-8 border-primary pl-6 uppercase text-heading">PORTFOLIO</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {worker.portfolio.map((img, i) => (
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
            </div>

            {/* Sticky Sidebar */}
            <aside className="space-y-8">
              <div className="bg-surface p-10 border-2 border-secondary shadow-[16px_16px_0px_0px_#0F1C3F] sticky top-32">
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <div className="text-sm font-black text-muted uppercase tracking-widest">Starting Price</div>
                    <div className="text-6xl font-display font-black text-primary">₹{worker.wage}</div>
                    <div className="text-xs font-bold text-heading uppercase tracking-widest">Per 8 Hour Shift</div>
                  </div>
                  
                  <div className="h-px bg-muted/10 w-full" />
                  
                  <div className="space-y-4">
                    <button className="w-full bg-primary text-white py-5 text-xl font-display font-black tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-3">
                      <Phone size={24} /> CALL RAJESH
                    </button>
                    <button className="w-full bg-secondary text-white py-5 text-xl font-display font-black tracking-widest hover:bg-surface-dark transition-all flex items-center justify-center gap-3">
                      <MessageCircle size={24} /> WHATSAPP
                    </button>
                  </div>

                  <p className="text-xs font-bold text-muted leading-relaxed">
                    By clicking call/whatsapp, you agree to our platform terms. Your request will be logged for quality assurance.
                  </p>
                </div>
              </div>

              <div className="bg-accent/10 p-8 border-2 border-accent/30 space-y-4">
                <h4 className="font-display font-black uppercase tracking-widest flex items-center gap-2 text-heading">
                  <Languages size={20} /> Languages Known
                </h4>
                <div className="flex flex-wrap gap-2">
                  {worker.languages.map((lang) => (
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
