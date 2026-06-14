"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Award, Users, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface mesh-gradient">
      <Navbar />

      <div className="pt-32 md:pt-40 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-20">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-block bg-accent/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary-dark border border-accent/30">
              Our Story
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none text-heading">
              ABOUT <span className="text-primary">WORKO</span>
            </h1>
            <p className="text-xl text-muted font-medium">Empowering India's skilled trade workforce through digital connectivity.</p>
          </div>

          {/* Core Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-display font-black text-heading uppercase">OUR VISION</h2>
              <p className="text-lg text-muted leading-relaxed font-medium">
                We envision a world where skilled tradespeople are valued, verified, and easily accessible. Worko is built to bridge the gap between talented professionals (electricians, plumbers, carpenters, welders) and homeowners or businesses looking for high-quality local services.
              </p>
              <p className="text-lg text-muted leading-relaxed font-medium">
                By digitizing local trade search, onboarding, and payouts, we give tradespeople the tools to grow their own businesses and build a solid professional reputation online.
              </p>
            </div>
            <div className="bg-secondary text-white p-10 md:p-14 rounded-3xl space-y-8 relative overflow-hidden shadow-premium">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
              <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase">OUR MISSION</h2>
              <p className="text-lg text-white/80 leading-relaxed font-medium">
                To create a secure, transparent, and direct marketplace for skilled trades. We promise to keep middlemen out, secure payments transparently, and verify every professional on our platform to guarantee quality work.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="space-y-12">
            <h3 className="text-3xl font-display font-black tracking-tighter uppercase border-l-8 border-secondary pl-6 text-heading">
              OUR CORE VALUES
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: "TRUST", desc: "Every professional is verified to ensure customer safety and confidence." },
                { icon: Award, title: "EXCELLENCE", desc: "We support our workers in maintaining high service standards." },
                { icon: Users, title: "COMMUNITY", desc: "Fostering mutual respect between service providers and hirers." },
                { icon: Heart, title: "RESPECT", desc: "Ensuring fair wages and direct payment control for all trades." }
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8 }}
                  className="bg-white/80 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-sm space-y-4"
                >
                  <value.icon size={32} className="text-primary" />
                  <h4 className="text-xl font-display font-black text-heading uppercase">{value.title}</h4>
                  <p className="text-sm text-muted font-medium">{value.desc}</p>
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
