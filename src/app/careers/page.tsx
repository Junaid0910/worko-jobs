"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight, Zap, Star } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
  const jobs = [
    { title: "Senior Backend Engineer (NodeJS/Prisma)", type: "Full-time", dept: "Engineering", loc: "Remote (India)" },
    { title: "Lead Product Designer", type: "Full-time", dept: "Design", loc: "Mumbai, India" },
    { title: "Community Manager (Trades Network)", type: "Full-time", dept: "Operations", loc: "Bangalore, India" },
    { title: "Operations Associate", type: "Contract", dept: "Operations", loc: "Delhi, India" }
  ];

  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />

      <div className="pt-32 md:pt-40 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-20">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-block bg-accent/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary-dark border border-accent/30">
              Join the Team
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none text-heading">
              CAREERS AT <span className="text-primary">WORKO</span>
            </h1>
            <p className="text-xl text-muted font-medium">Build the digital marketplace that empowers thousands of skilled tradespeople.</p>
          </div>

          {/* Intro Section */}
          <div className="bg-secondary text-white p-10 md:p-14 rounded-3xl space-y-6 shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase">WHY WORK WITH US?</h2>
            <p className="text-lg text-white/80 leading-relaxed font-medium max-w-4xl">
              At Worko, we are solving high-impact real-world problems. We're building tools that help electricians, plumbers, and painters manage their work, establish creditworthiness, and grow their income. If you love building user-focused products with cutting-edge technology in a fast-paced environment, we'd love to have you.
            </p>
          </div>

          {/* Open Positions List */}
          <div className="space-y-12">
            <h3 className="text-3xl font-display font-black tracking-tighter uppercase border-l-8 border-secondary pl-6 text-heading">
              OPEN OPPORTUNITIES
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {jobs.map((job, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-white/80 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="space-y-2">
                    <span className="bg-secondary/5 text-secondary px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full">
                      {job.dept}
                    </span>
                    <h4 className="text-2xl font-display font-black text-heading uppercase">{job.title}</h4>
                    <div className="flex gap-4 text-xs font-bold text-muted uppercase tracking-widest">
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>{job.loc}</span>
                    </div>
                  </div>
                  <Link href="#" className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 text-xs font-display font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 rounded-xl transition-all shadow-glow">
                    Apply Now <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
